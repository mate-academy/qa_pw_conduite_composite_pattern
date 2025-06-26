# Practice for Composite design pattern

## Table of contents

- [Description](#description)
- [Preparation](#preparation)
- [Main Task](#main-task)
- [Task Reporting](#task-reporting)

## Description

In this task you will practice working with Composite desing pattern and create new API tests for /comments Conduit endpoint.

The full list of Conduit APIs is described in the [documentation](https://documenter.getpostman.com/view/22790481/2sB2j1iY5B).


## Preparation

1. Open the forked repo in VSCode.
2. Create a new branch by running `git checkout -b task_solution`.
3. Run the installation commands:

    - `npm ci`
    - `npx playwright install`


## Main Task

1. Create new class `./src/api/resources/CommentsApi.js`;
2. Initialize `CommentsApi` in the `./src/api//ApiComposite.js` class and add API methods for comments CRUD operations;
3. Create new tests for comments APIs using the `api` fixture to access API methods:
- *Create new comment to the article created by another user*
- *Create new comment without auth token*
- *Create new comment without body field*
- *Delete comment added by the same user*
- *Delete comment added by the another user*


## Task Reporting

1. Add and commit all your updates.
2. Push the code to the origin.
3. Create a PR for your changes.
4. Keep implementing suggestions from code review until your PR is approved.
