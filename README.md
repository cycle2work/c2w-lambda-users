# c2w-lambda-users

[![Build Status](https://travis-ci.org/cycle2work/c2w-lambda-users.svg?branch=master)](https://travis-ci.org/cycle2work/c2w-lambda-users)
[![codecov](https://codecov.io/gh/cycle2work/c2w-lambda-users/branch/master/graph/badge.svg)](https://codecov.io/gh/cycle2work/c2w-lambda-users)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

AWS Lambda function to persist user and club data to enjoy [`cycle2work.io`](https://cycle2work.io).

After cloning the repository, run `npm install` or [`yarn`](https://yarnpkg.com) to install all dependencies and `yarn dev` to start developing.

## Env Vars

List of env vars and defaults:

| Name                 | Default                        |
| -------------------- | ------------------------------ |
| LOG_LEVEL            | debug                          |
| STRAVA_ACCESS_TOKEN  |                                |
| STRAVA_CLIENT_ID     |                                |
| STRAVA_CLIENT_SECRET |                                |
| USERS_COLLECTION     | users                          |
| CLUBS_COLLECTION     | clubs                          |
| MONGODB_URL          | mongodb://localhost:27017/test |
| DB_NAME              | c2w-mongol                     |
