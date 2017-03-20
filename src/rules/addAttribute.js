/**
 * @fileoverview Add an attribute
 * @author Frédéric Maquin
 */

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

/**
 * addAttribute - Add an attribute specified by the given rule to the given nodes.
 *
 * @param {object} rule  rule definition
 * @param {object} nodes nodes on which remove attributes
 */
export function addAttribute(rule, nodes) {
  for (let attribute of rule.attributes) {
    let attributeName = Object.keys(attribute)[0];
    let value = attribute[attributeName];

    nodes.forEach( path => path.attr(attributeName, value) );
  }
}
