const fs = require('fs')
const execSync = require('child_process').execSync

const command = process.argv[2]
const projectName = process.argv[3]

if (command === 'init' && projectName) {
    const targetDir = `${process.cwd()}/${projectName}`
    fs.mkdirSync(targetDir, { recursive: true })
    fs.copyFileSync(`${__dirname}/../src/index.html`, `${targetDir}/index.html`)
    fs.copyFileSync(`${__dirname}/../src/styles.scss`, `${targetDir}/styles.scss`)

    process.chdir(targetDir)
    execSync('npm init -y', { stdio: 'inherit' })
    execSync('npm install node-sass chokidar-cli --save-dev', { stdio: 'inherit' })

    let packageJson = fs.readFileSync('package.json')
    packageJson = JSON.parse(packageJson)
    packageJson.scripts = {
        ...packageJson.scripts,
        "build:css": "node-sass styles.scss styles.css",
        "build:html": "node build.js",
        "watch": "chokidar 'src/*' -c 'npm run build:css && npm run build:html'"
    }
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2))

    console.log('Project created successfully!')
    console.log('Run `npm run watch` to start the development server.')
} else {
    console.log('Usage: tcc init <project-name>')
}