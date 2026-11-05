// Instrument tuner pages that exist in English. Each instrument has tools/en/instruments/<slug>.json
// ({slug, name, label, desc, family, sub, chips}); this file reads them all, so the sibling links on
// every instrument page, the "Tuners by instrument" list on the general tuner page, the hub and the
// OG images (gen-og.py) all follow from the files that exist. Nothing to register by hand.
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, 'instruments');
const FAMILY_ORDER = ['strings', 'woodwind', 'brass', 'percussion'];

module.exports = fs.readdirSync(DIR).filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')))
  .sort((a, b) => (FAMILY_ORDER.indexOf(a.family) - FAMILY_ORDER.indexOf(b.family)) || ((a.order || 99) - (b.order || 99)) || a.name.localeCompare(b.name));
