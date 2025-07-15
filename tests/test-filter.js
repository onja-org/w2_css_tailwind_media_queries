#!/usr/bin/env node

// Don't worry about this file
// it's just a utility script to make the test output more concise for the students.
// Description: A script to run Mocha tests and filter output to stop at the first summary line.

const { spawn } = require("child_process");
const process = require("process");

// Spawn mocha with color output
const mocha = spawn("npx", ["mocha", "tests/**/*.test.js", "--color"], {
  stdio: ["inherit", "pipe", "pipe"],
});

let buffer = "";
let foundSummary = false;

// Process stdout line by line
mocha.stdout.on("data", data => {
  buffer += data.toString();

  // Split into lines but keep the last incomplete line in buffer
  let lines = buffer.split("\n");
  buffer = lines.pop() || "";

  for (let line of lines) {
    process.stdout.write(line + "\n");

    // Look for the summary pattern: "  X passing" or "  X failing"
    if (line.includes("passing") || line.includes("failing")) {
      foundSummary = true;

      // If this is a "failing" line, we're done
      if (line.includes("failing")) {
        // Print any remaining buffer and exit
        if (buffer.trim()) {
          process.stdout.write(buffer);
        }
        mocha.kill("SIGTERM");
        process.exit(0);
      }
    }

    // If we found a "passing" line and now hit an empty line, we're done
    if (foundSummary && line.trim() === "") {
      // Print any remaining buffer and exit
      if (buffer.trim()) {
        process.stdout.write(buffer);
      }
      mocha.kill("SIGTERM");
      process.exit(0);
    }
  }
});

// Handle stderr
mocha.stderr.on("data", data => {
  process.stderr.write(data);
});

// Handle mocha exit
mocha.on("close", code => {
  // Print any remaining buffer
  if (buffer.trim()) {
    process.stdout.write(buffer);
  }
  process.exit(code);
});

// Handle script interruption
process.on("SIGINT", () => {
  mocha.kill("SIGINT");
});
