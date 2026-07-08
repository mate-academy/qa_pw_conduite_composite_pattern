import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.describe('Comments API Tests', () => {
  test.use({ usersNumber: 2 });

  test('Create new comment to the article created by another user', async ({ api, registeredUsers }) => {
    const [user1, user2] = registeredUsers;

    const articleData = generateNewArticleData();
    const articleResponse = await api.articles.createArticle(articleData, user1.token);
    await api.articles.assertSuccessResponseCode(articleResponse);
    const slug = await api.articles.parseSlugFromResponse(articleResponse);

    const commentBody = { body: 'This is a test comment by another user' };
    const commentResponse = await api.createComment(slug, commentBody, user2.token);
    await api.comments.assertSuccessResponseCode(commentResponse);
    await api.comments.assertCommentBodyHasCorrectValue(commentResponse, commentBody.body);
    await api.comments.assertCommentAuthorHasCorrectValue(commentResponse, user2.username);
  });
});
