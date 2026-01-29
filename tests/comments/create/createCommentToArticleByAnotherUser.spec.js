import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Create new comment to the article created by another user`, async ({
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
    secondUser.token,
  );

  await api.comments.assertSuccessResponseCode(commentResponse);
  await api.comments.assertResponseBodyContainsCommentId(commentResponse);
  await api.comments.assertCommentBodyHasCorrectValue(
    commentResponse,
    commentWithBody.body,
  );
});
