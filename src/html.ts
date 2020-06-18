/**
 * @fileoverview Sophisticate the SVG files and generate the containing HTML file from the template.
 * @author Frédéric Maquin <fred@ephread.com>
 */

// ----------------------------------------------------------------------------
// Requirements
// ----------------------------------------------------------------------------

import * as Chalk from "chalk";
import * as Ejs from "ejs";
import * as FS from "fs";
import * as Path from "path";
import { processSVG } from "./inline-svg";

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

/**
 * sophisticateHTML - Sophisticate the SVG files and generate the containing
 *                    HTML file from the template.
 *
 * @param {object} argv parsed command line arguments.
 */
export function sophisticateHTML(argv: any): any {
  console.log("Generating HTML files…");

  if (argv.s) {
    const fileName = (typeof argv.s === "string") ? argv.s : "inlined-all";
    const processes = [];

    for (const path of argv._) {
      processes.push(processSVG(path, argv.c));
    }

    Promise.all(processes).then((data) => {
      writeHTML(argv, fileName, data);
    }).catch(() => {
      // Do Nothing
    });
  } else {
    for (const path of argv._) {
      processSVG(path, argv.c).then((result) => {
        writeHTML(argv, path, result.data);
      }).catch(() => {
        // Do Nothing
      });
    }
  }
}

/**
 * writeHTML - Sophisticate the SVG files and generate the containing
 *             HTML file from the template.
 *
 * @param {object} argv parsed command line arguments.
 * @param {string} path path to the original SVG file OR basename of the HTML file to write.
 * @param {object|string} svg svg object to write into the HTML template.
 */
function writeHTML(argv: any, path: string, svg: any[] | string) {
  const filename = `${argv.o}/${getBasenameWithoutExtension(path)}.html`;

  Ejs.renderFile(argv.t, {svg}, (err, str) => {
    if (err) {
      console.log(`[${Chalk.red("ERROR")}] Couldn't render HTML file - ${err.message}`);
      process.exit(1);
    }

    FS.writeFile(filename, str, (fsErr) => {
      if (fsErr) {
        console.log(`[${Chalk.red("ERROR")}] Couldn't write HTML file - ${fsErr.message}`);
        process.exit(1);
      } else {
        console.log(`${Chalk.green("DONE!")} - Output: ${filename}`);
      }
    });
  });
}

/**
 * getBasenameWithoutExtension - Return the basename without extension, from the given path.
 *
 * @param {string} path path to reduce.
 * @return {string} basename without extension
 */
function getBasenameWithoutExtension(path: string) {
  return Path.basename(path).replace(/\.[^/.]+$/, "");
}
