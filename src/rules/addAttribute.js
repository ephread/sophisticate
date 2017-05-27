/**
 * @fileoverview Add an attribute
 * @author Frédéric Maquin <fred@ephread.com>
 */

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

/**
 * addAttribute - Add an attribute specified by the given rule to the given nodes.
 *
 * @param {object} rule  rule definition
 * @param {object} nodes nodes on which remove attributes
 */
export function addAttribute (rule, nodes) {
  for (let attribute of rule.attributes) {
    let attributeName = Object.keys(attribute)[0];
    let value = attribute[attributeName];

    if (rule.append) {
      nodes.forEach(path => {
        var currentValue = path.attr(attributeName);
        var valueToSet = value;

        if (currentValue != null) {
          valueToSet = `${currentValue.value()} ${valueToSet}`;
        }

        path.attr(attributeName, valueToSet);
      });
    } else {
      nodes.forEach(path => path.attr(attributeName, value));
    }
  }
}
