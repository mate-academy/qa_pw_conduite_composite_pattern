import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

let slug;

test.beforeEach(async ({ api, registeredUser }) => {
  const article = generateNewArticleData();
  const response = await api.createArticle(article, registeredUser.token);
  await api.assertSuccessResponseCode(response);
  slug = await api.articles.parseSlugFromResponse(response);
});

test(`Create new comment without auth token`, async ({ api }) => {
  const comment = { body: 'Nice read!' };
  const response = await api.createComment(slug, comment);

  await api.comments.assertUnauthorizedResponseCode(response);
});
