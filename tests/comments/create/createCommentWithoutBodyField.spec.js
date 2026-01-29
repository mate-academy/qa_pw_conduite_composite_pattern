import { test } from '../../_fixtures/fixtures';

test(`Create new comment without body field`, async ({
  registeredUser,
  api,
  articleWithoutTags,
  commentWithoutBody,
}) => {
  const articleResponse = await api.createArticle(
    articleWithoutTags,
    registeredUser.token,
  );
  await api.assertSuccessResponseCode(articleResponse);

  const articleSlug = await api.articles.parseSlugFromResponse(articleResponse);

  const commentResponse = await api.createComment(
    articleSlug,
    commentWithoutBody,
    registeredUser.token,
  );

  await api.comments.assertSuccessResponseCode(commentResponse);
  await api.comments.assertResponseBodyContainsCommentId(commentResponse);
  await api.comments.assertCommentBodyHasCorrectValue(commentResponse, null);
});
