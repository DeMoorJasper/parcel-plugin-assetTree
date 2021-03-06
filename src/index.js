const path = require('path');
const Bundler = require('parcel-bundler');
const buildDataJson = require('./build-data-json');

async function generateGraph(entryPoint, options = {}) {
  const cwd = process.cwd();

  // Hacky way of making parcel throw errors
  process.env.NODE_ENV = 'test';

  // Init bundler
  const bundler = new Bundler(entryPoint, {
    outDir: path.join(cwd, '.import-grapher', 'dist'),
    cacheDir: path.join(cwd, '.import-grapher', '.cache'),
    publicUrl: './',
    watch: false,
    logLevel: 1, // Only show errors
    cache: options.cache || true,
    target: 'node',
    autoinstall: false,
    minify: false,
    production: true
  });

  // Run bundler
  const bundle = await bundler.bundle();
  if (!bundle) {
    throw new Error('An error occured while processing code...');
  }

  return buildDataJson(bundle, options.processNode);
}

module.exports = generateGraph;
