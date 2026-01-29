import { test } from '../../_fixtures/fixtures';

test(`Create new comment without auth token`, async ({
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

  const token = '';
  const commentResponse = await api.createComment(
    articleSlug,
    commentWithBody,
    token,
  );

  await api.comments.assertUnauthorizedResponseCode(commentResponse);
});
