To build this project, you'll need to have Node.JS and NPM installed.

You can then download the project using Git, and install the dependencies:

1. `git clone https://github.com/TimStallard/CryptoAssist.git`
2. `npm install`

If you'd like to run webpack's development server, run `npm run dev-server`. This will start a web server listening on port 8080 with live reload and automatic recompilation when files are edited.
Babel isn't used for the development version, so you'll need to use a browser with full ES6 support.

To generate a minified ES5 version of the project for distribution, run `npm run build`. This will use Babel and Uglify to convert the project to ES5 and minify it. The output will be placed in the `build` directory.
