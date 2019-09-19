# growi-plugin-boilerplate

[![dependencies status](https://david-dm.org/weseek/growi-plugin-boilerplate.svg)](https://david-dm.org/weseek/growi-plugin-boilerplate)
[![devDependencies Status](https://david-dm.org/weseek/growi-plugin-boilerplate/dev-status.svg)](https://david-dm.org/weseek/growi-plugin-boilerplate?type=dev)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

Install
--------

1. install plugin

    ```bash
    yarn add growi-plugin-boilerplate
    ```

1. build client app (see official documents)


Usage
------

### `$foo` tag

A simple example to implement custom tag that parse `$foo()` syntax and render a [Foo React component](https://github.com/weseek/growi-plugin-boilerplate/blob/master/src/client/js/components/Foo.jsx).

#### Syntax

```
$foo(range=1:10)
```

#### Options

- **`range`** : Dummy option for parsing range type option
    - see https://docs.growi.org/api/commons/plugin/util/option-parser.html


### `$bar` tag

An example to implement custom tag that parse `$bar()` syntax and render a [Bar React component](https://github.com/weseek/growi-plugin-boilerplate/blob/master/src/client/js/components/Bar.jsx).  
The `Bar` component retrieves the username of the author of the current page.

#### Syntax

```
$bar()
```

#### Options

(nothing)

