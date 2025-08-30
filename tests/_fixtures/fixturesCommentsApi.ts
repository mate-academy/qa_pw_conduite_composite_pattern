import { test as base } from '@playwright/test';
import { CommentsApi } from '../../src/api/resources/CommentsApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

export const test = base.extend<{
  commentsApi;
  randomComment;
}>({
  commentsApi: async ({ request }, use) => {
    const client = new CommentsApi(request);

    await use(client);
  },
  randomComment: async ({}, use) => {
    const article = generateNewArticleData();

    await use(`Comment: ${article.title}`);
  },
});
