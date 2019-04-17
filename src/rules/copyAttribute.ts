/**
 * @fileoverview Copy an attribute
 * @author Frédéric Maquin <fred@ephread.com>
 */

import { IConfigurationCopyAttributeRule } from "./types";

import Chalk from "chalk";
import * as LibXmlJs from "libxmljs";

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

/**
 * copyAttribute - Copy the value of an attribute to a new attribute, specified by the
 *                 given rule to the given nodes.
 *
 * @param {object} rule  rule definition
 * @param {object} nodes nodes on which copy the attribute
 */
export function copyAttribute(
  configurationRule: IConfigurationRule,
  nodes: LibXmlJs.Element[],
) {
  const rule = configurationRule as IConfigurationCopyAttributeRule;
  for (const attribute of rule.attributes) {
    const oldAttributeName = Object.keys(attribute)[0];
    const newAttributeName = attribute[oldAttributeName];

    nodes.forEach((node) => {
      const attr = node.attr(oldAttributeName);
      if (!attr) {
        console.log(
          `[${Chalk.yellow(
            "WARNING",
          )}] ${oldAttributeName} was not found, ignoring…`,
        );
        return;
      }

      const value = attr.value();
      node.attr({ newAttributeName, value });
    });
  }
}
