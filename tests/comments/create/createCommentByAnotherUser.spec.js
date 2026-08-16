import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.use({ usersNumber: 2 });

let slug;

test.beforeEach(async ({ registeredUsers, api, articleWithOneTag }) => {
  const response = await api.createArticle(
    articleWithOneTag,
    registeredUsers[0].token,
  );

  await api.assertSuccessResponseCode(response);

  slug = await api.parseSlugFromResponse(response);
});

test(`Create a comment by another user`, async ({
  api,
  registeredUsers,
}) => {
  const commentBody = faker.lorem.sentence();
  const response = await api.createComment(
    slug,
    commentBody,
    registeredUsers[1].token,
  );

  await api.assertSuccessResponseCode(response);
  await api.assertCommentBodyHasCorrectValue(response, commentBody);
});
