import { test } from '../../_fixtures/fixtures';

let slug;

test.beforeEach(async ({ registeredUser, api, articleWithOneTag }) => {
  const response = await api.createArticle(
    articleWithOneTag,
    registeredUser.token,
  );

  await api.assertSuccessResponseCode(response);

  slug = await api.parseSlugFromResponse(response);
});

test(`Create a comment without body`, async ({ api, registeredUser }) => {
  const response = await api.createCommentWithoutBody(
    slug,
    registeredUser.token,
  );

  await api.assertUnprocessableEntityResponseCode(response);
});
