const fs = require('fs');
const globSync = require('glob').sync;
const path = require('path');

const needUpdateExp = '?????';
const defaultLanguageFileName = 'i18n-en.json';
const buildTranslationFolderPath = './build/locales/';
const tempTranslationFolderPath = './public/temp/';
const publicTranslationFolderPath = './public/locales/';

const getLanguageCode = (filePath) => {
  const fileName = path.basename(filePath);
  var test = fileName.match(/-(.*)\./);

  return test[1];
};

const syncTempDefaultTranlationLanguageFile = () => {
  const source = `${buildTranslationFolderPath}${defaultLanguageFileName}`;
  const dest = `${tempTranslationFolderPath}${defaultLanguageFileName}`;

  // Update the default language (EN) with the one in the last build
  fs.copyFile(source, dest, (err) => {
    if (err) { throw err; }
    console.log('Updated temp text to translate with the last tranlation build');
  });
}

console.log('INIT: translations sync....');

try {

  if (!fs.existsSync(`${tempTranslationFolderPath}${defaultLanguageFileName}`)) {
    console.log('Didnt exist a previous record of translation to sync');
    syncTempDefaultTranlationLanguageFile();
  }

  // Update extra languages files in temp with the ones on public (last updated translations)
  const publicFiles = globSync(`${publicTranslationFolderPath}/**.json`);

  publicFiles.map((file) => {
    const destFileName = path.basename(file);
    const destPath = path.join(tempTranslationFolderPath, destFileName);

    fs.copyFileSync(file, destPath);
    console.log('Updated temp translation files with the ones in public');
  });

  // Generate tags for new texts to translate (Sync translation files)
  const enBuildTranslations = JSON.parse(fs.readFileSync(`${buildTranslationFolderPath}${defaultLanguageFileName}`, 'utf8')).en.translation;
  const tempFiles = globSync(`${tempTranslationFolderPath}/**.json`);

  const languageTranslations = tempFiles.reduce((res, file) => {
    const fileName = path.basename(file);
    const code = getLanguageCode(fileName);
    const translation = JSON.parse(fs.readFileSync(file, 'utf8'))[code].translation;

    return { ...res, [fileName]: translation };
  }, {});

  const translationKeys = Object.keys(enBuildTranslations);

  console.log('Object.keys(languageTranslations)', Object.keys(languageTranslations));

  Object.keys(languageTranslations).map((translationFileName) => {
    const tempLanguageTranslation = languageTranslations[translationFileName];
    const code = getLanguageCode(translationFileName);
    let newKeysCount = 0;
    let updatedKeysCount = 0;

    console.log('INIT check on:', translationFileName);

    translationKeys.map((key) => {

      // new text to translate added
      if (!tempLanguageTranslation[key]) {
        newKeysCount++;
        console.log(`--- New key: ${key} found`);

        tempLanguageTranslation[key] = `${enBuildTranslations[key]} ${needUpdateExp}`;
      } else if (tempLanguageTranslation[key] !== enBuildTranslations[key] && code === 'en') {
        // updated previous
        updatedKeysCount ++;
        console.log(`updated key: ${key} found and added to ${tempTranslationFolderPath}${translationFileName}`);

        Object.keys(languageTranslations).map((_translationFileName) => {
          const _tempLanguageTranslation = languageTranslations[_translationFileName];

          _tempLanguageTranslation[key] = `${enBuildTranslations[key]} ${needUpdateExp}`;

          fs.writeFileSync(`${tempTranslationFolderPath}${_translationFileName}`, `${JSON.stringify({ [code]: { translation: _tempLanguageTranslation } }, null, 2)}`);
        });
      }
    });
    console.log(`-------------------------------------- RESUME: ${translationFileName} ---------------------------------------`);
    console.log(`${newKeysCount} new keys found and added to ${tempTranslationFolderPath}${translationFileName}`);
    console.log(`${updatedKeysCount} updated keys found and added to ${tempTranslationFolderPath}${translationFileName}`);

    fs.writeFileSync(`${tempTranslationFolderPath}${translationFileName}`, `${JSON.stringify({ [code]: { translation: tempLanguageTranslation } }, null, 2)}`);
  });

  // TO sync the temp EN translation file with the last one from the last processed build
  // IMPORTANT: wait to translate, update and replace the translation files on public/locales to execute again
  syncTempDefaultTranlationLanguageFile();
} catch (err) {
  console.error(err);
}