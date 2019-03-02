/**
 * @fileoverview Sophisticate the SVG files and generate the containing HTML file from the template.
 * @author Frédéric Maquin <fred@ephread.com>
 */

// ----------------------------------------------------------------------------
// Requirements
// ----------------------------------------------------------------------------

import FS from 'fs';
import Chalk from 'chalk';
import Path from 'path';
import Ejs from 'ejs';
import { processSVG } from './inline-svg';

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

/**
 * sophisticateHTML - Sophisticate the SVG files and generate the containing
 *                    HTML file from the template.
 *
 * @param {object} argv parsed command line arguments.
 */
export function sophisticateHTML (argv) {
  console.log('Generating HTML files…');

  if (argv.s) {
    var fileName = (typeof argv.s === 'string') ? argv.s : 'inlined-all';
    var processes = [];

    for (let path of argv._) {
      processes.push(new Promise(function (resolve, reject) {
        processSVG(path, argv.c, function (result) {
          resolve({
            name: getBasenameWithoutExtension(path),
            content: result.data
          });
        });
      }));
    }

    Promise.all(processes).then(function (data) {
      writeHTML(argv, fileName, data);
    });
  } else {
    for (let path of argv._) {
      processSVG(path, argv.c, function (result) {
        writeHTML(argv, path, result.data);
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
function writeHTML (argv, path, svg) {
  let filename = `${argv.o}/${getBasenameWithoutExtension(path)}.html`;

  Ejs.renderFile(argv.t, {svg: svg}, function (err, str) {
    if (err) {
      console.log(`[${Chalk.red('ERROR')}] Couldn't render HTML file - ${err.message}`);
      process.exit(1);
    }

    FS.writeFile(filename, str, function (fsErr) {
      if (fsErr) {
        console.log(`[${Chalk.red('ERROR')}] Couldn't write HTML file - ${fsErr.message}`);
        process.exit(1);
      } else {
        console.log(`${Chalk.green('DONE!')} - Output: ${filename}`);
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
function getBasenameWithoutExtension (path) {
  return Path.basename(path).replace(/\.[^/.]+$/, '');
}
