import { test as base } from '@playwright/test';
import { ArticlesApi } from '../../src/api/resources/ArticlesApi';
import { CommentsApi } from '../../src/api/resources/CommentsApi';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';

type ArticleData = ReturnType<typeof generateNewArticleData>;

type ArticlesApiFixtures = {
  articlesApi: ArticlesApi;
  commentsApi: CommentsApi;
  articleWithoutTags: ArticleData;
  articleWithOneTag: ArticleData;
};

export const test = base.extend<ArticlesApiFixtures>({
  articlesApi: async ({ request }, use) => {
    const client = new ArticlesApi(request);

    await use(client);
  },
  commentsApi: async ({ request }, use) => {
    const client = new CommentsApi(request);

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
