/**
 * @fileoverview Export all rules
 * @author Frédéric Maquin <fred@ephread.com>
 */

import * as LibXmlJs from "libxmljs";

// ----------------------------------------------------------------------------
// Public
// ----------------------------------------------------------------------------

import { addAttribute } from "./addAttribute";
import { copyAttribute } from "./copyAttribute";
import { removeAttribute } from "./removeAttribute";
import { removeTag } from "./removeTag";
import { renameAttribute } from "./renameAttribute";

export const Rules: IRuleSet = {
  addAttribute,
  copyAttribute,
  removeAttribute,
  removeTag,
  renameAttribute,
};

interface IRuleSet {
  [key: string]: ((rule: IConfigurationRule, nodes: LibXmlJs.Element[]) => void);
}
