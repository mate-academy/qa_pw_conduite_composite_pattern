import { test } from '../../_fixtures/fixtures';

let slug;

test.beforeEach(async ({ registeredUser, articlesApi, articleWithOneTag }) => {
  const response = await articlesApi.createArticle(
    articleWithOneTag,
    registeredUser.token,
  );

  await articlesApi.assertSuccessResponseCode(response);

  slug = await articlesApi.parseSlugFromResponse(response);
});

test(`Try to create new comment with not filled in body`, async ({
  commentsApi,
  registeredUser,
}) => {
  const response = await commentsApi.createComment(
    slug,
    null,
    registeredUser.token,
  );

  await commentsApi.assertUnprocessableEntityResponseCode(response);
});
