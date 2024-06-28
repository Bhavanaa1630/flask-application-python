const licenseChecker = require('license-checker');
const fs = require('fs');

// Read package.json to get dependencies
const packageJson = require('./package.json');

// Convert dependencies to array format expected by license-checker
const dependencies = Object.keys(packageJson.dependencies).map(pkg => `${pkg}@${packageJson.dependencies[pkg]}`);

// Options for license-checker
const options = {
  start: './',
  production: true,
  json: true,
  unknown: true,
  onlyAllow: true,
  onlyDirectDependencies: true,
  filter: ''
};

// Run license-checker
licenseChecker.init(options, function (err, json) {
  if (err) {
    console.error('Error:', err);
    return;
  }

  // Write license information to a JSON file
  fs.writeFileSync('licenses.json', JSON.stringify(json, null, 2));
  console.log('License information saved to licenses.json');
});
