
# aitest-vitest

## Features

#### A lightweight template for API and UI testing with Vitest. It includes:

- API tests targeting AutomationExercise’s public demo API.

- UI tests with Playwright-style structure ported to run under Vitest.
- TypeScript, ESLint, Prettier, Husky, and a ready-to-run Vitest config.

This README explains setup, commands, project structure, how to run tests locally and in CI, environment configuration, and tips for working with AutomationExercise’s API behaviors.


## Project Structure
```
.
├── api/
├── eslint.config.mjs
├── node_modules/
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── ui
└── vitest.config.ts
```
- api — API test specs using fetch-based HTTP helpers under Vitest.

- eslint.config.mjs, .prettierrc — lint/format settings.

- ui — UI-oriented tests (kept separate for clarity), runnable under the same Vitest runner.

- vitest.config.ts — runner configuration, including test file matching and environment.

Vitest is unopinionated about folder layout; it runs any files matching the include patterns (e.g., **/*.spec.ts).


## Installation

Node 18+ is recommended to use built-in fetch for API tests. Otherwise, install a fetch polyfill.

Clone and install:
```bash
git clone <repo>

npm install

Run tests:

npm test
```

##### Vitest is the test runner used by this project. 
##### AutomationExercise is the demo API under test; 
##### its endpoints and expected status codes are documented on the site’s
##### API list, which this project references for assertions.



## Running Tests

To run tests, run the following command

```bash
npm test — run the full Vitest suite once.

npm run test:watch — run tests in watch mode.

npm run lint — run ESLint with the repo’s config.

npm run format — format with Prettier.

npm run precommit — run the Husky hook locally.
```


## Scripts
###### Vitest supports pattern includes like .spec.ts or .test.ts and can
###### run tests anywhere in the repo unless overridden in vitest.config.ts.
## Environment configuration

##### BASE_URL controls the target API host for API tests. 
##### Defaults to https://automationexercise.com.

## Usage/Examples

```
BASE_URL=https://automationexercise.com npm test

The AutomationExercise API exposes endpoints like:

GET /api/productsList → 200 with a products array.

GET /api/brandsList → 200 with a brands array.

POST /api/searchProduct with search_product → 200 with results.

POST /api/searchProduct without search_product → 400 with a “missing parameter” message.

POST /api/verifyLogin with valid email/password → 200 “User exists!”.

“Method not allowed” routes should return 405.

Keep expectations aligned with the official API list to avoid false failures.

Running tests
All tests:

npm test

Watch mode:

npm run test:watch

Filter by name or file:

npx vitest run -t "API 1"

npx vitest run api/*.spec.ts

Refer to Vitest docs for CLI flags and advanced configuration.

API testing notes
HTTP client: Node18+ global fetch is used; on older Node versions, add node-fetch and set globalThis.fetch accordingly.

JSON handling: tests parse JSON bodies when present and fall back to raw text if responses are HTML or empty.

Status codes: assertions follow AutomationExercise documentation (e.g., 400 for missing parameters, 405 for unsupported methods). If the live API behavior differs (e.g., returns 200 with an error message), update the test names and expectations together to preserve clarity.

Useful references when organizing test files and configuring Vitest’s include patterns:

Vitest default include patterns support both .test and .spec suffixes across JS/TS extensions.

UI testing notes
UI tests live under /ui and run on Vitest alongside API tests.

If using browser-like APIs, configure the test environment (e.g., jsdom) in vitest.config.ts as needed.

Vitest can be combined with Playwright for E2E; for mixed setups, keep separate folders or configs for clarity.

```

## Contributing

Ensure tests pass locally: npm test.

Lint and format before committing: npm run lint && npm run format.

Husky hooks enforce basic checks on commit.
## Troubleshooting

#### Unexpected API status:

Cross-check with AutomationExercise API list and adjust assertions if the upstream service behaves differently at runtime.

#### Tests not discovered:

Confirm file names end with .spec or .test and match vitest.config.ts include patterns.


#### fetch not found:

Use Node18+ or install node-fetch and assign to globalThis.fetch.
## Acknowledgements

Vitest: next-generation test runner that integrates tightly with Vite and supports TS out of the box.

AutomationExercise: public demo API with documented endpoints and expected responses used in the API test suite.