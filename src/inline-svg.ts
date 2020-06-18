/**
 * @fileoverview Perform SVG sophistication
 * @author Frédéric Maquin <fred@ephread.com>
 */

// ----------------------------------------------------------------------------
// Requirements
// ----------------------------------------------------------------------------

import * as Chalk from "chalk";
import * as FS from "fs";
import * as Yaml from "js-yaml";
import * as LibXmlJs from "libxmljs";
import * as SVGO from "svgo";

import { Rules } from "./rules/all-rules";

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
 */
export function processSVG(svgPath: string, configPath: string) {
  return new Promise<string>((resolve) => {
    FS.readFile(svgPath, "utf-8", (err, data) => {
      if (err) {
        console.log(`[${Chalk.red("ERROR")}] Couldn't read SVG file - ${err.message}`);
        // reject()
        process.exit(1);
      }

      resolve(data);
    });
  }).then((result) => {
    const config = loadConfig(configPath);
    const xml = LibXmlJs.parseXml(result);
    const svgo = new SVGO(config.svgo);

    for (const transformation of config.sophisticate) {
      for (const rule of transformation.rules) {
        applyTransform(xml, transformation.xpath, rule);
      }
    }

    return svgo.optimize(xml.toString(false));
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
function applyTransform(
  xml: LibXmlJs.Document,
  xpath: string,
  rule: IConfigurationRule,
) {
  const namespace = "http://www.w3.org/2000/svg";
  const nodes = xml.root()!.find(xpath, namespace) as LibXmlJs.Element[]; // TODO: Handle null

  if (rule.type in Rules) {
    const ruleFunction = Rules[rule.type];
    ruleFunction(rule, nodes);
  } else {
    console.log(`[${Chalk.red("ERROR")}] Rule '${rule.type}' doesn't exist.`);
    process.exit(1);
  }
}

/**
 * loadConfig - load the configuration file
 *
 * @param  {string} configPath the path to the configuration file
 * @return {object}            the loaded configuration
 */
function loadConfig(configPath: string) {
  try {
    let config;

    if (configPath !== undefined) {
      config = Yaml.safeLoad(FS.readFileSync(configPath, "utf8"));
    } else {
      config = { sophisticate: [] };
    }

    if (config.svgo === undefined) {
      config.svgo = Yaml.safeLoad(FS.readFileSync(`${__dirname}/../../config/svgo.yml`, "utf8"));
    }

    return config;
  } catch (err) {
    console.log(`[${Chalk.red("ERROR")}] Couldn't load config file - ${err.message}`);
    process.exit(1);
  }
}
