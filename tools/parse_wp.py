#!/usr/bin/env python3
"""Parse WordPress export XML and produce a structured JSON summary."""
import re, json, sys, os
from xml.etree import ElementTree as ET

XML_PATH = '/sessions/charming-sharp-bardeen/mnt/uploads/teoramusical.WordPress.2026-04-17.xml'
OUT = '/sessions/charming-sharp-bardeen/work/wp_parsed.json'

NS = {
    'wp': 'http://wordpress.org/export/1.2/',
    'content': 'http://purl.org/rss/1.0/modules/content/',
    'excerpt': 'http://wordpress.org/export/1.2/excerpt/',
    'dc': 'http://purl.org/dc/elements/1.1/',
}

def text(el, path, ns=None):
    f = el.find(path, ns) if ns else el.find(path)
    return (f.text or '').strip() if f is not None and f.text else ''

def main():
    tree = ET.parse(XML_PATH)
    root = tree.getroot()
    channel = root.find('channel')

    site = {
        'title': text(channel, 'title'),
        'link': text(channel, 'link'),
        'description': text(channel, 'description'),
        'base_url': text(channel, 'wp:base_site_url', NS),
    }

    categories = {}
    for cat in channel.findall('wp:category', NS):
        tid = text(cat, 'wp:term_id', NS)
        categories[tid] = {
            'id': tid,
            'slug': text(cat, 'wp:category_nicename', NS),
            'parent': text(cat, 'wp:category_parent', NS),
            'name': text(cat, 'wp:cat_name', NS),
        }

    items_by_type = {}
    all_items = []
    for item in channel.findall('item'):
        pt = text(item, 'wp:post_type', NS)
        post_id = text(item, 'wp:post_id', NS)
        title = text(item, 'title')
        link = text(item, 'link')
        slug = text(item, 'wp:post_name', NS)
        status = text(item, 'wp:status', NS)
        parent = text(item, 'wp:post_parent', NS)
        menu_order = text(item, 'wp:menu_order', NS)
        date = text(item, 'wp:post_date', NS)
        content = text(item, 'content:encoded', NS)
        excerpt = text(item, 'excerpt:encoded', NS)
        attachment_url = text(item, 'wp:attachment_url', NS)

        # categories/tags
        cats = []
        tags = []
        for c in item.findall('category'):
            dom = c.get('domain', '')
            nicename = c.get('nicename', '')
            name = (c.text or '').strip()
            if dom == 'category':
                cats.append({'slug': nicename, 'name': name})
            elif dom == 'post_tag':
                tags.append({'slug': nicename, 'name': name})

        # meta
        meta = {}
        for m in item.findall('wp:postmeta', NS):
            k = text(m, 'wp:meta_key', NS)
            v = text(m, 'wp:meta_value', NS)
            if k and not k.startswith('_'):
                meta[k] = v[:500] if len(v) > 500 else v

        entry = {
            'id': post_id,
            'type': pt,
            'status': status,
            'title': title,
            'link': link,
            'slug': slug,
            'parent': parent,
            'menu_order': menu_order,
            'date': date,
            'categories': cats,
            'tags': tags,
            'attachment_url': attachment_url,
            'excerpt': excerpt[:300] if excerpt else '',
            'content_length': len(content),
            'meta_keys': list(meta.keys()),
        }
        # Only keep full content for pages/posts
        if pt in ('page', 'post'):
            entry['content'] = content
        items_by_type.setdefault(pt, []).append(entry)

    out = {
        'site': site,
        'categories': categories,
        'type_counts': {k: len(v) for k, v in items_by_type.items()},
        'pages': items_by_type.get('page', []),
        'posts': items_by_type.get('post', []),
        'menu_items': items_by_type.get('nav_menu_item', []),
        'attachments': [
            {'id': a['id'], 'title': a['title'], 'slug': a['slug'], 'url': a['attachment_url'], 'parent': a['parent']}
            for a in items_by_type.get('attachment', [])
        ],
    }
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)

    # Summary output
    print("=== SITE ===")
    print(json.dumps(site, ensure_ascii=False, indent=2))
    print("\n=== TYPE COUNTS ===")
    print(json.dumps(out['type_counts'], indent=2))
    print(f"\n=== PAGES ({len(out['pages'])}) ===")
    for p in sorted(out['pages'], key=lambda x: (int(x['parent'] or 0), int(x['menu_order'] or 0), x['slug'])):
        indent = '  ' if p['parent'] != '0' else ''
        print(f"  [{p['status']:>7}] id={p['id']:>5} parent={p['parent']:>5} order={p['menu_order']:>3} /{p['slug']}  — {p['title'][:70]}")
    print(f"\n=== POSTS ({len(out['posts'])}) ===")
    for p in out['posts']:
        cats = ','.join(c['slug'] for c in p['categories'])
        print(f"  [{p['status']:>7}] /{p['slug']} [{cats}] — {p['title'][:70]}")
    print(f"\n=== MENU ITEMS ({len(out['menu_items'])}) ===")
    for m in out['menu_items']:
        print(f"  order={m['menu_order']:>3} parent={m['parent']:>5} — {m['title']}")

if __name__ == '__main__':
    main()
