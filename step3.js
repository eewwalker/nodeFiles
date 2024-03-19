"use strict";

const { read } = require('fs');
const fsP = require('fs/promises');

process.argv[2] ===
  '--out' ? outPutToFile(process.argv[3], process.argv[4]) : isUrlOrText(process.argv[2]);


/** Read file from path or log error */
async function cat(path) {
  let contents;

  try {
    contents = await fsP.readFile(path, "utf-8");
  }

  catch (e) {
    console.log('error', e);
    process.exit(1);
  }

  console.log("file contents", contents);
  return contents;
}


/** Checks if process.argv is a URL or Text */
function isUrlOrText(arg) {
  try {

    new URL(arg);
    webCat(arg);

  } catch (e) {

    console.log('error', e);
    cat(arg);

  }
}


/** Make fetch request to read URL and print to console  */
async function webCat(URL) {

  let contents;

  try {
    const resp = await fetch(URL);
    const data = await resp.text();

    contents = await fsP.readFile(data, "utf-8");

  } catch (e) {

    console.log(`Error fetching ${URL}: ${e}`);
    process.exit(1);

  }

  console.log(contents);

}

/** Takes file to output to new file  */
async function outPutToFile(path, readFile) {

  try {

    let contents = await cat(readFile);
    await fsP.writeFile(path, contents, 'utf-8');

  } catch (e) {

    console.log(`Couldn't write ${path}: Error: ${e}`);
    process.exit(1);


  }

}


