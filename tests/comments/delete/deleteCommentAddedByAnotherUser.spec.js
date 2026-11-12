import { test } from '../../_fixtures/fixtures';
import { generateNewCommentData } from '../../../src/common/testData/generateNewCommentData';

test.use({ usersNumber: 2 });

let slug;
let commentId;

test.beforeEach(async ({ registeredUsers, api, articleWithoutTags }) => {
  const articleResponse = await api.createArticle(
    articleWithoutTags,
    registeredUsers[0].token,
  );

  await api.assertSuccessResponseCode(articleResponse);

  slug = await api.articles.parseSlugFromResponse(articleResponse);

  const commentResponse = await api.createComment(
    slug,
    generateNewCommentData(),
    registeredUsers[0].token,
  );

  await api.comments.assertSuccessResponseCode(commentResponse);

  commentId = await api.comments.parseIdFromResponse(commentResponse);
});

test(`Delete comment added by the another user`, async ({
  api,
  registeredUsers,
}) => {
  const response = await api.deleteComment(
    slug,
    commentId,
    registeredUsers[1].token,
  );

  await api.comments.assertForbiddenResponseCode(response);
});
