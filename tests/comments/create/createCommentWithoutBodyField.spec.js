import { generateNewCommentData } from '../../../src/common/testData/generateNewCommentData';
import { test } from '../../_fixtures/fixtures';

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

test(`Create comment without body field`, async ({ registeredUsers, api }) => {
  const comment = generateNewCommentData();
  comment.body = null;

  const response = await api.comments.createComment(
    slug,
    comment,
    registeredUsers[1].token,
  );

  // Note: API accepts comment with null body attibute
  await api.comments.assertSuccessResponseCode(response);
});
