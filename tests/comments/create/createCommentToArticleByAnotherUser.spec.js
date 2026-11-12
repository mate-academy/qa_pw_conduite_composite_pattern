import { test } from '../../_fixtures/fixtures';
import { generateNewCommentData } from '../../../src/common/testData/generateNewCommentData';

test.use({ usersNumber: 2 });

let slug;

test.beforeEach(async ({ registeredUsers, api, articleWithoutTags }) => {
  const response = await api.createArticle(
    articleWithoutTags,
    registeredUsers[0].token,
  );

  await api.assertSuccessResponseCode(response);

  slug = await api.articles.parseSlugFromResponse(response);
});

test(`Create new comment to the article created by another user`, async ({
  api,
  registeredUsers,
}) => {
  const comment = generateNewCommentData();
  const response = await api.createComment(
    slug,
    comment,
    registeredUsers[1].token,
  );

  await api.comments.assertSuccessResponseCode(response);
  await api.comments.assertResponseBodyContainsId(response);
  await api.comments.assertCommentBodyHasCorrectValue(response, comment.body);
  await api.comments.assertAuthorUsernameHasCorrectValue(
    response,
    registeredUsers[1].username,
  );
});
