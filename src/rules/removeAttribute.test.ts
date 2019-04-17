/**
 * @fileoverview Test addAttribute.ts
 * @author Frédéric Maquin <fred@ephread.com>
 */

import { removeAttribute } from "./removeAttribute";

import * as LibXmlJs from "libxmljs";

describe("removeAttribute", () => {
  it("removes an attribute", () => {
    const document = new LibXmlJs.Document();
    const element = new LibXmlJs.Element(document, "dummy");
    element.attr({ "dummy-attribute": "dummy-value" });
    element.attr({ "dummy-attribute-2": "dummy-value" });
    const configuration = {
      attributes: [ "dummy-attribute", "dummy-attribute-2" ],
      type: "copyAttribute",
    };

    removeAttribute(configuration, [element]);

    const attributes = element.attrs().filter((attribute) => {
      return attribute.name() === "dummy-attribute";
    });

    const attributes2 = element.attrs().filter((attribute) => {
      return attribute.name() === "dummy-attribute-2";
    });

    expect(attributes.length).toBe(0);
    expect(attributes2.length).toBe(0);
  });
});
