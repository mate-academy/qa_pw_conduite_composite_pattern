import { test as base } from '@playwright/test';
import { CommentsApi } from '../../src/api/resources/CommentsApi';

export const test = base.extend<{
  commentsApi;
}>({
  commentsApi: async ({ request }, use) => {
    const client = new CommentsApi(request);

    await use(client);
  },
});
