/**
 * @fileoverview Delete an attribute
 * @author Frédéric Maquin <fred@ephread.com>
 */

import { IConfigurationRemoveAttributeRule } from "./types";

import * as LibXmlJs from "libxmljs";

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

/**
 * deleteAttribute - Delete an attribute specified by the given rule to the given nodes.
 *
 * @param {object} rule  rule definition
 * @param {object} nodes nodes on which remove attributes
 */
export function removeAttribute(
  configurationRule: IConfigurationRule,
  nodes: LibXmlJs.Element[],
) {
  const rule = configurationRule as IConfigurationRemoveAttributeRule;
  for (const attributeName of rule.attributes) {
    nodes.forEach((node) => {
      const attribute = node.attr(attributeName);

      if (attribute) {
        attribute.remove();
      }
    });
  }
}
