import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

let slug;

test.beforeEach(async ({ api, registeredUser }) => {
  const article = generateNewArticleData();
  const response = await api.createArticle(article, registeredUser.token);
  await api.assertSuccessResponseCode(response);
  slug = await api.articles.parseSlugFromResponse(response);
});

test(`Create new comment without body field`, async ({
  api,
  registeredUser,
}) => {
  const comment = {};
  const response = await api.createComment(slug, comment, registeredUser.token);

  await api.comments.assertUnprocessableEntityResponseCode(response);
});
