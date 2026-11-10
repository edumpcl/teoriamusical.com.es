#!/usr/bin/env python3
"""OG images (1200x630) for the English pages, in the style of tools/gen_og_pages.py but with ENGLISH tags.
Run from the repo root:  python tools/en/gen-og-badge.py
  - one image per page under en/ (not the /play/ pages), named as the page's og:image says (og-en-*.png)
  - title = <h1>, subtitle = meta description; section tag in English (Music dictionary, Exercises, Games...)
  - the hand-made fixed ones are left alone: og-en-home, og-en-tools, og-en-metronome, og-en-tuner and og-en-tuner-*
    (made by tools/en/gen-og.py)
Only assets/img/og-pages/og-en-*.png is written; nothing Spanish is touched."""
import glob
import html
import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
OUT = os.path.join(ROOT, 'assets', 'img', 'og-pages')
BACH = os.path.join(ROOT, 'assets', 'img', '2026', '04', 'bach_favicon.png')
W, H = 1200, 630
BG, GOLD, GOLD_DIM, CREAM, CREAM2 = (24, 15, 4), (184, 134, 11), (74, 53, 0), (245, 230, 200), (200, 180, 140)
FONTS = 'C:/Windows/Fonts/'


def font(name, size):
    try:
        return ImageFont.truetype(FONTS + name, size)
    except OSError:
        return ImageFont.load_default()


F_TITLE = [font('georgiab.ttf', s) for s in (88, 66, 50)]
F_DESC, F_BRAND, F_TAG = font('georgia.ttf', 30), font('georgia.ttf', 22), font('segoeuib.ttf', 18)
SYMBOL_MAP = {'♯': '#', '♭': 'b', '↔': ' / ', '→': ' to ', '–': '-', '’': "'", '“': '"', '”': '"'}  # Georgia lacks these glyphs
FIXED = ('og-en-home', 'og-en-tools', 'og-en-metronome', 'og-en-tuner')
TAGS = [('en/music-dictionary', 'MUSIC DICTIONARY'), ('en/exercises', 'INTERACTIVE EXERCISES'), ('en/games', 'MUSIC GAMES'),
        ('en/blog', 'BLOG'),
        ('en/tools', 'TOOLS'), ('en/about', 'ABOUT')]


def sanitize(t):
    for k, v in SYMBOL_MAP.items():
        t = t.replace(k, v)
    return t


def wrap(d, text, f, max_w):
    lines, cur = [], ''
    for w in text.split():
        t = (cur + ' ' + w).strip()
        if d.textlength(t, font=f) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def make(path, tag, title, desc):
    title, desc = sanitize(title), sanitize(desc)
    img = Image.new('RGB', (W, H), BG)
    d = ImageDraw.Draw(img)
    for y in range(60, H, 18):
        op = 12 if y % 90 == 0 else 6
        d.line([(0, y), (W, y)], fill=(74 + op, 53 + op, op * 2), width=1)
    tw = d.textlength(tag, font=F_TAG)
    d.rounded_rectangle([50, 50, 54 + tw + 22, 84], radius=14, fill=GOLD)
    d.text((61, 58), tag, font=F_TAG, fill=BG)
    d.line([(50, 100), (W - 50, 100)], fill=GOLD_DIM, width=1)
    d.line([(50, 103), (W - 50, 103)], fill=GOLD_DIM, width=1)
    max_w = W - 100
    tf = next((f for f in F_TITLE if d.textlength(title, font=f) <= max_w), F_TITLE[-1])
    y = 140
    for ln in wrap(d, title, tf, max_w)[:2]:
        d.text((50, y), ln, font=tf, fill=CREAM)
        y += tf.size + 6
    y += 10
    for ln in wrap(d, desc, F_DESC, max_w)[:3]:
        d.text((50, y), ln, font=F_DESC, fill=CREAM2)
        y += F_DESC.size + 8
    d.line([(50, H - 90), (W - 50, H - 90)], fill=GOLD, width=2)
    bw = d.textlength('teoriamusical.com.es', font=F_BRAND)
    d.text((W - bw - 20, H - 36), 'teoriamusical.com.es', font=F_BRAND, fill=CREAM2)
    try:
        bach = Image.open(BACH).convert('RGBA').resize((60, 60), Image.LANCZOS)
        img.paste(bach, (W - 60 - 30, H - 36 - 60 - 8), bach)
    except OSError:
        pass
    img.save(path, 'PNG', optimize=True)


made = skipped = 0
for f in sorted(glob.glob(os.path.join(ROOT, 'en', '**', 'index.html'), recursive=True)):
    rel = os.path.relpath(f, ROOT).replace(os.sep, '/')
    if '/play/' in rel:
        continue
    h = open(f, encoding='utf8').read()
    m = re.search(r'og:image" content="[^"]*/(og-en-[^"/]+)\.png"', h)
    if not m:
        print('  sin og:image:', rel)
        continue
    name = m.group(1)
    if name in FIXED or name.startswith('og-en-tuner-'):
        skipped += 1
        continue
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', h, re.S)
    desc = re.search(r'<meta name="description" content="([^"]*)"', h)
    title = html.unescape(re.sub(r'<[^>]+>', '', h1.group(1))).strip() if h1 else 'Music Theory'
    tag = next((t for p, t in TAGS if rel.startswith(p)), 'MUSIC THEORY')
    make(os.path.join(OUT, name + '.png'), tag, title, html.unescape(desc.group(1)).strip() if desc else '')
    made += 1
print(f'English OG images written: {made}; fixed ones left alone: {skipped}')
