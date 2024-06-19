const fs = require('fs-extra');
const handlebars = require('handlebars');
const sass = require('node-sass');

// Funkcja kompilująca SCSS do CSS
function compileSass() {
    return new Promise((resolve, reject) => {
        sass.render({
            file: './styles/style.scss',
            outputStyle: 'compressed'
        }, (err, result) => {
            if (err) reject(err);
            else resolve(result.css.toString());
        });
    });
}

// Funkcja generująca HTML
async function generateHtml() {
    try {
        const css = await compileSass();  // Czekamy na skompilowany CSS
        const template = fs.readFileSync('./templates/landing.hbs', 'utf-8');
        const templateCompile = handlebars.compile(template);
        const data = fs.readJsonSync('./data/content.json');

        // Dodajemy CSS bezpośrednio do HTML
        const html = templateCompile({
            ...data,
            style: css
        });

        fs.outputFileSync('./dist/index.html', html);
        console.log('Site generated successfully with inline CSS!');
    } catch (error) {
        console.error('Failed to generate HTML:', error);
    }
}

generateHtml();  // Uruchomienie funkcji generującej HTML
