/**
 * @fileoverview Copy an attribute
 * @author Frédéric Maquin <fred@ephread.com>
 */

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
export function copyAttribute (rule, nodes) {
  for (let attribute of rule.attributes) {
    let oldAttributeName = Object.keys(attribute)[0];
    let newAttributeName = attribute[oldAttributeName];

    nodes.forEach(function (node) {
      node.attr(newAttributeName, node.attr(oldAttributeName).value());
    });
  }
}
