# infer-repo-url [![npm version](http://img.shields.io/npm/v/infer-repo-url.svg?style=flat-square)](https://www.npmjs.org/package/infer-repo-url)

> Infer repo URL from `package.json` or `.git/config`.

## Overview

From the <abbr title="Current working directory">CWD</abbr> or the given
path, try to infer the repo URL from the `repository` field of
`package.json`, otherwise fall back to the `origin` remote in
`.git/config`.

You can chose to only use the `package.json` or `.git/config` logic, and
you can get the full [hosted-git-info](https://www.npmjs.com/package/hosted-git-info)
object if you want to instead of the browse URL that's returned by
default.

## Installation

```sh
npm install infer-repo-url
```

## Usage

```js
const inferRepoUrl = require('infer-repo-url')

async function main () {
  const url = await inferRepoUrl() // Read `repository` from `package.json`, fall back to `origin` remote in `.git/config`
  const url = await inferRepoUrl.fromPackage() // Only read from `package.json`
  const url = await inferRepoUrl.fromGit() // Only read from `.git/config`

  // Same with `/path/to/repo/package.json` and `/path/to/repo/.git/config`
  const url = await inferRepoUrl('/path/to/repo')
  const url = await inferRepoUrl.fromPackage('/path/to/repo')
  const url = await inferRepoUrl.fromGit('/path/to/repo')

  // Get the full hosted-git-info object.
  const info = await inferRepoUrl.full()
  const info = await inferRepoUrl.full.fromPackage()
  const info = await inferRepoUrl.full.fromGit('/path/to/repo')
}

main()
```
