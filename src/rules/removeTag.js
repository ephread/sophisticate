/**
 * @fileoverview Remove a tag
 * @author Frédéric Maquin
 */

//------------------------------------------------------------------------------
// Public
//------------------------------------------------------------------------------

/**
 * removeTag - Remove a tag specified by the given nodes.
 *
 * @param {object} rule  rule definition
 * @param {object} nodes nodes to remove
 */
export function removeTag(rule, nodes) {
  nodes.forEach( node => node.remove() )
}
