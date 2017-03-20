/**
 * @fileoverview ARGV parsing helpers.
 * @author Frédéric Maquin
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import FS    from 'fs';
import Chalk from 'chalk';
import Yargs from 'yargs';

const configDirectory = `${__dirname}/../../config`

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * parseArgs - Parse the command line arguments using YARGS.
 *
 * @return {Object} parsed arguments
 */
export function parseArgs() {
  var argv =
    Yargs.usage('usage: $0 <svg|html|match> -o <output-directory> [<options>] <svg-file> [<svg-file>]…')
         .demandCommand(2, "Not enough argument: must provide either the svg, html or match command.")
         .help()
         .command('svg', 'Sophisticate the given SVGs', function (yargs) {
           yargs
             .usage('usage: $0 svg <svg> [<svg2>]... -o <output-directory> [-c <config-file>]')

             .demandCommand(1, 'Not enough argument: must provide at least one svg file.')
             .wrap(null)

           configureWithSharedOptions(yargs);
           configureWithProcessOptions(yargs);
         })
         .command('html', 'Sophisticate the given SVGs and generate a HTML file based on the template.', function(yargs) {
           yargs
             .usage('usage: $0 html <svg> [<svg2>]... -o <output-directory> [-c <config-file>] [-t <template>]')

             .alias('t', 'template')
             .nargs('t', 1)
             .describe('t', 'HTML template to use.')

             .demandCommand(1, 'Not enough argument: must provide at least one svg file.')
             .wrap(null)

           configureWithSharedOptions(yargs);
           configureWithProcessOptions(yargs);
         })
         .command('match', 'Test the specified configuration file against the given SVG.', function(yargs) {
           yargs
             .usage('usage: $0 match <svg> -c <config-file>')

             .demandCommand(1, 'Not enough argument: must provide at least one svg file.')
             .wrap(null)

           configureWithSharedOptions(yargs);
           yargs.demandOption('c', 'Configuration file is required');
         })
         .wrap(null)
         .argv;

  defineDefaults(argv)

  return argv;
}

/**
 * defineDefaults - set default values for each optional arguments
 *
 * @param  {Object} argv YARGS output
 * @return {Object}      updated YARGS output
 */
function defineDefaults(argv) {
  if (argv.o === undefined) {
    argv.o = process.cwd();
  }

  if (argv.c === undefined) {
    const sophisticateFile = `${process.cwd()}/.sophisticate.yml`

    if (FS.existsSync(sophisticateFile)) {
      argv.c = sophisticateFile;
    } else {
      console.log(`[${Chalk.yellow("WARN")}] no config specified (either from -c or via .sophisticate.yml)`);
    }
  }

  if (argv.t === undefined) {
    argv.t = `${configDirectory}/default-template.ejs`;
  }

  return argv;
}

/**
 * configureWithProcessOptions - configure options which are shared between 'process' commands.
 *
 * @param  {Object} argv YARGS builder
 * @return {Object}      updated YARGS builder
 */
function configureWithProcessOptions(yargs) {
  yargs.alias('o', 'output-directory')
       .nargs('o', 1)
       .describe('o', 'Directory to which output the processed SVGs')

       .demandOption('o', 'Output directory is required.');

  return yargs;
}

/**
 * configureWithSharedOptions - configure options which are shared between commands.
 *
 * @param  {Object} argv YARGS builder
 * @return {Object}      updated YARGS builder
 */
function configureWithSharedOptions(yargs) {
  yargs.alias('c', 'config-file')
       .nargs('c', 1)
       .describe('c', 'Configuration file with sophistication rules.')

  return yargs;
}
