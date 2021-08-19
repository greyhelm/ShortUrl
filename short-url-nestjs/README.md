<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

Built upon the [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository,
this project builds a simple Url Shortener.

There are two projects here, one using NestJS (short-url-nestjs), the other Express (short-url-express).

Both are run in the same way.

## Installation

```bash
$ npm install
```

## Running the app

This requires docker or a local mongodb installation.

#### Local Mongodb

`cd C:\Program Files\MongoDB\Server\5.0\bin\ `

`mongod`

#### Docker

There is a `docker-compose.yml` file for starting Docker.

`docker-compose up`

After running the sample, you can stop the Docker container with

`docker-compose down`

Then, run Nest as usual:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

