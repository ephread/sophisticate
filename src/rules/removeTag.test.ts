/**
 * @fileoverview Test addAttribute.ts
 * @author Frédéric Maquin <fred@ephread.com>
 */

import { removeTag } from "./removeTag";

import * as LibXmlJs from "libxmljs";

describe("removeTag", () => {
  it("removes an attribute", () => {
    const document = new LibXmlJs.Document();
    const root = new LibXmlJs.Element(document, "root");
    document.root(root);

    const element = new LibXmlJs.Element(document, "dummy");
    root.addChild(element);

    expect(document.root()).not.toBeNull();
    expect(document.root()!.childNodes().length).toBe(1);

    const configuration = {
      type: "removeTag",
    };

    removeTag(configuration, [element]);

    expect(document.root()!.childNodes().length).toBe(0);
  });
});
