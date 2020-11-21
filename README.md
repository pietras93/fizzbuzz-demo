# fizzbuzz-demo

FizzBuzz dockerized.
This is a nest.js based project that creates a simple server that returns a FizzBuzz output of requested length.
Separator for FizzBuzz element is set to single space character ``. On encountering a digit that is divisible by both 3 and 5 concatenated `FizzBuzz` string is used (without space).

Only allowed method is **POST**, requests with other methods will receive 405 error code. This is handled by `AllowedMethodsMiddleware`.
Only allowed path is `/fizzbuzz`, requests with other paths will receive 404 error code. This is handled by nest's router config.
Request body must contain property **count** that is an integer larger than or equal to 1; other properties are ignored and stripped from body. Requests without proper body will receive 400 error code. Validation is handled by `Validator` that utilizes `class-validator`.

App utilizes helemet middleware that sets various headers to improve security. There is also a global rate limiter in place that limits one user (IP based) to a 100 requests per minute.

Port on which apps listens on is set by `PORT` environment variable and defaults to 3000 if env var is not set.

## Build and deploy

### Local

To build project locally (outside of docker) you will need to install dependencies:
`npm i`
and either run watch mode (with hot reload)
`npm run start:dev`
or build
`npm run build`
and start production mode
`npm run start:prod`

#### Testing

There are two test suites for the project, one runs e2e tests on endpoints, the second one unit tests service. Both utilize Jest testing framework.
In order to start the unit test run:
`npm run test`
In order to start the e2e test run:
`npm run test:e2e`

Additionally, there is a Github Action defined that runs both test suites on pushes and pull requests to `main` branch.

### Docker

In order to create docker image, use included Dockerfile.
`docker build -t TAGNAME .`

It will firstly spawn a builder, install all dependencies and transpile the project. Next step will use lean Alpine image, install node (version 12 for Alpine 3.12) and only production dependencies, copy built project, create _node_ user without root privilages and run the project.

The resulting image weights about 73.8Mb

In order to publish image to Docker Hub firstly login
`docker login --username USERNAME`
and then push the created image
`docker push REPO:TAGNAME`

Published image can be found here: https://hub.docker.com/repository/docker/pietras93/fizzbuzz-demo

### Google Cloud Run

In order to publish image to Google Cloud Repository, you will need _gcloud_ initialised, later you can submit build with
`gcloud builds submit --tag gcr.io/PROJECT_NAME/fizzbuzz-demo`
and deploy that image to Cloud Run with CLI by:
`gcloud run deploy SERVICE_NAME --image=gcr.io/PROJECT_NAME/fizzbuzz-demo`

### Demo

You can test the project running in Google Cloud Run.
Server address https://fizzbuzz-demo-34vn5aovga-ew.a.run.app/
Example request: **POST** _/fizzbuzz_ `{ "count": 20 }`
