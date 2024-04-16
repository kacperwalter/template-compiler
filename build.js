const fs = require('fs')

const html = fs.readFileSync('src/index.html', 'utf8')
const css = fs.readFileSync('build/styles.css', 'utf8')

const output = html.replace('<!-- Styles will be injected here -->', `<style>${css}</style>`)

fs.writeFileSync('build/index.html', output)