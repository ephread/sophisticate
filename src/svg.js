/**
 * @fileoverview Sophisticate the SVG files.
 * @author Frédéric Maquin <fred@ephread.com>
 */

// ----------------------------------------------------------------------------
// Requirements
// ----------------------------------------------------------------------------

import FS from 'fs';
import Chalk from 'chalk';
import Path from 'path';
import { processSVG } from './inline-svg';

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

/**
 * sophisticateSVG - Sophisticate the SVG files.
 *
 * @param {type} argv parsed command line arguments.
 */
export function sophisticateSVG (argv) {
  console.log('Processing files…');
  for (let path of argv._) {
    processSVG(path, argv.c, function (result) {
      let filename = `${argv.c}/sophisticated_${Path.basename(path)}`;

      FS.writeFile(filename, result.data, function (err) {
        if (err) {
          console.log(`[${Chalk.red('ERROR')}] Couldn't write processed SVG file - ${err.message}`);
          process.exit(1);
        } else {
          console.log(`${Chalk.green('DONE!')} - Output: ${filename}\n`);
        }
      });
    });
  }
}
