/**
 * @fileoverview Test addAttribute.ts
 * @author Frédéric Maquin <fred@ephread.com>
 */

import { addAttribute } from "./addAttribute";

import * as LibXmlJs from "libxmljs";

describe("addAttribute", () => {
  it("adds an attribute to the given element", () => {
    const document = new LibXmlJs.Document();
    const element = new LibXmlJs.Element(document, "dummy");
    const configuration = {
      attributes: [
        { "dummy-attribute": "dummy-value" },
      ],
      type: "addAttribute",
    };

    addAttribute(configuration, [element]);

    const attributes = element.attrs().filter((attribute) => {
      return attribute.name() === "dummy-attribute" && attribute.value() === "dummy-value";
    });

    expect(attributes.length).toBe(1);
  });

  it("appends an attribute to the given element", () => {
    const document = new LibXmlJs.Document();
    const element = new LibXmlJs.Element(document, "dummy");
    element.attr({ "dummy-attribute": "first-dummy-value" });
    const configuration = {
      append: true,
      attributes: [
        { "dummy-attribute": "dummy-value" },
      ],
      type: "addAttribute",
    };

    addAttribute(configuration, [element]);

    const attributes = element.attrs().filter((attribute) => {
      return attribute.name() === "dummy-attribute" && attribute.value() === "first-dummy-value dummy-value";
    });

    expect(attributes.length).toBe(1);
  });

  it("doesn't add the same attribute twice", () => {
    const document = new LibXmlJs.Document();
    const element = new LibXmlJs.Element(document, "dummy");
    element.attr({ "dummy-attribute": "dummy-value" });
    const configuration = {
      append: true,
      attributes: [
        { "dummy-attribute": "dummy-value" },
      ],
      type: "addAttribute",
    };

    addAttribute(configuration, [element]);

    const attributes = element.attrs().filter((attribute) => {
      return attribute.name() === "dummy-attribute" && attribute.value() === "dummy-value";
    });

    expect(attributes.length).toBe(1);
  });
});
