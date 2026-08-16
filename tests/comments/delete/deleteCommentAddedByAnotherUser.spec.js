import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.use({ usersNumber: 2 });

let slug;
let commentId;
let response;

test.beforeEach(async ({ registeredUsers, api, articleWithOneTag }) => {
  response = await api.createArticle(
    articleWithOneTag,
    registeredUsers[0].token,
  );

  await api.assertSuccessResponseCode(response);

  slug = await api.parseSlugFromResponse(response);

  const commentBody = faker.lorem.sentence();

  response = await api.createComment(
    slug, commentBody, registeredUsers[0].token);

  await api.assertSuccessResponseCode(response);

  commentId = await api.parseCommentIdFromResponse(response);
});

test(`Delete comment added by another user`,
  async ({ api, registeredUsers }) => {
  const response = await api.deleteComment(
    slug,
    commentId,
    registeredUsers[1].token,
  );

  await api.assertForbiddenResponseCode(response);
});
