#!/usr/bin/env python3
"""OG images (1200x630) for the English pages, in the same style as tools/gen_og_pages.py.
Run: python tools/en/gen-og.py
  - fixed pages (home, tools, metronome, tuner) and one per instrument (tools/en/instruments/*.json)
  - any other page under en/ whose og:image (og-en-*.png) does not exist yet is generated from its
    <h1> and meta description (this covers the dictionary pages)
Existing images are never overwritten except the fixed ones above."""
import glob
import html
import json
import os
import re
import sys
import textwrap

from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.join(os.path.dirname(__file__), '..', '..')
OUT = os.path.join(ROOT, 'assets', 'img', 'og-pages')
W, H = 1200, 630
BG, GOLD, GOLD_DIM, CREAM, CREAM2 = (24, 15, 4), (184, 134, 11), (74, 53, 0), (245, 230, 200), (200, 180, 140)
FONTS = 'C:/Windows/Fonts/'


def font(name, size):
    try:
        return ImageFont.truetype(FONTS + name, size)
    except OSError:
        return ImageFont.load_default()


PAGES = {
    'og-en-home': ('Music Theory', 'Learn music from the ground up. Free, no sign-up.', ['Metronome', 'Tuner', 'Free tools']),
    'og-en-tools': ('Free Online Music Tools', 'They run in your browser. No install, no sign-up.', ['Metronome', 'Tuner']),
    'og-en-metronome': ('Online Metronome', 'Free · No install · BPM 15–300', ['Tap tempo', 'Odd meters', 'Drum machine', 'Speed trainer', 'Subdivisions']),
    'og-en-tuner': ('Online Tuner', 'Free chromatic tuner · Uses your microphone', ['Cents meter', 'Transposing', 'A4 reference', 'Strobe mode', 'Reference notes']),
}


def make(name, title, sub, chips):
    im = Image.new('RGB', (W, H), BG)
    d = ImageDraw.Draw(im)
    for y in range(268, 350, 26):                       # faint staff lines
        d.line([(60, y), (W - 60, y)], fill=(40, 28, 10), width=2)
    d.line([(60, 372), (W - 60, 372)], fill=GOLD, width=4)
    size = 96
    f = font('georgiab.ttf', size)
    while d.textlength(title, font=f) > W - 200 and size > 60:
        size -= 4
        f = font('georgiab.ttf', size)
    lines = [title]
    if d.textlength(title, font=f) > W - 200:           # still too long: two lines
        lines = textwrap.wrap(title, width=max(12, int(len(title) / 2) + 2))[:2]
        size = 64
        f = font('georgiab.ttf', size)
    y = 70
    for line in lines:
        d.text((100, y), line, font=f, fill=CREAM)
        y += size + 6
    if sub:
        d.text((100, min(y + 10, 268 - 44)), sub[:80], font=font('georgia.ttf', 32), fill=GOLD)
    x = 60
    fc = font('georgia.ttf', 28)
    for c in chips:
        w = int(d.textlength(c, font=fc)) + 44
        if x + w > W - 60:
            break
        d.rectangle([x, 420, x + w, 482], outline=GOLD_DIM, width=3, fill=(40, 28, 8))
        d.text((x + 22, 434), c, font=fc, fill=CREAM2)
        x += w + 20
    d.text((W - 60, H - 52), 'teoriamusical.com.es', font=font('georgia.ttf', 24), fill=(110, 84, 24), anchor='ra')
    im.save(os.path.join(OUT, name + '.png'), optimize=True)
    print('  ', name + '.png')


def instrument_pages():
    for f in sorted(glob.glob(os.path.join(os.path.dirname(__file__), 'instruments', '*.json'))):
        d = json.load(open(f, encoding='utf8'))
        yield 'og-en-tuner-' + d['slug'], ('Online ' + d['name'] + ' Tuner', d.get('sub') or 'Free · Uses your microphone', d.get('chips') or ['Cents meter'])


def missing_pages():
    """Pages under en/ whose og-en-*.png is missing: made from the <h1> and the meta description."""
    for f in sorted(glob.glob(os.path.join(ROOT, 'en', '**', 'index.html'), recursive=True)):
        h = open(f, encoding='utf8').read()
        m = re.search(r'og:image" content="[^"]*/(og-en-[^"/]+)\.png"', h)
        if not m or os.path.exists(os.path.join(OUT, m.group(1) + '.png')):
            continue
        h1 = re.search(r'<h1>(.*?)</h1>', h, re.S)
        desc = re.search(r'<meta name="description" content="([^"]*)"', h)
        title = html.unescape(re.sub(r'<[^>]+>', '', h1.group(1))).strip() if h1 else 'Music Theory'
        sub = html.unescape(desc.group(1)).split('. ')[0].rstrip('.') if desc else ''
        yield m.group(1), (title, sub, [])


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for k, (t, s, c) in list(PAGES.items()) + list(instrument_pages()) + list(missing_pages()):
        make(k, t, s, c)
