/**
 * @fileoverview TypeScript Types
 * @author Frédéric Maquin <fred@ephread.com>
 */

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

interface IConfigurationElement {
  xpath: string;
  rules: IConfigurationRule[];
}

interface IConfigurationRule {
  type: string;
}

interface IConfigurationAddAttributeRule extends IConfigurationRule {
  append?: boolean;
  attributes: IConfigurationAttribute[];
}

interface IConfigurationCopyRenameAttributeRule extends IConfigurationRule {
  attributes: IConfigurationAttribute[];
}

interface IConfigurationRemoveAttributeRule extends IConfigurationRule {
  attributes: string[];
}

interface IConfigurationAttribute {
  [attribute: string]: string;
}

type IConfigurationCopyAttributeRule = IConfigurationCopyRenameAttributeRule;
type IConfigurationRenameAttributeRule = IConfigurationCopyRenameAttributeRule;
type IConfigurationRemoveTagRule = IConfigurationRule;
