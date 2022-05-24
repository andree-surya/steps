## Description

**Steps** is an API server providing step-tracking functionalities through RESTful API interfaces. Developed for demonstration and educational purposes.

## Technologies

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Running the app

```bash
# install dependencies
$ npm install

# watch mode
$ npm run start:dev
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

## Interacting with the API

### Submit Steps

```
$ curl --location --request POST 'http://localhost:3000/steps' \
--header 'Content-Type: application/json' \
--data-raw '{
    "count": 2000,
    "timestamp": "2022-05-24T08:19:34.842+07:00"
}'

HTTP/1.1 201 Created
{"count":2000,"2022-05-24T01:19:34.842+00:00"}
```

### Get Daily Steps Summary

```
$ curl --location --request GET 'http://localhost:3000/steps?from=2022-01-01&to=2023-01-01&timezone=Asia/Jakarta&granularity=day'

HTTP/1.1 200 OK
[
  {"count":2000,"timestamp":"2022-05-22T00:00:00.000+07:00"},
  {"count":1500,"timestamp":"2022-05-23T00:00:00.000+07:00"},
  {"count":1700,"timestamp":"2022-05-24T00:00:00.000+07:00"}
]
```
