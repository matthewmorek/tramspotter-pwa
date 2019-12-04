<p align="center"><img src="https://github.com/matthewmorek/tramspotter/raw/master/public/img/og-image.png" alt="tramspotter banner" /></p>

![Netlify](https://img.shields.io/netlify/0617dc70-0e10-45f5-8c7e-5e8b8c46378a?&logo=netlify)
[![GitHub Actions](https://github.com/exterkamp/lighthouse-ci-action/workflows/CI/badge.svg)](https://github.com/matthewmorek/tramspotter/actions?query=workflow%3A%22Push+Audit+CI%22)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

# Tramspotter

Get live departures at your nearest Metrolink tram stop.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you’ll need to get started.

- Git
- NodeJS 12
- npm or Yarn
- `netlify-cli`

### Initial setup

This project requires `netlify-cli` to be present in order to use Nelitfy Dev to run Javacript functions in a local environment.

```
npm install -g netlify-cli
npm install
```

1. Using Git, clone this repository to your local machine.
2. Run `npm install` or `yarn` from inside the project's directory to install all dependencies.
3. Get your API keys from [TfGM developer portal](https://developer.tfgm.com) and [TransportAPI](https://developer.transportapi.com)
4. Run `cp ./.env.local.sample ./.env` and adjust config variables, then make sure to load them to your terminal's session before you launch the app

### Required environment variables

| Variable       | Description           |
| -------------- | --------------------- |
| `TFGM_API_KEY` | TfGM API Key          |
| `TA_APP_ID`    | Transport API App ID  |
| `TA_APP_KEY`   | Transport API App Key |

### Compiles and hot-reloads for development using `netlify-cli`

This command does three things:

- spins up a Webpack HMU server for the app
- spins up a local Node server with hot reloading for lambda functions
- proxies requests for lambdas to hit the local environment instead of Netlify

```
netlify dev
```

### Run the test suite

```
npm run test
npm run test:watch
npm run test:precommit
```

### Lints and fixes files

```
npm run lint
```

### Run Storybook

```
npm run storybook
```
