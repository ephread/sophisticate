/**
 * @fileoverview Entry point of Sophisticate
 * @author Frédéric Maquin <fred@ephread.com>
 */

import { parseArgs } from '../cli-helpers';
import { sophisticateHTML } from '../html';
import { sophisticateSVG } from '../svg';
import { match } from '../match';

const argv = parseArgs();

if (argv._[0] === 'svg') {
  argv._.shift();
  sophisticateSVG(argv);
} else if (argv._[0] === 'html') {
  argv._.shift();
  sophisticateHTML(argv);
} else if (argv._[0] === 'match') {
  argv._.shift();
  match(argv);
} else {
  console.log(`Unknown command '${argv._[0]}'.`);
}
