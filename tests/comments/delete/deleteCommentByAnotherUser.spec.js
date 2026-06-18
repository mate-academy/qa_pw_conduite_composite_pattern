import { generateNewCommentData } from '../../../src/common/testData/generateNewCommentData';
import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

let slug;
let commentId;

test.beforeEach(async ({ registeredUsers, api, articleWithOneTag }) => {
  const token = registeredUsers[0].token;
  const articleResponse = await api.articles.createArticle(
    articleWithOneTag,
    token,
  );

  await api.articles.assertSuccessResponseCode(articleResponse);

  slug = await api.articles.parseSlugFromResponse(articleResponse);
  const comment = generateNewCommentData();

  const commentResponse = await api.comments.createComment(
    slug,
    comment,
    token,
  );

  await api.comments.assertSuccessResponseCode(commentResponse);

  commentId = await api.comments.parseCommentIdFromResponse(commentResponse);
});

test(`Delete comment by another user`, async ({ registeredUsers, api }) => {
  const response = await api.comments.deleteComment(
    slug,
    commentId,
    registeredUsers[1].token,
  );

  await api.comments.assertForbiddenStatusCode(response);
});
