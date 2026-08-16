import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

let slug;

test.beforeEach(async ({ registeredUser, api, articleWithOneTag }) => {
  const response = await api.createArticle(
    articleWithOneTag,
    registeredUser.token,
  );

  await api.assertSuccessResponseCode(response);

  slug = await api.parseSlugFromResponse(response);
});

test(`Create a comment without auth token`, async ({ api }) => {
  const commentBody = faker.lorem.sentence();
  const response = await api.createCommentWithoutAuthToken(
    slug,
    commentBody,
  );

  await api.assertUnauthorizedResponseCode(response);
});
