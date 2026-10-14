import tempfile
import unittest
from pathlib import Path
from importlib.util import spec_from_file_location, module_from_spec

spec=spec_from_file_location("build_jamaica",Path(__file__).resolve().parents[1]/"build_jamaica.py")
module=module_from_spec(spec);spec.loader.exec_module(module)

class PackageTests(unittest.TestCase):
    def test_local_asset_is_copied(self):
        with tempfile.TemporaryDirectory() as d:
            base=Path(d); src=base/"source";src.mkdir()
            (src/"image.jpg").write_bytes(b"picture")
            (src/"index.html").write_text('<html><img src="image.jpg"><script src="https://example.com/lib.js"></script></html>')
            self.assertEqual(module.package(src/"index.html",base/"dist"),1)
            self.assertEqual((base/"dist"/"image.jpg").read_bytes(),b"picture")
    def test_missing_asset_blocks(self):
        with tempfile.TemporaryDirectory() as d:
            base=Path(d);src=base/"index.html";src.write_text('<img src="missing.jpg">')
            with self.assertRaises(FileNotFoundError):
                module.package(src,base/"dist")
    def test_unsafe_parent_reference_blocks(self):
        with tempfile.TemporaryDirectory() as d:
            base=Path(d);src=base/"site";src.mkdir()
            (base/"secret.txt").write_text("secret")
            (src/"index.html").write_text('<script src="../secret.txt"></script>')
            with self.assertRaises(ValueError):
                module.package(src/"index.html",base/"dist")
    def test_external_urls_not_packaged(self):
        self.assertIsNone(module.local_path("https://example.com/photo.jpg"))
        self.assertIsNone(module.local_path("data:image/png;base64,abc"))
    def test_srcset_is_checked(self):
        with tempfile.TemporaryDirectory() as d:
            base=Path(d);src=base/"index.html"
            src.write_text('<img srcset="small.jpg 1x, large.jpg 2x">')
            with self.assertRaises(FileNotFoundError):
                module.package(src,base/"dist")
if __name__=="__main__": unittest.main()
