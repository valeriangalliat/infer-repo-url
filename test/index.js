const { strictEqual, deepStrictEqual } = require('assert')
const path = require('path')
const hostedGitInfo = require('hosted-git-info')
const inferRepoUrl = require('..')

async function main () {
  strictEqual(await inferRepoUrl(), 'https://github.com/valeriangalliat/infer-repo-url')
  strictEqual(await inferRepoUrl.fromPackage(), 'https://github.com/valeriangalliat/infer-repo-url')
  strictEqual(await inferRepoUrl.fromGit(), 'https://github.com/valeriangalliat/infer-repo-url')

  strictEqual(await inferRepoUrl(path.join(__dirname, '..')), 'https://github.com/valeriangalliat/infer-repo-url')
  strictEqual(await inferRepoUrl.fromPackage(path.join(__dirname, '..')), 'https://github.com/valeriangalliat/infer-repo-url')
  strictEqual(await inferRepoUrl.fromGit(path.join(__dirname, '..')), 'https://github.com/valeriangalliat/infer-repo-url')

  strictEqual(await inferRepoUrl(path.resolve(__dirname, 'only-package')), 'https://github.com/foo/bar')
  strictEqual(await inferRepoUrl.fromGit(path.resolve(__dirname, 'only-package')), undefined)

  strictEqual(await inferRepoUrl(path.resolve(__dirname, 'only-git')), 'https://github.com/bar/baz')
  strictEqual(await inferRepoUrl.fromPackage(path.resolve(__dirname, 'only-git')), undefined)

  strictEqual(await inferRepoUrl(path.resolve(__dirname, 'both')), 'https://github.com/foo/bar')
  strictEqual(await inferRepoUrl.fromGit(path.resolve(__dirname, 'both')), 'https://github.com/bar/baz')

  deepStrictEqual(await inferRepoUrl.full(), hostedGitInfo.fromUrl('valeriangalliat/infer-repo-url'))
  deepStrictEqual(await inferRepoUrl.full.fromPackage(), hostedGitInfo.fromUrl('valeriangalliat/infer-repo-url'))
  deepStrictEqual(await inferRepoUrl.full.fromGit(path.resolve(__dirname, 'both')), hostedGitInfo.fromUrl('git@github.com:bar/baz'))
}

main()
