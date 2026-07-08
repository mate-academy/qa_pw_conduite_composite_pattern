import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.describe('Comments API Tests', () => {
  test.use({ usersNumber: 1 });

  test('Delete comment added by the same user', async ({ api, registeredUsers }) => {
    const [user1] = registeredUsers;

    const articleData = generateNewArticleData();
    const articleResponse = await api.articles.createArticle(articleData, user1.token);
    await api.articles.assertSuccessResponseCode(articleResponse);
    const slug = await api.articles.parseSlugFromResponse(articleResponse);

    const commentResponse = await api.createComment(slug, { body: 'Self comment' }, user1.token);
    await api.comments.assertSuccessResponseCode(commentResponse);
    const commentId = await api.comments.parseCommentIdFromResponse(commentResponse);

    const deleteResponse = await api.deleteComment(slug, commentId, user1.token);
    await api.comments.assertResponseCode(deleteResponse, 204);
  });
});
