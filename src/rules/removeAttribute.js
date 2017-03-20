/**
 * @fileoverview Remove an attribute
 * @author Frédéric Maquin
 */

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

/**
 * removeAttribute - Remove an attribute specified by the given rule to the given nodes.
 *
 * @param {object} rule  rule definition
 * @param {object} nodes nodes on which remove attributes
 */
export function removeAttribute(rule, nodes) {
  for (let attributeName of rule.attributes) {
    nodes.forEach( function(node) {
      let attribute = node.attr(attributeName);

      if (attribute) {
        attribute.remove();
      }
    });
  }
}
