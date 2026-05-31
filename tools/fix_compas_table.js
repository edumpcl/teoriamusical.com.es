const fs = require('fs');
const fp = 'ejercicios/compases/analizar-compas/index.html';
let html = fs.readFileSync(fp, 'utf8');

// Add id to the table
html = html.replace('<table class="tm-table">', '<table class="tm-table" id="tm-tabla-compases">');

// Remove all text-align:center inline styles
html = html.replace(/ style="text-align:center"/g, '');

// Add embedded style before </head>
const style = '<style>\n#tm-tabla-compases th:not(:first-child),\n#tm-tabla-compases td:not(:first-child) { text-align: center; }\n</style>\n';
html = html.replace('</head>', style + '</head>');

fs.writeFileSync(fp, html);
console.log('Done. Removed inline text-align:center styles from compas table.');
