import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.use({ usersNumber: 2 });

test(`Delete comment added by another user`, async ({
  api,
  registeredUsers,
}) => {
  const article = generateNewArticleData();
  const articleResponse = await api.createArticle(
    article,
    registeredUsers[0].token,
  );
  await api.assertSuccessResponseCode(articleResponse);
  const slug = await api.articles.parseSlugFromResponse(articleResponse);

  const comment = { body: 'Not yours to delete' };
  const createCommentResponse = await api.createComment(
    slug,
    comment,
    registeredUsers[0].token,
  );
  await api.comments.assertSuccessResponseCode(createCommentResponse);
  const commentId = await api.comments.parseCommentIdFromResponse(
    createCommentResponse,
  );

  const deleteResponse = await api.deleteComment(
    slug,
    commentId,
    registeredUsers[1].token,
  );

  await api.comments.assertForbiddenResponseCode(deleteResponse);
});
