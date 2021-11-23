# safety-latch

The NPM ecosystem has a problem with hooks. More precisely their install hooks since they allow an installed dependency to execute any script it pleases. This is DANGEROUS!

So this tool takes inspiration from the NPM package `can-i-ignore-scripts` and tries to add a bit more tooling around it.

The idea is that you should do your `yarn install`/`npm install` using the `--ignore-scripts` flag, which will prevent these automatic hooks from running. But some packages do have a legitimate reason for using these, so therefore for some select packages, you want to enable it.
[Read more at naugtur's blog post](https://dev.to/naugtur/get-safe-and-remain-productive-with-can-i-ignore-scripts-2ddc)

This tool scans for any `package.json` which contains an install hook and request that you decide if they should run or not. If a package later introduces hooks, which haven't previously used hooks, the install will fail, allowing you to define if the package should be allowed to run hooks or not.

## Installation

`npm i -g safety-latch`

## Usage

First, you need to create a configuration using `safety-latch setup`. This will generate a `safety-latch.json` file that contains your selection. You use the same command later to change this selection and to allow/disallow new packages with install hooks.

Now you can use `safety-latch install` to run hooks on your selected packages.

So this should change your `yarn`/`npm` behavior

**Before**
```bash
yarn install # npm install
```

**After**
```bash
yarn install --ignore-scripts # npm install --ignore-scripts
safety-latch install # will rebuild the allowed packages and fail if a package with hooks aren't explicitly allowed or denied
```

This is a longer process, but well the same old story about security vs. convenience right?

## Development

The easiest way to develop on this is to do `npm link` so the `safety-latch` executable points to your dev clone, and then run `yarn dev` to build the tool on changes

## TODO

- [ ] Set up a source of package defaults like https://github.com/naugtur/can-i-ignore-scripts/blob/main/data.json to allow for easier screening of which packages to allow
- [ ] Testing
- [ ] Add a `postinstall` hook that fails if `testPostInstall` is `true`
- [ ] ?
