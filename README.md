[![Build Status](https://travis-ci.org/cycle2work/c2w-lambda-users.svg?branch=master)](https://travis-ci.org/cycle2work/c2w-lambda-users)
[![codecov](https://codecov.io/gh/cycle2work/c2w-lambda-users/branch/master/graph/badge.svg)](https://codecov.io/gh/cycle2work/c2w-lambda-users)
[![Dependency Status](https://david-dm.org/cycle2work/c2w-lambda-users.svg)](https://david-dm.org/cycle2work/c2w-lambda-users)
[![devDependency Status](https://david-dm.org/cycle2work/c2w-lambda-users/dev-status.svg)](https://david-dm.org/cycle2work/c2w-lambda-users#info=devDependencies)

# c2w-lambda-users

AWS Lambda function to persist user data and enjoy [`Cycle2work`](https://cycle2work.io).

After cloning the repository, run `npm install` or [`yarn`](https://yarnpkg.com) to install all dependencies.

## Table of Contents

- [Configuration](#folder-structure)
  - [Env Vars](#env-vars)

## Configuration

The lambda can be configured using a [`dotenv`](https://github.com/motdotla/dotenv) file (key=value format).

## Env Vars

Example of `.env` file:

```
STRAVA_ACCESS_TOKEN="your_strava_access_token"
STRAVA_CLIENT_ID="your_strava_client_id"
STRAVA_CLIENT_SECRET="your_strava_client_secret"
STRAVA_REDIRECT_URI=http://localhost:3000/token
LOG_LEVEL=debug
```
