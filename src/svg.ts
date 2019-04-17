/**
 * @fileoverview Sophisticate the SVG files.
 * @author Frédéric Maquin <fred@ephread.com>
 */

// ----------------------------------------------------------------------------
// Requirements
// ----------------------------------------------------------------------------

import Chalk from "chalk";
import * as FS from "fs";
import * as Path from "path";
import { processSVG } from "./inline-svg";

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

/**
 * sophisticateSVG - Sophisticate the SVG files.
 *
 * @param {type} argv parsed command line arguments.
 */
export function sophisticateSVG(argv: any) {
  console.log("Processing files…");
  for (const path of argv._) {
    processSVG(path, argv.c).then((result) => {
      const filename = `${argv.c}/sophisticated_${Path.basename(path)}`;

      FS.writeFile(filename, result.data, (err) => {
        if (err) {
          console.log(`[${Chalk.red("ERROR")}] Couldn't write processed SVG file - ${err.message}`);
          process.exit(1);
        } else {
          console.log(`${Chalk.green("DONE!")} - Output: ${filename}\n`);
        }
      });
    });
  }
}
