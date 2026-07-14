import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

let slug;
const comment = {
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
  registeredUsers,
  commentsApi,
}) => {
  const response = await commentsApi.createComment(
    comment,
    slug,
    registeredUsers[1].token,
  );

  await commentsApi.assertSuccessResponseCode(response);
});
