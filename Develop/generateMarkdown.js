const fs = require('fs');

//Create the installation section
const generateInstallation = installation => {
  if (!installation) {
    return '';
  }

  return `

## Installation
${installation}`;
};

//If the user chose to use the contributor covenant, generate the section using that
const generateContributionCovenant = confirmContributionCovenant => {
  if (!confirmContributionCovenant) {
    return '';
  }

  return `

## Contributing
This project uses the Contributor Covenant Code of Conduct. You can view the covenant code [here](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md)`;
};

//If the user chose to write their own contribution instruction, use that.
const generateContribution = contribution => {
  if (!contribution) {
    return '';
  }

  return `

## Contributing
${contribution}`;
};

// create the tests section
const generateTests = tests => {
  if (!tests) {
    return '';
  }

  return `

## Tests
${tests}`;
};

const generateLicenseBadge = license => {
  var licenseBadge;
  switch(license){
    case 'Unlicense':
      licenseBadge = `[![Unlicense](https://img.shields.io/badge/License-Unlicense-blue.svg)](https://unlicense.org/)`;
      break;
    case 'Boost Software License 1.0':
      licenseBadge = `[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)`;
      break;
    case 'MIT License':
      licenseBadge = `[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)`;
      break;
    case 'Apache License 2.0':
      licenseBadge = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
      break;
    case 'Mozilla Public License 2.0':
      licenseBadge = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
      break;
    case 'GNU':
      licenseBadge = `[![GPL license](https://img.shields.io/badge/License-GPL-blue.svg)](http://perso.crans.org/besson/LICENSE.html)`;
      break;
    case 'GNU GPLv3':
      licenseBadge = `[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)`;
      break;
    case 'Creative Commons':
      licenseBadge = `[![CC-0 license](https://img.shields.io/badge/License-CC--0-blue.svg)](https://creativecommons.org/licenses/by-nd/4.0)`;
      break;
  }
  return licenseBadge;
}

const generateLicenseSection = license => {  
  switch(license){
    case 'Unlicense':
      return `
## License
This project uses the [Unlicense](https://choosealicense.com/licenses/unlicense/).`;
    
    case 'Boost Software License 1.0':
      return `
## License
This project is using the [Boost Software License 1.0](https://choosealicense.com/licenses/bsl-1.0/).`;
    
    case 'MIT License':
      return `
## License
This project is using the [MIT](https://choosealicense.com/licenses/mit/) license.`;
    
    case 'Apache License 2.0':
      return `
## License
This project is using the [Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/).`;

    case 'Mozilla Public License 2.0':
      return `
## License
 This project is using a [Mozilla Public License 2.0](https://choosealicense.com/licenses/mpl-2.0/).`;

    case 'GNU':
      return `
## License
This project is using a [GNU](https://choosealicense.com/licenses/gpl-2.0/) license.`;

    case 'GNU GPLv3':
      return `
## License
This project is using a [GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/) license.`;

    case 'Creative Commons':
      return `
## License
This project is using a [Creative Commons](https://choosealicense.com/licenses/cc0-1.0/) license.`;
  }
}

const generateTableOfContents = data => {  
  //Usage & License are required
  var tableOfContents = `
## Table of Contents
- [Usage](#Usage)`;
  tableOfContents += `
- [License](#License)`;

  //Check to see if non-required fields should be included
  if (data.installation)
  {
    tableOfContents += `
- [Installation](#Installation)`;
  }
  if(data.contribution || data.confirmContributionCovenant)
  {
    tableOfContents += `
- [Contributing](#Contributing)`;
  }
  if(data.tests)
  {
    tableOfContents += `
- [Tests](#Tests)`;
  }
  
  //Questions is Required 
  tableOfContents += `
- [Questions](#Questions)`;

  return tableOfContents;
}

// Note for editing formating: functions above include a line break *before* the markup it returns, with no line break after.
function generateMarkdown(data) {  
  return `# ${data.title} ${generateLicenseBadge(data.license)}

## Description
${data.description}
${generateTableOfContents(data)} ${generateInstallation(data.installation)}

## Usage
${data.usage}
${generateLicenseSection(data.license)} ${generateContributionCovenant(data.confirmContributionCovenant)} ${generateContribution(data.contribution)} ${generateTests(data.tests)}

## Questions
[My GitHub](github.com/${data.username})
For any questions, feel free to email ${data.email}.`;
}

// TODO: Create a function to write README file
const writeToFile = fileContent => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./README.md', fileContent, err => {
      if (err) {
        reject(err);
        return;
      }

      resolve({
        ok: true,
        message: 'File created!'
      });
    });
  });
};

module.exports = { generateMarkdown, writeToFile };