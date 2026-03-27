import type { BunFile } from 'bun';

async function fileSystemOperations() {

  // Read a file
  const file: BunFile = Bun.file('tx/read.txt');
  const content = await file.text();
  console.log('File Content:', content);
  console.log('File Size:', file.size);
  console.log('File type:', file.type);

  const arrayBuff = await file.arrayBuffer()
  const uintArray = await file.bytes();
  console.log('Array buffer:', arrayBuff);
  console.log('Uint Array:', uintArray);

  // Write file
  const cont = 'Hola, Como te ilamas?'
  await Bun.write("output.txt", cont)
  console.log('File written successfully')

  // copying and writing 
  const inputFile = Bun.file('output.txt');
  await Bun.write('read_copy.txt', inputFile);
  console.log('File copied and created successfully')

  const isFileExists = await Bun.file('read_copy.txt').exists()
  console.log(isFileExists)

  // Delete the file
  await Bun.file('read_copy.txt').delete()
  console.log('File deleted successfully')

} fileSystemOperations()