import json
import pathlib
import tempfile
import unittest
from importlib.util import spec_from_file_location, module_from_spec

SCRIPT = pathlib.Path(__file__).resolve().parents[1] / "verify_identity.py"
spec = spec_from_file_location("verify_identity", SCRIPT)
module = module_from_spec(spec)
spec.loader.exec_module(module)

BASE = {"https://jamaica.tonysguide.com/": {
    "status": 200,
    "canonical": "https://jamaica.tonysguide.com/",
    "title": "Tony's Guide Jamaica",
    "description": "Destination guide",
    "robots": "index,follow",
    "ga4_ids": ["G-EXAMPLE"],
    "structured_data": {"@type": "WebSite"},
    "html_sha256": "original"
}}

class IdentityTests(unittest.TestCase):
    def test_unchanged_passes(self):
        self.assertEqual(module.check(BASE, BASE), [])
    def test_html_styling_can_change(self):
        after = json.loads(json.dumps(BASE))
        after[next(iter(after))]["html_sha256"] = "different"
        self.assertEqual(module.check(BASE, after), [])
    def test_missing_url_rejected(self):
        self.assertTrue(any("MISSING URL" in e for e in module.check(BASE, {})))
    def test_changed_canonical_rejected(self):
        after = json.loads(json.dumps(BASE))
        after[next(iter(after))]["canonical"] = "https://example.org/"
        self.assertTrue(any("canonical" in e for e in module.check(BASE, after)))
    def test_missing_ga4_rejected(self):
        after = json.loads(json.dumps(BASE))
        after[next(iter(after))]["ga4_ids"] = []
        self.assertTrue(any("ga4_ids" in e for e in module.check(BASE, after)))
    def test_metadata_and_schema_rejected(self):
        for field in ("title", "description", "robots", "structured_data"):
            with self.subTest(field=field):
                after = json.loads(json.dumps(BASE))
                after[next(iter(after))][field] = "changed"
                self.assertTrue(module.check(BASE, after))
    def test_unhealthy_baseline_rejected(self):
        before = json.loads(json.dumps(BASE))
        before[next(iter(before))]["status"] = 404
        self.assertTrue(any("baseline URL not healthy" in e for e in module.check(before, before)))

if __name__ == "__main__":
    unittest.main()
