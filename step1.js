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

cat(process.argv[2]);

