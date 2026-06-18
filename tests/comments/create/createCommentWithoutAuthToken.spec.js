import { generateNewCommentData } from '../../../src/common/testData/generateNewCommentData';
import { test } from '../../_fixtures/fixtures';

let slug;

test.beforeEach(async ({ registeredUser, api, articleWithOneTag }) => {
  const response = await api.articles.createArticle(
    articleWithOneTag,
    registeredUser.token,
  );

  await api.articles.assertSuccessResponseCode(response);

  slug = await api.articles.parseSlugFromResponse(response);
});

test(`Create comment without auth token`, async ({ api }) => {
  const comment = generateNewCommentData();
  const response = await api.comments.createComment(slug, comment);

  await api.comments.assertUnauthorizedResponseCode(response);
});
