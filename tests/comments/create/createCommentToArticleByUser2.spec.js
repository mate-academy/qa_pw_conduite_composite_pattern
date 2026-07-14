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

test(`Create new comment to the article created by another user`, async ({
  api,
  registeredUsers,
}) => {
  const response = await api.createComment(
    comment,
    slug,
    registeredUsers[1].token,
  );

  await api.assertSuccessResponseCode(response);
});
