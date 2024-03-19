"use strict";

const fsP = require('fs/promises');


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
}


/** Checks if process.argv is a URL or Text */
function isUrlOrText(arg) {
  try {

    new URL(arg);
    webCat(arg);

  } catch (e) {

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

isUrlOrText(process.argv[2]);


