# ![Sophisticate](http://i.imgur.com/h5w9KDq.png)

Sophisticate the SVG outputs of vector graphic editors.

Outputs from vector graphic editor can be messy and require significant hand-made changes to become animatable and interactive.

Sophisticate automates these changes.

## Table of contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [Configuration file](#configuration-file)
    * [Sophistication rules](#sophistication-rules)
    * [SVGO](#svgo)
  * [License](#license)

## Getting started

### Install

Install the package from [npm].

```shell
$ npm install -g sophisticate
```

[npm]: https://npmjs.com/release

## Usage

The utility comes with three commands.

### `svg`

Use the rules defined in `<config-file>` to sophisticate `<svg>` and output the result in `<output-directory>`.

```shell
$ sophisticate svg -o <output-directory> [-c <config-file>] <svg>...
```

### `html`

Use the rules defined in `<config-file>` to sophisticate `<svg>` and output a generated HTML file based on `<template>` in `<output-directory>`. Optionally,
specifying the `-s` flag will process and merge together all specified `<svg>` according to `<template>`.

```shell
$ sophisticate html -o <output-directory> [-c <config-file>] \
                    [-t <template>] [-s [<base-name>]] <svg>...
```

### `match`

Test the configuration specified by `<config-file>` against the given `<svg>`.
This command is useful to debug XPath queries.

```shell
$ sophisticate match -c <config-file> <svg>
```

## Configuration File

### Sophistication rules

#### `addAttribute`

Add an attribute to the given nodes matching the specified XPath query.

For instance, the following rule will add the `class="outfit"` and `data-wool="super150s"` to all `<g id="tuxedo"></g>`.

```yaml
sophisticate:
  - xpath: "//xmlns:g[@id = 'tuxedo']"
    rules:
      - type: addAttribute
        append: true
        attributes:
          - class: outfit
          - "data-wool": super150s
```

The `append` parameter is optional; when set to true, the specified value of the attribute will be appended to previous ones, rather than replace them altogether.

For instance,

```xml
<g id="tuxedo" class="sophisticated"></g>
```

will become :

```xml
<g id="tuxedo"
   class="sophisticated outfit"
   data-wool="super150s"></g>
```

#### `removeAttribute`

Remove an attribute from the given nodes matching the specified XPath query.

For instance, the following rule will remove the `style` attribute from all `<g id="tuxedo"></g>`.

```yaml
- xpath: "//xmlns:*[@style]"
  rules:
    - type: removeAttribute
      attributes:
        - style
```

#### `renameAttribute`

Rename an attribute from the given nodes matching the specified XPath query.

For instance, the following rule will rename the `id` attribute to the `class` attribute, while keeping the value, for all `<g id="tuxedo"></g>`

```yaml
- xpath: "//xmlns:g[@id = 'tuxedo']"
  rules:
    - type: renameAttribute
      attributes:
        - id: class
```

The following tag,

```xml
<g id="tuxedo"></g>
```

will become :

```xml
<g class="tuxedo"></g>
```

#### `copyAttribute`

Copy an attribute from the given nodes matching the specified XPath query.

For instance, the following rule will copy the `id` attribute into the `class` attribute, for all `<g id="tuxedo"></g>`

```yaml
- xpath: "//xmlns:g[@id = 'tuxedo']"
  rules:
    - type: copyAttribute
      attributes:
        - id: class
```

The following tag,

```xml
<g id="tuxedo"></g>
```

will become :

```xml
<g id="tuxedo" class="tuxedo"></g>
```

#### `removeTag`

Remove all tags matching the specified XPath query.

For instance, the following rule will remove any tag having `class="patchedShirt"`.

```yaml
- xpath: "//xmlns:*[@class = 'patchedShirt']"
  rules:
    - type: removeAttribute
```

### SVGO

In addition to the transformations, sophisticate will run the output through SVGO.

You can configure the rules used by SVGO by adding them under the optional `svgo:` item in your configuration file. If `svgo:` is not specified, the [default configuration] will be used.

[default configuration]: https://github.com/ephread/Sophisticate/blob/master/config/svgo.yml

## License

Instructions is released under the MIT license. See LICENSE for details.
