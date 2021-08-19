const { generateMarkdown, writeToFile } = require('../generateMarkdown');

const sampleAnswers = require('./sample-answers');

writeToFile(generateMarkdown(sampleAnswers))
  .then(() => {
    console.log('All Done!');
  })
  .catch(err => {
    console.log(err);
  });