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

test(`Try to create new comment without auth token`, async ({
  commentsApi,
  randomComment,
}) => {
  const response = await commentsApi.createComment(slug, randomComment);

  await commentsApi.assertUnauthorizedResponseCode(response);
});
