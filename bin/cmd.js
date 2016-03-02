#!/usr/bin/env node

"use strict";

const fs = require("fs");
const minimist = require("minimist");
const colors = require("colors");
const gitDiffArchive = require("../");

const argv = minimist(process.argv.slice(2), {
  alias: {
    F: "diff-filter",
    f: "format",
    o: "output",
    p: "prefix",
    h: "help"
  }
});

// help
if (argv.help) {
  fs.createReadStream(__dirname + "/usage.txt").pipe(process.stdout);
  return;
}

// parse options
const commits = argv._.slice();
const commit = commits[0];
const oldCommit = commits[1];
const options = {};
if (argv["diff-filter"]) options.diffFilter = argv["diff-filter"];
if (argv.format) options.format = argv.format;
if (argv.output) options.output = argv.output;
if (argv.prefix) options.prefix = argv.prefix;

// archive
gitDiffArchive(commit, oldCommit, options)
  .then((res) => {
    console.log(colors.cyan("Done!!"));
    console.log(colors.cyan("Output >>> "), res.output);
  })
  .catch((err) => {
    console.error(colors.red(`[Error] ${err}`));
  });
