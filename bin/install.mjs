#!/usr/bin/env node
import { existsSync, mkdirSync, copyFileSync, readFileSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = resolve(__dirname, '..')
const SKILL_SRC = join(ROOT, 'SKILL.md')
const RULES_SRC = join(ROOT, 'rules', 'micrographic.mdc')
const DESIGN_SRC = join(ROOT, 'DESIGN.md')
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

// Targets: { label, dir, filename, src? } — src defaults to SKILL.md
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
    src:      RULES_SRC,
    detect:   () => false,           // opt-in only
    optional: true,
  },
  {
    id:       'design-md',
    label:    'DESIGN.md  (./DESIGN.md)  — Google Labs DESIGN.md format',
    dir:      CWD,
    filename: 'DESIGN.md',
    src:      DESIGN_SRC,
    detect:   () => false,           // opt-in only
    optional: true,
    guard:    true,                  // project root: never overwrite a user's own file without --force
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
  {
    id:       'gemini',
    label:    'Gemini CLI  (.gemini/skills/micrographic/)',
    dir:      join(CWD, '.gemini', 'skills', 'micrographic'),
    filename: 'SKILL.md',
    detect:   () => existsSync(join(CWD, '.gemini')),
  },
]

function installTo(target, flags) {
  const src = target.src ?? SKILL_SRC
  const dest = join(target.dir, target.filename)
  if (target.guard && existsSync(dest) && !flags.force) {
    if (readFileSync(dest, 'utf8') === readFileSync(src, 'utf8')) {
      skip(`${target.label}  — already up to date`)
    } else {
      warn(`${target.label}  — exists with different content, left untouched (--force to overwrite)`)
    }
    return
  }
  mkdirSync(target.dir, { recursive: true })
  copyFileSync(src, dest)
  ok(target.label)
}

function parseFlags() {
  const args = process.argv.slice(2)
  return {
    all:      args.includes('--all'),
    cursor:   args.includes('--cursor'),
    claude:   args.includes('--claude'),
    rules:    args.includes('--rules'),
    designMd: args.includes('--design-md'),
    force:    args.includes('--force'),
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
    npx micrographic-skill --design-md
                                     Write DESIGN.md to the project root only
                                     (add --cursor / --claude / --all for both)
    npx micrographic-skill --force   Overwrite an existing ./DESIGN.md
    npx micrographic-skill --dry-run Show what would be installed

  ${c.bold}Supported agents${c.reset}
    Cursor · Claude Code · Codex · Windsurf · Gemini CLI
    Any DESIGN.md-aware tool (google-labs-code/design.md format)

  ${c.bold}After installing${c.reset}
    Ask your agent to build a "micrographic" UI, or mention
    "spec sheet", "industrial aesthetic", "dense information design".
    The skill triggers automatically when relevant.
`)
}

async function main() {
  const flags = parseFlags()

  if (flags.help) { printHelp(); process.exit(0) }

  if (!existsSync(SKILL_SRC)) {
    console.error('\n  Error: SKILL.md not found in package.\n')
    process.exit(1)
  }
  if (flags.rules && !existsSync(RULES_SRC)) {
    console.error('\n  Error: rules/micrographic.mdc not found in package.\n')
    process.exit(1)
  }
  if (flags.designMd && !existsSync(DESIGN_SRC)) {
    console.error('\n  Error: DESIGN.md not found in package.\n')
    process.exit(1)
  }

  log(`\n${c.bold}  micrographic-skill${c.reset}  ${c.dim}v${PKG.version}${c.reset}`)
  log(`  ${c.dim}Micrographic UI design system for AI coding agents${c.reset}\n`)

  // Build install list
  let toInstall = []

  if (flags.all) {
    toInstall = TARGETS.filter(t => !t.optional)
  } else if (flags.cursor) {
    toInstall = TARGETS.filter(t => t.id === 'cursor-skills')
  } else if (flags.claude) {
    toInstall = TARGETS.filter(t => t.id === 'claude-code')
  } else if (flags.designMd) {
    // --design-md alone: only the project-root DESIGN.md, no agent skill
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

  // Optionally add DESIGN.md at the project root
  if (flags.designMd) {
    toInstall.push(TARGETS.find(t => t.id === 'design-md'))
  }

  if (flags.dryRun) {
    log(`  ${c.cyan}Dry run — nothing will be written:${c.reset}\n`)
    toInstall.forEach(t => info(`Would install → ${join(t.dir, t.filename)}`))
    log('')
    process.exit(0)
  }

  const onlyDesignMd = toInstall.every(t => t.id === 'design-md')
  log(`  Installing ${onlyDesignMd ? 'DESIGN.md' : 'skill'}...\n`)
  toInstall.forEach(t => installTo(t, flags))

  if (flags.designMd) {
    log(`\n  ${c.bold}DESIGN.md${c.reset} ${c.dim}— tokens + rules any DESIGN.md-aware agent can read.${c.reset}`)
    log(`  ${c.dim}Validate: npx @google/design.md lint DESIGN.md${c.reset}`)
    log(`  ${c.dim}Export:   npx @google/design.md export --format css-tailwind DESIGN.md > theme.css${c.reset}`)
    if (onlyDesignMd) { log(''); return }
  }

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
