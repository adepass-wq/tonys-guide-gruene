import tempfile
import unittest
from pathlib import Path
from importlib.util import module_from_spec, spec_from_file_location
source = Path(__file__).resolve().parents[1] / 'build_jamaica.py'
spec = spec_from_file_location('jamaica_builder', source)
builder = module_from_spec(spec)
spec.loader.exec_module(builder)

class InlineStyleTest(unittest.TestCase):
    def test_background_asset(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)
            site = root / 'site'
            site.mkdir()
            (site / 'index.html').write_text('<style>body{background:url(texture.jpg)}</style>')
            (site / 'texture.jpg').write_bytes(b'fixture')
            count = builder.package(site / 'index.html', root / 'dist')
            self.assertEqual(count, 1)
            self.assertEqual((root / 'dist' / 'texture.jpg').read_bytes(), b'fixture')

if __name__ == '__main__':
    unittest.main()
