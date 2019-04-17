/**
 * @fileoverview Remove a tag
 * @author Frédéric Maquin <fred@ephread.com>
 */

import { IConfigurationRemoveTagRule } from "./types";

import * as LibXmlJs from "libxmljs";

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

/**
 * removeTag - Remove a tag specified by the given nodes.
 *
 * @param {object} rule  rule definition
 * @param {object} nodes nodes to remove
 */
export function removeTag(
  rule: IConfigurationRule,
  nodes: LibXmlJs.Element[],
) {
  nodes.forEach((node) => node.remove());
}
