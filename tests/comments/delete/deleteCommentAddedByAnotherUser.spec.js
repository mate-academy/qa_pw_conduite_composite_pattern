import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.describe('Comments API Tests', () => {
  test.use({ usersNumber: 2 });

  test('Delete comment added by the another user', async ({ api, registeredUsers }) => {
    const [user1, user2] = registeredUsers;

    const articleData = generateNewArticleData();
    const articleResponse = await api.articles.createArticle(articleData, user1.token);
    await api.articles.assertSuccessResponseCode(articleResponse);
    const slug = await api.articles.parseSlugFromResponse(articleResponse);

    const commentResponse = await api.createComment(slug, { body: 'Self comment by User 1' }, user1.token);
    await api.comments.assertSuccessResponseCode(commentResponse);
    const commentId = await api.comments.parseCommentIdFromResponse(commentResponse);

    const deleteResponse = await api.deleteComment(slug, commentId, user2.token);
    await api.comments.assertResponseCode(deleteResponse, 403);
  });
});
