/**
 * @fileoverview TypeScript Types
 * @author Frédéric Maquin <fred@ephread.com>
 */

// ----------------------------------------------------------------------------
// Rules Types
// ----------------------------------------------------------------------------

export interface IConfigurationElement {
  xpath: string;
  rules: IConfigurationRule[];
}

export interface IConfigurationRule {
  type: string;
}

export interface IConfigurationAddAttributeRule extends IConfigurationRule {
  append?: boolean;
  attributes: IConfigurationAttribute[];
}

export interface IConfigurationCopyRenameAttributeRule extends IConfigurationRule {
  attributes: IConfigurationAttribute[];
}

export interface IConfigurationRemoveAttributeRule extends IConfigurationRule {
  attributes: string[];
}

export interface IConfigurationAttribute {
  [attribute: string]: string;
}

export type IConfigurationCopyAttributeRule = IConfigurationCopyRenameAttributeRule;
export type IConfigurationRenameAttributeRule = IConfigurationCopyRenameAttributeRule;
export type IConfigurationRemoveTagRule = IConfigurationRule;
