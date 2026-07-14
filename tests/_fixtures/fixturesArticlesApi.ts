import { test as base } from '@playwright/test';
import { ArticlesApi } from '../../src/api/resources/ArticlesApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { CommentsApi } from '../../src/api/resources/CommentsApi';

export const test = base.extend<{
  articlesApi;
  articleWithoutTags;
  articleWithOneTag;
  CommentsApi;
}>({
commentsApi: async ({ request }, use) => {
    const client = new CommentsApi(request);

    await use(client);
  },

  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  },
  articleWithoutTags: async ({}, use) => {
    const article = generateNewArticleData();

    await use(article);
  },
  articleWithOneTag: async ({}, use) => {
    const article = generateNewArticleData(1);

    await use(article);
  },
});
