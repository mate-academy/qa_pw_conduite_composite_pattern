import { test as base } from '@playwright/test';
import { CommentsApi } from '../../src/api/resources/CommentsApi';

export const test = base.extend<{
  commentsApi;
  commentWithBody;
  commentWithoutBody;
}>({
  commentsApi: async ({ request }, use) => {
    const client = new CommentsApi(request);

    await use(client);
  },
  commentWithBody: async ({}, use) => {
    const comment = {
      body: `Test comment body ${Date.now()}`,
    };

    await use(comment);
  },
  commentWithoutBody: async ({}, use) => {
    const comment = {};

    await use(comment);
  },
});
