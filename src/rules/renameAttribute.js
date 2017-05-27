/**
 * @fileoverview Rename an attribute
 * @author Frédéric Maquin <fred@ephread.com>
 */

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

/**
 * renameAttribute - Rename an attribute name specified by the given rule to the given nodes.
 *
 * @param {object} rule  rule definition
 * @param {object} nodes nodes on which remove attributes
 */
export function renameAttribute (rule, nodes) {
  for (let attribute of rule.attributes) {
    let oldAttributeName = Object.keys(attribute)[0];
    let newAttributeName = attribute[oldAttributeName];

    nodes.forEach(function (node) {
      node.attr(newAttributeName, node.attr(oldAttributeName).value());
      node.attr(oldAttributeName).remove();
    });
  }
}
