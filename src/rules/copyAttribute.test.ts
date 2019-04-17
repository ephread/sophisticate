/**
 * @fileoverview Test addAttribute.ts
 * @author Frédéric Maquin <fred@ephread.com>
 */

import { copyAttribute } from "./copyAttribute";

import * as LibXmlJs from "libxmljs";

describe("copyAttribute", () => {
  it("copies the value of an attribute into another attribute", () => {
    const document = new LibXmlJs.Document();
    const element = new LibXmlJs.Element(document, "dummy");
    element.attr({ "dummy-attribute-1": "dummy-value" });
    const configuration = {
      attributes: [
        { "dummy-attribute-1": "dummy-attribute-2" },
      ],
      type: "copyAttribute",
    };

    copyAttribute(configuration, [element]);

    const originalAttributes = element.attrs().filter((attribute) => {
      return attribute.name() === "dummy-attribute-1" && attribute.value() === "dummy-value";
    });

    const copiedAttributes = element.attrs().filter((attribute) => {
      return attribute.name() === "dummy-attribute-2" && attribute.value() === "dummy-value";
    });

    expect(originalAttributes.length).toBe(1);
    expect(copiedAttributes.length).toBe(1);
  });

  it("copies over the value of pre-existing attribute", () => {
    const document = new LibXmlJs.Document();
    const element = new LibXmlJs.Element(document, "dummy");
    element.attr({ "dummy-attribute-1": "dummy-value" });
    element.attr({ "dummy-attribute-2": "dummy-value-2" });
    const configuration = {
      attributes: [
        { "dummy-attribute-1": "dummy-attribute-2" },
      ],
      type: "copyAttribute",
    };

    copyAttribute(configuration, [element]);

    const originalAttributes = element.attrs().filter((attribute) => {
      return attribute.name() === "dummy-attribute-2" && attribute.value() === "dummy-value-2";
    });

    const copiedAttributes = element.attrs().filter((attribute) => {
      return attribute.name() === "dummy-attribute-2" && attribute.value() === "dummy-value";
    });

    expect(originalAttributes.length).toBe(0);
    expect(copiedAttributes.length).toBe(1);
  });
});
