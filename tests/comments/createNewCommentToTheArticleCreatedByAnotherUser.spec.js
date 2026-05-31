import { test } from '../_fixtures/fixtures';

let slug;

test.beforeEach(async ({ registeredUser, articlesApi, articleWithOneTag }) => {
  const response = await articlesApi.createArticle(
    articleWithOneTag,
    registeredUser.token,
  );

  await articlesApi.assertSuccessResponseCode(response);

  slug = await articlesApi.parseSlugFromResponse(response);
});

test(`Create new comment to the article created by another user`, async ({
  api,
  articlesApi,
  user
}) => {
  const user2 = await api.registerNewUser(user);
  const user2Body = await user2.json();
  const user2Token = user2Body.user.token;

  const response = await api.createComment(
    slug,
    user2Token,
    "What's heavier kilogram of steel or kilogram of feathers?"
  );

  await api.assertSuccessResponseCode(response);
});
