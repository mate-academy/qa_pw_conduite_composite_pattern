import { generateNewCommentData } from '../../../src/common/testData/generateNewCommentData';
import { test } from '../../_fixtures/fixtures';

let slug;
let commentId;

test.beforeEach(async ({ registeredUser, api, articleWithOneTag }) => {
  const token = registeredUser.token;
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

test(`Delete comment by same user`, async ({ registeredUser, api }) => {
  const response = await api.comments.deleteComment(
    slug,
    commentId,
    registeredUser.token,
  );

  await api.comments.assertNoContentResponseCode(response);
});
