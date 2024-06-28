const licenseChecker = require('license-checker');
const fs = require('fs');

// Read package.json to get dependencies
const packageJson = require('./package.json');

// Convert dependencies to array format expected by license-checker
const dependencies = Object.keys(packageJson.dependencies).map(pkg => `${pkg}@${packageJson.dependencies[pkg]}`);

// Read licenses.txt to get list of allowed licenses
const allowedLicenses = fs.readFileSync('licenses.txt', 'utf8').split('\n').map(line => line.trim()).filter(line => line !== '');

// Options for license-checker
const options = {
  start: './',
  production: true,
  json: true,
  unknown: true,
  onlyAllow: true,
  onlyDirectDependencies: true,
  filter: allowedLicenses.join(',')
};

// Run license-checker
licenseChecker.init(options, function (err, json) {
  if (err) {
    console.error('Error:', err);
    return;
  }

  // Write filtered license information to a JSON file
  fs.writeFileSync('licenses.json', JSON.stringify(json, null, 2));
  console.log('Filtered license information saved to licenses.json');
});
