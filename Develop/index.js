// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const { generateMarkdown, writeToFile } = require('./generateMarkdown');

const promptUser = () => {
    return inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the project? (Required)',
        validate: titleInput => {
          if (titleInput) {
            return true;
          } else {
            console.log('Please enter a title!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter a description of the project (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('Please enter a description');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'confirmInstallation',
        message: 'Does this project require installation instructions?',
        default: true
      },
      {
        type: 'input',
        name: 'installation',
        message: 'Provide the installation intructions:',
        when: ({ confirmInstallation}) => confirmInstallation
      },
      {
        type: 'input',
        name: 'usage',
        message: 'Enter usage infromation (Required)',
        validate: usageInformation => {
          if (usageInformation) {
            return true;
          } else {
            console.log('Please enter usage information');
            return false;
          }
        }
      },
      {
        type: 'list',
        name: 'license',
        message: 'Choose a software license for your project. For more information on these licenses, see https://choosealicense.com/licenses/',
        choices: ['Unlicense', 'Boost Software License 1.0', 'MIT License', 'Apache License 2.0', 'Mozilla Public License 2.0', 'GNU', 'GNU GPLv3', 'Creative Commons']
      },
      {
        type: 'confirm',
        name: 'confirmContributionCovenant',
        message: 'Would you like to use the contribution covenant for your contribution standards? More information can be found at https://www.contributor-covenant.org/',
        default: true
      },
      {
        type: 'confirm',
        name: 'confirmContributionInstructions',
        message: 'Would you like to provide your own contribution instructions?',
        when: ({ confirmContributionCovenant }) => {
            if (confirmContributionCovenant ) {
              return false;
            } else {
              return true;
            }
          }
      },
      {
        type: 'input',
        name: 'contributionInstructions',
        message: 'Provide your contribution instructions:',
        when: ({ confirmContributionInstructions }) => {
            if (confirmContributionInstructions ) {
              return true;
            } else {
              return false;
            }
          }
      },
      {
        type: 'confirm',
        name: 'confirmTests',
        message: 'Do you have any test intructions to provide?',
      },
      {
        type: 'input',
        name: 'tests',
        message: 'Provide your test instructions:',
        when: ({ confirmTests }) => {
            if (confirmTests ) {
              return true;
            } else {
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'username',
        message: 'Enter your github username (Required)',
        validate: username => {
          if (username) {
            return true;
          } else {
            console.log('Please enter your github username');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter an email where you can be reached for questions: (Required)',
        validate: email => {
          if (email) {
            return true;
          } else {
            console.log('Please enter an email for questions.');
            return false;
          }
        }
      },
    ]);
  };

// TODO: Create a function to initialize app
function init() {
    promptUser()
    .then(readMeData => {
        return generateMarkdown(readMeData);
    })
    .then(markDown => {
        return writeToFile(markDown);
    })
    .then(() => {
      console.log('All done!');
    })
    .catch(err => {
        console.log(err);
      });
}

// Function call to initialize app
init();

//Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions

//plain text: description, installation instructions, usage information, contribution guidelines, and test instructions
//license is multiple choice: a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
/// enter my GitHub username => github link
//email address => prefilled text