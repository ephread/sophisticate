/**
 * @fileoverview Delete an attribute
 * @author Frédéric Maquin <fred@ephread.com>
 */

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

/**
 * deleteAttribute - Delete an attribute specified by the given rule to the given nodes.
 *
 * @param {object} rule  rule definition
 * @param {object} nodes nodes on which remove attributes
 */
export function deleteAttribute (rule, nodes) {
  for (let attributeName of rule.attributes) {
    nodes.forEach(function (node) {
      let attribute = node.attr(attributeName);

      if (attribute) {
        attribute.remove();
      }
    });
  }
}
