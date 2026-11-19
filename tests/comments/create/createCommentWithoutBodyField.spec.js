import { test } from '../../_fixtures/fixtures';

let slug;

test.beforeEach(async ({ api, registeredUser, articleWithoutTags }) => {
  const response = await api.createArticle(
    articleWithoutTags,
    registeredUser.token,
  );

  await api.assertSuccessResponseCode(response);

  slug = await api.articles.parseSlugFromResponse(response);
});

test(`Create new comment without body field`, async ({
  api,
  registeredUser,
}) => {
  const response = await api.createComment(slug, {}, registeredUser.token);

  await api.comments.assertUnprocessableEntityResponseCode(response);
});
