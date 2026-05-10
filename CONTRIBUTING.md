# Contributing

Thank you for helping improve **micrographic-skill**. This document is the single source of truth for contributions.

## Language

All **documentation, comments, commit messages, and user-facing CLI output** in this repository must be **English**. That keeps the project accessible to contributors and users worldwide.

## Ways to contribute

- **Issues**: questions, bug reports, or feature ideas.
- **Pull requests**: changes to `SKILL.md`, `bin/install.mjs`, `README.md`, packaging, or assets.

## Before you open a pull request

1. **Fork** the repository and create a branch from `main` (for example `fix/install-dry-run`, `docs/clarify-tokens`).
2. Skill content lives in the root **`SKILL.md`** — the installer copies that file into each agent’s skills directory. Edit `SKILL.md` for design-system changes.
3. Test the installer from your clone (use a throwaway folder if you do not want to touch a real project):

   ```bash
   node bin/install.mjs --dry-run
   node bin/install.mjs --cursor
   ```

4. Prefer **one focused change per PR** when possible.
5. **Accessibility**: dense UIs need care — follow the Accessibility section in `SKILL.md` (contrast, `aria-hidden` on decorative elements, minimum interactive targets).

## Pull request checklist

- [ ] New or changed user-facing text is in **English**.
- [ ] Root `SKILL.md` updated when design rules change.
- [ ] `node bin/install.mjs --dry-run` runs without errors.
- [ ] No secrets, credentials, or machine-specific paths committed.

## `main` branch protection (maintainers)

`main` should be **protected** on GitHub so day-to-day work goes through **pull requests** instead of direct pushes.

### Enable protection (classic branch rules)

1. GitHub: **Settings** → **Branches** → **Add branch protection rule**.
2. **Branch name pattern:** `main`.
3. Recommended options:
   - **Require a pull request before merging** (optionally require approvals).
   - **Do not allow bypassing the above settings** for everyone who should follow the same process (optional: allow admins to bypass for emergencies only).
4. When CI exists: **Require status checks to pass before merging**.
5. Optional: **Require linear history** if you prefer a rebase-only flow.

### Rulesets (newer UI)

Alternatively: **Settings** → **Rules** → **Rulesets** → create a ruleset targeting branch `main` with the same intent (pull requests required, optional checks).

Contributors push branches on their forks and open PRs into this upstream repository.

## License

By contributing, you agree your contributions are licensed under the **same terms as the project** — see [LICENSE](./LICENSE) (MIT).
