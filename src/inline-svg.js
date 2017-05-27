/**
 * @fileoverview Perform SVG sophistication
 * @author Frédéric Maquin <fred@ephread.com>
 */

// ----------------------------------------------------------------------------
// Requirements
// ----------------------------------------------------------------------------

import FS from 'fs';
import LibXmlJs from 'libxmljs';
import SVGO from 'svgo';
import Yaml from 'js-yaml';
import Chalk from 'chalk';

import * as Rules from './rules/all-rules';

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

/**
 * Callback used to retrieve the sophisticated SVG.
 *
 * @callback processCallback
 * @param {object} result result of the sophistication (SVG)
 */

/**
 * processSVG - Sophisticate the given SVG using the given configuration.
 *
 * @param  {string}          svgPath    path the svg file.
 * @param  {string}          configPath path to the configuration file.
 * @param  {processCallback} callback   handles the completion of the process.
 */
export function processSVG (svgPath, configPath, callback) {
  FS.readFile(svgPath, 'utf-8', function (err, data) {
    if (err) {
      console.log(`[${Chalk.red('ERROR')}] Couldn't read SVG file - ${err.message}`);
      process.exit(1);
    }

    const config = loadConfig(configPath);
    const xml = LibXmlJs.parseXml(data);
    const svgo = new SVGO(config.svgo);

    for (let transformation of config.sophisticate) {
      for (let rule of transformation.rules) {
        applyTransform(xml, transformation.xpath, rule);
      }
    }

    svgo.optimize(xml.toString(false), callback);
  });
}

// ----------------------------------------------------------------------------
// Private
// ----------------------------------------------------------------------------

/**
 * applyTransform - apply the given tranformation rule on nodes matching the given xpath query.
 *
 * @param  {object} xml   the xml document on which apply the transformation
 * @param  {string} xpath the xpath query selecting the nodes to transform
 * @param  {object} rule  the transformation rule
 */
function applyTransform (xml, xpath, rule) {
  const namespace = 'http://www.w3.org/2000/svg';
  const nodes = xml.find(xpath, namespace);

  if (rule.type in Rules) {
    Rules[rule.type](rule, nodes);
  } else {
    console.log(`[${Chalk.red('ERROR')}] Rule '${rule.type}' doesn't exist.`);
    process.exit(1);
  }
}

/**
 * loadConfig - load the configuration file
 *
 * @param  {string} configPath the path to the configuration file
 * @return {object}            the loaded configuration
 */
function loadConfig (configPath) {
  try {
    var config;

    if (configPath !== undefined) {
      config = Yaml.safeLoad(FS.readFileSync(configPath, 'utf8'));
    } else {
      config = { sophisticate: [] };
    }

    if (config.svgo === undefined) {
      config.svgo = Yaml.safeLoad(FS.readFileSync(`${__dirname}/../../config/svgo.yml`, 'utf8'));
    }

    return config;
  } catch (err) {
    console.log(`[${Chalk.red('ERROR')}] Couldn't load config file - ${err.message}`);
    process.exit(1);
  }
}
