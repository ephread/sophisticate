/**
 * @fileoverview Replace an attribute
 * @author Frédéric Maquin
 */

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

/**
 * replace - Replace a attribute name specified by the given rule to the given nodes.
 *
 * @param {object} rule  rule definition
 * @param {object} nodes nodes on which remove attributes
 */
export function replace(rule, nodes) {
  for (let attribute of rule.attributes) {
    let oldAttributeName = Object.keys(attribute)[0];
    let newAttributeName = attribute[oldAttributeName];

    nodes.forEach(function(node) {
      node.attr(newAttributeName, node.attr(oldAttributeName).value());
      node.attr(oldAttributeName).remove();
    })
  }
}
