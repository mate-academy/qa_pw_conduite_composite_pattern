import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Delete comment added by the another user`, async ({
  registeredUsers,
  api,
  articleWithoutTags,
  commentWithBody,
}) => {
  const firstUser = registeredUsers[0];
  const secondUser = registeredUsers[1];

  const articleResponse = await api.createArticle(
    articleWithoutTags,
    firstUser.token,
  );
  await api.assertSuccessResponseCode(articleResponse);

  const articleSlug = await api.articles.parseSlugFromResponse(articleResponse);

  const commentResponse = await api.createComment(
    articleSlug,
    commentWithBody,
    firstUser.token,
  );
  await api.comments.assertSuccessResponseCode(commentResponse);

  const commentId = await api.comments.parseCommentIdFromResponse(
    commentResponse,
  );

  const deleteResponse = await api.deleteComment(
    articleSlug,
    commentId,
    secondUser.token,
  );

  await api.comments.assertForbiddenResponseCode(deleteResponse);
});
