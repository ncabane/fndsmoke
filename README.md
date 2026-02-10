# fndsmoke

Smoke tests for the Funda website — because we like to be safe and sound.

Hello, and thank you for taking the time to review my assignment. You're awesome! I hope you have fun with it, as I had fun working on it.
You are free to use any of the code on your current projects, should you find it useful.

---

## Table of contents

- [Quick start](#quick-start)
- [Tooling](#tooling)
- [Test approach](#test-approach)
- [Test list](#test-list)
- [Comments in the code](#comments-in-the-code)
- [Yes, AI was here](#yes-ai-was-here)
- [User agent](#user-agent)
- [Playwright config notes](#playwright-config-notes)
- [Project structure](#project-structure)

---

## Quick start

### Prerequisites

- **Node.js** (LTS recommended)
- **Yarn** — if you don't have it:
  ```bash
  npm install -g yarn
  ```
  Or use [corepack](https://nodejs.org/api/corepack.html) (Node 16.10+):
  ```bash
  corepack enable
  yarn --version
  ```

### 1. Clone the repo

```bash
git clone https://github.com/ncabane/fndsmoke.git
cd fndsmoke
```

### 2. Install dependencies and Playwright browsers

```bash
yarn install
yarn playwright install
```

This installs project dependencies and the Chromium browser used by the tests.

### 3. Configure the user agent (required)

Create a `.env` file in the project root with:

```
FUNDA_USER_AGENT=<value provided by Funda for this assignment>
```

Without this, tests may hit robot detection and fail. See [User Agent](#user-agent) below.

### 4. Run the tests

| Goal | Command |
|------|--------|
| **Run all tests (headless)** | `yarn test` or `yarn playwright test` |
| **Run all tests with browser visible** | `yarn test:headed` or `yarn playwright test --headed` |
| **Run tests in debug mode (step-through)** | `yarn test:debug` or `yarn playwright test --debug` |
| **Run a single test file** | `yarn playwright test tests/frontend/smoke-homepage.spec.ts` |
| **Run only API tests** | `yarn playwright test tests/api/` |
| **List all tests** | `yarn test:list` or `yarn playwright test --list` |

After a run, open the HTML report with:

```bash
yarn playwright show-report
```

---

## Tooling

### Test framework

I use **Playwright with TypeScript** — due to its stability, speed, strong TypeScript support, and first-class API testing, which fits well with scalable smoke testing.

### Code editor

I use **Cursor** as my editor. It has proven to me that I can deliver better, faster, and safer code when using it.

---

## Test approach

For these smoke tests, I imagined myself on the team asking: *What is the minimum the website must offer, and if this minimum fails, is deploying worth it?*

Since this is an assignment, I kept the code **simple yet scalable** — easy to reuse, recycle, and expand when needed.

### What I intentionally did not include
I avoided long, end-to-end scenarios (e.g., full contact flows, multi-step user journeys) to keep smoke tests fast, reliable, and independent of each other. These flows are better suited for regression or exploratory testing.

---

## Test list

| # | Test | Spec file |
|---|------|-----------|
| 1 | Homepage smoke test | `tests/frontend/smoke-homepage.spec.ts` |
| 2 | Search city smoke test | `tests/frontend/smoke-searchCity.spec.ts` |
| 3 | Property detail smoke test | `tests/frontend/smoke-seeProperty.spec.ts` |
| 4 | Navigation core pages smoke test | `tests/frontend/smoke-navigation-core-pages.spec.ts` |
| 5 | Search API smoke test | `tests/api/smoke-search.api.spec.ts` |

---

## Comments in the code

I added comments in the code for **transparency** and to make the review easier. You can see my approach and motivation, and — where relevant — what was written by me vs. refined with AI (see below).

---

## Yes, AI was here

I used AI for this assignment: **Cursor** (with models such as Claude) and **ChatGPT** on the side for creativity and motivation.

My approach when building tests with AI is **speed, safety, quality, and coverage** — using it as a **peer**, not as a replacement for my brain.

I believe AI-assisted development is a great way to write better tests and increase coverage and quality while delivering faster. The assignment was not done 100% by AI: it was used to speed up the foundation, troubleshoot obstacles, act as a peer reviewer, and help with solutions that would otherwise take me much longer. I want to be honest: some things I might not have built so quickly without AI's help.

### For evaluators: what’s mine vs. what’s AI-assisted

In the codebase, comments mark the split:

- **`[Nicolas]`** — My design, locators, test flow, and structure.
- **`[AI-assisted]`** — Refactors or additions suggested by AI (e.g., stability fixes, consistency).

**Main AI-assisted areas:**

- **Playwright config** — Loading the Funda user agent from env, dotenv, `trace: retain-on-failure`, `retries: 0`.
- **Page objects** — Replacing one-off `isVisible()` + assert with `expect().toBeVisible({ timeout })` and `scrollIntoViewIfNeeded()` to reduce flakiness; I kept the `console.log` statements for the assignment.
- **CookiesPage** — Cookie button wait/click with try/catch; robot-check detection with a short timeout.
- **API (SearchApi, urls)** — POM-style API client, types, and centralised `api.search` URL.

The **spec files** (test flows and steps) are written by me; AI helped with import casing and small typo fixes.

---

## User agent

Because the user agent value is sensitive, I made sure it is **never hard-coded or published**. To run the tests, you need a **`.env`** file in the project root:

```
FUNDA_USER_AGENT=<agent value provided for this assignment>
```

Without it, tests can fail due to robot detection. The value is loaded via `dotenv` and never logged.

I **removed the Playwright GitHub Actions workflow** (`playwright.yml`) to avoid any risk of exposing the secret and to keep the assignment focused; the brief did not require CI/CD.

---

## Playwright config notes

- **Retries: 0** — So we fail fast and don’t wait for timeouts on retries.
- **Chromium only** — For smoke tests, I focused on a single browser to keep execution fast and reduce noise. Cross-browser coverage would be part of a broader regression suite.
- **Trace: retain-on-failure** — So failed runs still produce a trace for debugging.

For API tests in production, I would typically use **Postman + Newman** for CI/CD, but for this assignment, I kept everything in **Playwright** so the repo stays simple, and everything runs with one tool.

---

## Project structure

```
fndsmoke/
├── .env                 # Not committed; add FUNDA_USER_AGENT here
├── playwright.config.ts
├── tests/
│   ├── config/
│   │   └── urls.ts      # Centralised URLs for UI and API
│   ├── pages/           # Page objects (POM)
│   │   ├── api/
│   │   │   └── SearchApi.ts
│   │   ├── commonPage.ts
│   │   ├── CookiesPage.ts
│   │   ├── corePage.ts
│   │   ├── HomePage.ts
│   │   ├── propertyPage.ts
│   │   └── resultsPage.ts
│   ├── frontend/        # UI smoke specs
│   │   ├── smoke-homepage.spec.ts
│   │   ├── smoke-searchCity.spec.ts
│   │   ├── smoke-seeProperty.spec.ts
│   │   └── smoke-navigation-core-pages.spec.ts
│   └── api/
│       └── smoke-search.api.spec.ts
└── README.md
```

Thanks again for reviewing — and happy testing!
