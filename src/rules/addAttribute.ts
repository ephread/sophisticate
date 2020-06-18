/**
 * @fileoverview Add an attribute
 * @author Frédéric Maquin <fred@ephread.com>
 */

import { IConfigurationAddAttributeRule } from "./types";

import * as LibXmlJs from "libxmljs";

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

/**
 * addAttribute - Add an attribute specified by the given rule to the given nodes.
 *
 * @param {object} rule  rule definition
 * @param {object} nodes nodes on which remove attributes
 */
export function addAttribute(
  configurationRule: IConfigurationRule,
  nodes: LibXmlJs.Element[],
): void {
    const rule = configurationRule as IConfigurationAddAttributeRule;
    for (const attribute of rule.attributes) {
      const attributeName = Object.keys(attribute)[0];
      const value = attribute[attributeName];

      if (rule.append) {
        nodes.forEach((path) => {
          const currentValue = path.attr(attributeName);
          let valueToSet = value;

          if (currentValue != null && currentValue.value() !== valueToSet) {
            valueToSet = `${currentValue.value()} ${valueToSet}`;
          }

          path.attr({ [attributeName]: valueToSet });
        });
      } else {
        nodes.forEach((path) => path.attr({ [attributeName]: value }));
      }
    }
  }
