/**
 * @fileoverview Sophisticate the SVG files and generate the containing HTML file from the template.
 * @author Frédéric Maquin
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import FS             from 'fs';
import Chalk          from 'chalk';
import Path           from 'path';
import Ejs            from 'ejs';
import { processSVG } from './inline-svg';

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

/**
 * sophisticateHTML - Sophisticate the SVG files and generate the containing
 *                    HTML file from the template.
 *
 * @param {object} argv parsed command line arguments.
 */
export function sophisticateHTML(argv) {
  console.log('Generating HTML files…');

  for (let path of argv._) {
    processSVG(path, argv.c, function(result) {
      let filename = `${argv.o}/${Path.basename(path).replace(/\.[^/.]+$/, "")}.html`;

      Ejs.renderFile(argv.t, {svg: result.data}, function(err, str) {
        if (err) {
          console.log(`[${Chalk.red("ERROR")}] Couldn't render HTML file - ${err.message}`);
          process.exit(1);
        }

        FS.writeFile(filename, str, function(fsErr) {
          if (fsErr) {
            console.log(`[${Chalk.red("ERROR")}] Couldn't write HTML file - ${fsErr.message}`);
            process.exit(1);
          } else {
            console.log(`${Chalk.green("DONE!")} - Output: ${filename}`);
          }
        });
      });
    });
  }
}
