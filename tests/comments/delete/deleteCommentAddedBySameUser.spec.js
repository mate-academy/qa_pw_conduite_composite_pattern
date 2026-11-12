import { test } from '../../_fixtures/fixtures';
import { generateNewCommentData } from '../../../src/common/testData/generateNewCommentData';

let slug;
let commentId;

test.beforeEach(async ({ registeredUser, api, articleWithoutTags }) => {
  const articleResponse = await api.createArticle(
    articleWithoutTags,
    registeredUser.token,
  );

  await api.assertSuccessResponseCode(articleResponse);

  slug = await api.articles.parseSlugFromResponse(articleResponse);

  const commentResponse = await api.createComment(
    slug,
    generateNewCommentData(),
    registeredUser.token,
  );

  await api.comments.assertSuccessResponseCode(commentResponse);

  commentId = await api.comments.parseIdFromResponse(commentResponse);
});

test(`Delete comment added by the same user`, async ({
  api,
  registeredUser,
}) => {
  const response = await api.deleteComment(
    slug,
    commentId,
    registeredUser.token,
  );

  await api.comments.assertNoContentResponseCode(response);
});
