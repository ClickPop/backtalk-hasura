# Hasura Service

## Pre-requisites

You will need the following installed on your system to get started with this repo:

- [Hasura CLI (Version 2.1.1)](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html)
- [Docker](docker.com)
- .env file in the `local` folder

## Setup

### Start the local Hasura and Postgres instance
- cd into the `local` folder and run `docker-compose up`

### Start the hasura console so you can interact with any changes that are made
- In a new terminal tab/window, cd into `local` then run `hasura console` to start the hasura console so any changes you make will be tracked.