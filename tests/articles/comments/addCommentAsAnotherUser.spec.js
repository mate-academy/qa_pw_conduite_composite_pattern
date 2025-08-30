import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

let slug;

test.beforeEach(async ({ registeredUsers, articlesApi, articleWithOneTag }) => {
  const response = await articlesApi.createArticle(
    articleWithOneTag,
    registeredUsers[0].token,
  );

  await articlesApi.assertSuccessResponseCode(response);

  slug = await articlesApi.parseSlugFromResponse(response);
});

test(`Create new comment to the article created by another user`, async ({
  commentsApi,
  randomComment,
  registeredUsers,
}) => {
  const response = await commentsApi.createComment(
    slug,
    randomComment,
    registeredUsers[1].token,
  );

  await commentsApi.assertSuccessResponseCode(response);
  await commentsApi.getAndVerifyCommentFromResponse(response, randomComment);
  await commentsApi.assertResponseBodyContainsAuthor(
    response,
    registeredUsers[1].username,
  );
});
