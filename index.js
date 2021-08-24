const path = require('path')
const fs = require('fs').promises
const hostedGitInfo = require('hosted-git-info')
const parseGitConfig = require('parse-git-config')

async function fromPackage (cwd = process.cwd()) {
  const pkg = await fs.readFile(path.resolve(cwd, 'package.json'), 'utf8')
    .then(body => JSON.parse(body))
    .catch(() => ({}))

  if (!pkg.repository) {
    return
  }

  return hostedGitInfo.fromUrl(pkg.repository.url || pkg.repository)
}

async function fromGit (cwd = process.cwd()) {
  const config = await parseGitConfig({ cwd, path: '.git/config' })
    .catch(() => ({}))

  const url = config['remote "origin"'] && config['remote "origin"'].url

  if (!url) {
    return
  }

  return hostedGitInfo.fromUrl(url)
}

async function full (cwd) {
  return await fromPackage(cwd) || await fromGit(cwd)
}

full.fromPackage = fromPackage
full.fromGit = fromGit

function wrapBrowse (f) {
  return cwd => {
    return f(cwd).then(info => info && info.browse())
  }
}

const inferRepoUrl = wrapBrowse(full)

inferRepoUrl.fromPackage = wrapBrowse(fromPackage)
inferRepoUrl.fromGit = wrapBrowse(fromGit)
inferRepoUrl.full = full

module.exports = inferRepoUrl
