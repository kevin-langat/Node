const fs = require('fs');
const path = require('path');

// creating a new folder
const dataFolder = path.join(__dirname, 'data');
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
  console.log('data folder created at', new Date());
}

// creating a new file
const filePath = path.join(dataFolder, 'example.js');
console.log(filePath);
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, "console.log('hello from node')");
  console.log('file created successfully');
}
// how to read content from a file
const readFileContent = fs.readFileSync(filePath, 'utf-8');
console.log('File Content of example.js:', readFileContent);

// to append content into a file
fs.appendFileSync(filePath, 'Console.log("This is a new content added");');
console.log(
  'New Contents of the example.js file:',
  fs.readFileSync(filePath, 'utf-8')
);

// aync way of creating a file
const asyncPath = path.join(dataFolder, 'async.txt');

fs.writeFile(asyncPath, 'hello async node js', (err) => {
  if (err) throw err;
  console.log('Async file created');
  // reading the contents of the file
  fs.readFile(asyncPath, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log('Async File Content:', data);
  });
  //  appending data asynchronously;
  fs.appendFile(asyncPath, '\nThis is new Line added asynchronously', (err) => {
    if (err) throw err;
    console.log('New line added to async file');

    // If we want to read the added data asynchronously after appending the new data

    fs.readFile(asyncPath, 'utf-8', (err, updatedData) => {
      if (err) throw err;
      console.log(
        'This is the updated data after appending aynschronously:',
        updatedData
      );
    });
  });
});
