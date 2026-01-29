import { test } from '../../_fixtures/fixtures';

test(`Delete comment added by the same user`, async ({
  registeredUser,
  api,
  articleWithoutTags,
  commentWithBody,
}) => {
  const articleResponse = await api.createArticle(
    articleWithoutTags,
    registeredUser.token,
  );
  await api.assertSuccessResponseCode(articleResponse);

  const articleSlug = await api.articles.parseSlugFromResponse(articleResponse);

  const commentResponse = await api.createComment(
    articleSlug,
    commentWithBody,
    registeredUser.token,
  );
  await api.comments.assertSuccessResponseCode(commentResponse);

  const commentId = await api.comments.parseCommentIdFromResponse(
    commentResponse,
  );

  const deleteResponse = await api.deleteComment(
    articleSlug,
    commentId,
    registeredUser.token,
  );

  await api.comments.assertSuccessNoContentResponseCode(deleteResponse);
});
