import { generateNewCommentData } from '../../../src/common/testData/generateNewCommentData';
import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.use({ usersNumber: 2 });

let slug;

test.beforeEach(async ({ registeredUsers, api, articleWithOneTag }) => {
  const response = await api.articles.createArticle(
    articleWithOneTag,
    registeredUsers[0].token,
  );

  await api.articles.assertSuccessResponseCode(response);

  slug = await api.articles.parseSlugFromResponse(response);
});

test(`Create comment to the article created by another user`, async ({
  registeredUsers,
  api,
}) => {
  const comment = generateNewCommentData();
  const token = registeredUsers[1].token;
  const response = await api.comments.createComment(slug, comment, token);

  await api.comments.assertSuccessResponseCode(response);
  await api.comments.assertCommentBodyHasCorrectValue(response, comment.body);
});
