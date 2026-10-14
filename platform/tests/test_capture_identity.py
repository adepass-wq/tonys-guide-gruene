import unittest
from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path

script = Path(__file__).resolve().parents[1] / "capture_identity.py"
spec = spec_from_file_location("capture_identity", script)
collector = module_from_spec(spec)
spec.loader.exec_module(collector)

class CaptureTests(unittest.TestCase):
    def test_metadata_and_analytics(self):
        html = """<!doctype html><html><head>
        <title> Jamaica &amp; Heritage </title>
        <meta name='description' content='Research-backed guide'>
        <meta name='robots' content='index,follow'>
        <link rel='canonical' href='https://jamaica.tonysguide.com/'>
        <script type='application/ld+json'>{"@type":"WebSite"}</script>
        <script>gtag('config', 'G-ABCDE12345')</script>
        </head><body></body></html>"""
        result = collector.snapshot_html("https://jamaica.tonysguide.com/", html)
        self.assertEqual(result["canonical"], "https://jamaica.tonysguide.com/")
        self.assertEqual(result["title"], "Jamaica & Heritage")
        self.assertEqual(result["description"], "Research-backed guide")
        self.assertEqual(result["robots"], "index,follow")
        self.assertEqual(result["ga4_ids"], ["G-ABCDE12345"])
        self.assertEqual(result["structured_data"], [{"@type": "WebSite"}])
    def test_missing_metadata_is_visible_not_invented(self):
        result = collector.snapshot_html("https://example.org/", "<html></html>")
        self.assertEqual(result["canonical"], "")
        self.assertEqual(result["ga4_ids"], [])
        self.assertEqual(result["structured_data"], [])

if __name__ == "__main__":
    unittest.main()
