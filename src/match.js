/**
 * @fileoverview Sophisticate the SVG files.
 * @author Frédéric Maquin <fred@ephread.com>
 */

// ----------------------------------------------------------------------------
// Requirements
// ----------------------------------------------------------------------------

import FS from 'fs';
import Chalk from 'chalk';
import Yaml from 'js-yaml';
import LibXmlJs from 'libxmljs';

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

/**
 * match - Show element matching XPath described in the configuration file.
 *
 * @param {type} argv parsed command line arguments.
 */
export function match (argv) {
  FS.readFile(argv._[0], 'utf-8', function (err, data) {
    if (err) {
      console.log(`[${Chalk.red('ERROR')}] Couldn't read SVG file - ${err.message}`);
      process.exit(1);
    }

    console.log(Chalk.bold('\nMatches for each XPath in the config file:\n'));

    const namespace = 'http://www.w3.org/2000/svg';
    const config = loadConfig(argv.c);
    const xml = LibXmlJs.parseXml(data);

    for (let transformation of config.sophisticate) {
      let xpath = transformation.xpath;

      let nodes = xml.find(xpath, namespace).map(function (element) {
        let substitute = element.clone();

        let pathAttribute = substitute.attr('d');
        let styleAttribute = substitute.attr('style');

        if (pathAttribute) { pathAttribute.remove(); }
        if (styleAttribute) { styleAttribute.remove(); }

        return `    [${Chalk.blue(`LINE ${substitute.line()}`)}] - ${substitute.toString()}`;
      });

      let section = `${Chalk.bold('[XPATH]')} ${Chalk.underline.green(xpath)} ${Chalk.bold('matches')}:`;

      console.log(`${section}\n${nodes.join('\n')}\n`);
    }
  });
}

/**
 * loadConfig - load the configuration file
 *
 * @param  {string} configPath the path to the configuration file
 * @return {object}            the loaded configuration
 */
function loadConfig (configPath) {
  try {
    return Yaml.safeLoad(FS.readFileSync(configPath, 'utf8'));
  } catch (err) {
    console.log(`[${Chalk.red('ERROR')}] Couldn't load config file - ${err.message}`);
    process.exit(1);
  }
}
