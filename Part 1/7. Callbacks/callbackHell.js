const fs = require('fs');
const path = require('path');
const outputFilePath = path.join(__dirname, 'output.txt');

fs.writeFile(outputFilePath, 'Hello from node js', (err) => {
  if (err) throw err;
  console.log('Output.txt file created successfully');

  fs.readFile(outputFilePath, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log('Existing Data:', data);
    const modifyData = data.toUpperCase();

    fs.appendFile(outputFilePath, `\n${modifyData}`, (err) => {
      if (err) throw err;
      console.log('New Data written successfully');

      fs.readFile(outputFilePath, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log('This the new Data:\n', data);
      });
    });
  });
});
