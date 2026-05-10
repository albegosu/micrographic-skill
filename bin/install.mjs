#!/usr/bin/env node
import { existsSync, mkdirSync, copyFileSync, readFileSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = resolve(__dirname, '..')
const SKILL_SRC = join(ROOT, 'SKILL.md')
const PKG = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const CWD = process.cwd()

// ANSI colors
const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  green:  '\x1b[32m',
  blue:   '\x1b[34m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  gray:   '\x1b[90m',
}

const log  = (msg) => console.log(msg)
const ok   = (msg) => console.log(`  ${c.green}✔${c.reset}  ${msg}`)
const info = (msg) => console.log(`  ${c.blue}·${c.reset}  ${msg}`)
const warn = (msg) => console.log(`  ${c.yellow}!${c.reset}  ${msg}`)
const skip = (msg) => console.log(`  ${c.gray}–${c.reset}  ${c.gray}${msg}${c.reset}`)

// Targets: { label, dir, filename }
const TARGETS = [
  {
    id:       'cursor-skills',
    label:    'Cursor  (.cursor/skills/micrographic/)',
    dir:      join(CWD, '.cursor', 'skills', 'micrographic'),
    filename: 'SKILL.md',
    detect:   () => existsSync(join(CWD, '.cursor')),
  },
  {
    id:       'cursor-rules',
    label:    'Cursor  (.cursor/rules/)  — always-on rule',
    dir:      join(CWD, '.cursor', 'rules'),
    filename: 'micrographic.mdc',
    detect:   () => false,           // opt-in only
    optional: true,
  },
  {
    id:       'claude-code',
    label:    'Claude Code  (.claude/skills/micrographic/)',
    dir:      join(CWD, '.claude', 'skills', 'micrographic'),
    filename: 'SKILL.md',
    detect:   () => existsSync(join(CWD, '.claude')),
  },
  {
    id:       'codex',
    label:    'Codex  (.codex/skills/micrographic/)',
    dir:      join(CWD, '.codex', 'skills', 'micrographic'),
    filename: 'SKILL.md',
    detect:   () => existsSync(join(CWD, '.codex')),
  },
  {
    id:       'windsurf',
    label:    'Windsurf  (.windsurf/skills/micrographic/)',
    dir:      join(CWD, '.windsurf', 'skills', 'micrographic'),
    filename: 'SKILL.md',
    detect:   () => existsSync(join(CWD, '.windsurf')),
  },
]

function installTo(target) {
  mkdirSync(target.dir, { recursive: true })
  copyFileSync(SKILL_SRC, join(target.dir, target.filename))
  ok(target.label)
}

function parseFlags() {
  const args = process.argv.slice(2)
  return {
    all:      args.includes('--all'),
    cursor:   args.includes('--cursor'),
    claude:   args.includes('--claude'),
    rules:    args.includes('--rules'),
    dryRun:   args.includes('--dry-run'),
    help:     args.includes('--help') || args.includes('-h'),
  }
}

function printHelp() {
  log(`
${c.bold}micrographic-skill${c.reset}  —  Micrographic UI design skill installer
${c.dim}─────────────────────────────────────────────────────${c.reset}

  ${c.bold}Usage${c.reset}
    npx micrographic-skill           Auto-detect agents in current project
    npx micrographic-skill --all     Install for all supported agents
    npx micrographic-skill --cursor  Install for Cursor only
    npx micrographic-skill --claude  Install for Claude Code only
    npx micrographic-skill --rules   Also install as a Cursor always-on rule
    npx micrographic-skill --dry-run Show what would be installed

  ${c.bold}Supported agents${c.reset}
    Cursor · Claude Code · Codex · Windsurf

  ${c.bold}After installing${c.reset}
    Ask your agent to build a "micrographic" UI, or mention
    "spec sheet", "industrial aesthetic", "dense information design".
    The skill triggers automatically when relevant.
`)
}

async function main() {
  const flags = parseFlags()

  if (flags.help) { printHelp(); process.exit(0) }

  log(`\n${c.bold}  micrographic-skill${c.reset}  ${c.dim}v${PKG.version}${c.reset}`)
  log(`  ${c.dim}Micrographic UI design system for AI coding agents${c.reset}\n`)

  // Build install list
  let toInstall = []

  if (flags.all) {
    toInstall = TARGETS.filter(t => t.id !== 'cursor-rules')
  } else if (flags.cursor) {
    toInstall = TARGETS.filter(t => t.id === 'cursor-skills')
  } else if (flags.claude) {
    toInstall = TARGETS.filter(t => t.id === 'claude-code')
  } else {
    // Auto-detect
    toInstall = TARGETS.filter(t => !t.optional && t.detect())
    if (toInstall.length === 0) {
      // No agents detected — install cursor-skills as sensible default
      warn('No agent directories detected in current folder.')
      info('Installing to .cursor/skills/ by default.\n')
      toInstall = [TARGETS.find(t => t.id === 'cursor-skills')]
    }
  }

  // Optionally add cursor rules
  if (flags.rules) {
    toInstall.push(TARGETS.find(t => t.id === 'cursor-rules'))
  }

  if (flags.dryRun) {
    log(`  ${c.cyan}Dry run — nothing will be written:${c.reset}\n`)
    toInstall.forEach(t => info(`Would install → ${join(t.dir, t.filename)}`))
    log('')
    process.exit(0)
  }

  log(`  Installing skill...\n`)
  toInstall.forEach(installTo)

  log(`\n  ${c.bold}Done.${c.reset} Activate with any of these prompts:\n`)
  log(`  ${c.dim}"build me a micrographic product card"${c.reset}`)
  log(`  ${c.dim}"use the micrographic skill for this dashboard"${c.reset}`)
  log(`  ${c.dim}"spec sheet style, industrial, dense information UI"${c.reset}`)
  log('')
}

main().catch(err => {
  console.error('\n  Error:', err.message)
  process.exit(1)
})
