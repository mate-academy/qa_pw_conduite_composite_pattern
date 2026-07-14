import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

let slug;
const comment = {
    body: 'sdgvb',
  };

test.beforeEach(async ({ registeredUsers, articlesApi, articleWithOneTag }) => {
  const response = await articlesApi.createArticle(
    articleWithOneTag,
    registeredUsers[0].token,
  );

  await articlesApi.assertSuccessResponseCode(response);

  slug = await articlesApi.parseSlugFromResponse(response);
});

test(`Create new comment without auth token`, async ({
  api,
}) => {
  const response = await api.createComment(
    comment,
    slug,
  );

  await api.assertUnauthorizedResponseCode(response);
});
