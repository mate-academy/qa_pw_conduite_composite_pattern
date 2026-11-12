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

test(`Create new comment without body field`, async ({
  api,
  registeredUser,
}) => {
  const comment = generateNewCommentData();
  delete comment.body;

  const response = await api.createComment(slug, comment, registeredUser.token);

  await api.comments.assertSuccessResponseCode(response);
  await api.comments.assertCommentBodyHasCorrectValue(response, null);
});
