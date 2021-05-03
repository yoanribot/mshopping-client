const fs = require('fs');
const _ = require('lodash');
const globSync = require('glob').sync;
const watch = require('glob-watcher');
const isWatch = process.argv.indexOf('--watch') >= 0;
const mkdirSync = require('mkdirp').sync;
const filePattern = './src/**/*+(i18n-messages).json';
const outputLanguageDataDir = './build/locales/';

const i18nScanner = () => {
  let hasError = false;
  const files = globSync(filePattern);

  console.log('files', files);

  console.log('INIT: translations files scan....');

  const translation = files
    .map(filename => ({ name: filename, value: fs.readFileSync(filename, 'utf8') }))
    .map((file) => {
      try {
        return JSON.parse(file.value);
      } catch (err) {
        hasError = true;
        console.error('ERROR: ', file.name, err.message);
      }
    })
    .reduce((result, file) => _.assign(result, file), {});

  const duplicatedTranslations = _.reduce(translation, (result, value, key) => {
    result[value] = result[value] ? [...result[value], key] : [key];

    return result;
  }, {});

  const duplications = {};

  if (!hasError) {
    _.forEach(duplicatedTranslations, (value, key) => {
      if (value.length > 1) {
        console.warn(`WARN: The translation "${key}" is repeated in the next IDs: [${value.join(', ')}]`);
        duplications[key] = value.join(', ');
      }
    });

    mkdirSync(outputLanguageDataDir);

    fs.writeFileSync(`${outputLanguageDataDir}i18n-en.json`, `${JSON.stringify({ en: { translation } }, null, 2)}`);
    fs.writeFileSync(`${outputLanguageDataDir}i18n-build-duplications.json`, `${JSON.stringify({ duplications }, null, 2)}`);

    console.log(`-----RESUME WARNING: ${duplications.length} key duplications were found in the project, please resolve the conflicts ASP`);
    console.log(`Translations file ${outputLanguageDataDir}i18n-en.json successfully created!`);
  }
};

const startWatcher = () => {
  console.log('Started i18n-watcher....');

  i18nScanner();

  watch([filePattern], (done) => {
    i18nScanner();
    done();
  });
};

if (isWatch) {
  startWatcher();
  process.on('uncaughtException', (err) => {
    console.error(err.message);
  });
} else {
  i18nScanner();
}
