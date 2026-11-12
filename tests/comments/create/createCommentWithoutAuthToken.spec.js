import { test } from '../../_fixtures/fixtures';
import { generateNewCommentData } from '../../../src/common/testData/generateNewCommentData';

let slug;

test.beforeEach(async ({ registeredUser, api, articleWithoutTags }) => {
  const response = await api.createArticle(
    articleWithoutTags,
    registeredUser.token,
  );

  await api.assertSuccessResponseCode(response);

  slug = await api.articles.parseSlugFromResponse(response);
});

test(`Create new comment without auth token`, async ({ api }) => {
  const comment = generateNewCommentData();
  const token = '';
  const response = await api.createComment(slug, comment, token);

  await api.comments.assertUnauthorizedResponseCode(response);
});
