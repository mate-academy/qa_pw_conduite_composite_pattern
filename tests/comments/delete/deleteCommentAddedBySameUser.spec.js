import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

let slug;
let commentId;
let response;

test.beforeEach(async ({ registeredUser, api, articleWithOneTag }) => {
  response = await api.createArticle(
    articleWithOneTag,
    registeredUser.token,
  );

  await api.assertSuccessResponseCode(response);

  slug = await api.parseSlugFromResponse(response);

  const commentBody = faker.lorem.sentence();

  response = await api.createComment(slug, commentBody, registeredUser.token);

  await api.assertSuccessResponseCode(response);

  commentId = await api.parseCommentIdFromResponse(response);
});

test(`Delete a comment by same user`, async ({ api, registeredUser }) => {
  response = await api.deleteComment(slug, commentId, registeredUser.token);

  await api.assertSuccessDeleteResponseCode(response);
});
