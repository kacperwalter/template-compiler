const fs = require('fs')

// Read files
const html = fs.readFileSync('src/index.html', 'utf8')
const css = fs.readFileSync('build/styles.css', 'utf8')

// Inject CSS into HTML
const output = html.replace('<!-- Styles will be injected here -->', `<style>${css}</style>`)

// Write the final HTML
fs.writeFileSync('build/index.html', output)