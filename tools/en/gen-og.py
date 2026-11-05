#!/usr/bin/env python3
"""OG images (1200x630) for the English pages, in the same style as tools/gen_og_pages.py.
Run: python tools/en/gen-og.py   -> assets/img/og-pages/og-en-*.png
"""
import os
from PIL import Image, ImageDraw, ImageFont

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
    while d.textlength(title, font=f) > W - 200 and size > 48:
        size -= 4
        f = font('georgiab.ttf', size)
    d.text((100, 80), title, font=f, fill=CREAM)
    d.text((100, 80 + size + 24), sub, font=font('georgia.ttf', 34), fill=GOLD)
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


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for k, (t, s, c) in PAGES.items():
        make(k, t, s, c)
