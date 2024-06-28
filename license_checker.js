const licenseChecker = require('license-checker');
const fs = require('fs');

// Options for license-checker
const options = {
  start: './',
  production: true,
  json: true,
  unknown: true,
  onlyAllow: true,
  onlyDirectDependencies: true
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
