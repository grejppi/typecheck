const tailwindcss = require('tailwindcss');

let plugins = [tailwindcss];

if (process.env.NODE_ENV === 'production') {
  const purgecss = require('@fullhuman/postcss-purgecss');

  plugins.push(purgecss({
    content: [
      'src/**/*.html',
      'src/**/*.js',
    ],
    defaultExtractor: (content) =>
      content.match(/[A-z0-9-:\/]+/g) || [],
  }));
}

module.exports = { plugins };
