const fs = require('fs-extra')
const handlebars = require('handlebars')
const sass = require('node-sass')

function compileSass() {
    return new Promise((resolve, reject) => {
        sass.render({
            file: './styles/style.scss',
            outputStyle: 'compressed'
        }, (err, result) => {
            if (err) reject(err)
            else {
                fs.outputFile('./dist/style.css', result.css, resolve)
            }
        })
    })
}

function generateHtml() {
    const template = fs.readFileSync('./templates/landing.hbs', 'utf-8')
    const templateCompile = handlebars.compile(template)
    const data = fs.readJsonSync('./data/content.json')
    const html = templateCompile(data)
    fs.outputFileSync('./dist/index.html', html)
}

async function buildSite() {
    try {
        await compileSass()
        generateHtml()
        console.log('Site generated successfully!')
    } catch (error) {
        console.error('Failed to build site:', error)
    }
}

buildSite()