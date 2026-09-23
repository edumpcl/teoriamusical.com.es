import sys, os
sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.join(os.path.dirname(__file__), '..')
target_dir = os.path.join(ROOT, 'ejercicios', 'escalas', 'construir-escala-cromatica')

real_walk = os.walk
def fake_walk(root):
    yield (target_dir, [], ['index.html'])
os.walk = fake_walk

import importlib.util
spec = importlib.util.spec_from_file_location('gen_og_pages', os.path.join(os.path.dirname(__file__), 'gen_og_pages.py'))
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
