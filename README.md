# stash-plugin-builder

Build `stash` plugins with React, SCSS and other libraries with TS support.

</br>

## Usage

You can also use **yarn**

### 1. Generate boilerplate using [create-stash-plugin](https://github.com/Tetrax-10/create-stash-plugin)

**npm**

```sh
npx create-stash-plugin
```

**yarn**

```sh
yarn create stash-plugin
```

</br>

### 2. Build plugin

`cd` to the generated plugin folder and run

```sh
npm run build
```

_The plugin will be built in your `stash plugins folder`. Reload `stash`, and the plugin should be listed in the `Plugins tab`. If not, try clicking `Reload plugins` button and reload again._

</br>

### 3. Watch plugin

Run this npm command and reload `stash` just once to connect `stash-plugin-builder` and `stash`

```sh
npm run watch
```

_Just saving the source code file will auto build and reload stash._

</br>

### 4. Build plugin for distribution

```sh
npm run build-dist
```

_This will build the plugin and output the distributable plugin to the `dist` folder. You can change this folder in `package.json`._

</br>

## settings.yml structure

The `npx create-stash-plugin` command should generate a basic `settings.yml`. However, if you wish to configure advanced settings, please adhere to this structure. The `settings.yml` follows the same format as the [official plugin yml](https://docs.stashapp.cc/in-app-manual/plugins/#plugin-configuration-file-format) format, except few changes. See the example below:

```yml
id: MyPlugin
name: My Plugin
description: My plugin does awesome things
version: "1.0" # should be a string
stashPluginSubDir: my-plugins-dev
ui:
    javascript: ./src/index.js # main js file
    css: ./styles/main.css # main css file
    include: # external js and css files that aren't part of main ui files
        - ./lib/colors.js
        - ./scripts/injectRemoteCode.js
    requires:
        - id: MyUtilsLibrary # local plugin id
        - id: MyReactComponentsLibrary # local plugin id
        - id: StashUserscriptLibrary # cross-source plugin id
          source: https://stashapp.github.io/CommunityScripts/stable/index.yml # cross-source plugin source url
    assets: # optional list of assets
        urlPrefix: fsLocation
    csp: # content-security policy overrides
        script-src:
            - http://alloweddomain.com
        style-src:
            - http://alloweddomain.com
        connect-src:
            - http://alloweddomain.com
# the following are used for plugin tasks only
exec:
    - python
    - "{pluginDir}/foo.py" # values with variable should be wrapped with double quotes
interface: raw
errLog: error
tasks:
    - name: <operation name>
      description: <optional description>
      execArgs:
          - <arg to add to the exec line>
```

</br>

## External files

To include external files such as `.py`, you can place them inside the **`_include`** folder. The `stash-plugin-builder` will automatically copy the contents of that folder whenever it builds the plugin.

```lua
root/
├── .env
├── .gitignore
├── _include/
│   ├── foo.py
│   └── config.json
├── package.json
├── settings.yml
└── src/
```

_Note: `watch` command doesn't watch for external files._

</br>

## Cli Docs

<table>
  <tr align="center">
    <td><b>Args</b></td>
    <td><b>Full args</b></td>
    <td><b>Description</b></td>
    <td><b>Default</b></td>
  </tr>
  <tr align="center">
    <td>-m</td>
    <td>--minify</td>
    <td align="left">minifies the code</td>
    <td align="left">present or not</td>
  </tr>
  <tr align="center">
    <td>-w</td>
    <td>--watch</td>
    <td align="left">watches for code change</td>
    <td align="left">present or not</td>
  </tr>
  <tr align="center">
    <td>-o</td>
    <td>--out</td>
    <td align="left">output folder</td>
    <td align="left">your stash plugins folder</td>
  </tr>
  <tr align="center">
    <td>-j</td>
    <td>--js</td>
    <td align="left">main JS file path</td>
    <td align="left">main JS file path from settings.yml</td>
  </tr>
  <tr align="center">
    <td>-c</td>
    <td>--css</td>
    <td align="left">main CSS file path</td>
    <td align="left">main CSS file path from settings.yml</td>
  </tr>
</table>
