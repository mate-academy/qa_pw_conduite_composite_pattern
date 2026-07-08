import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.describe('Comments API Tests', () => {
  test.use({ usersNumber: 1 });

  test('Create new comment without auth token', async ({ api, registeredUsers }) => {
    const [user1] = registeredUsers;

    const articleData = generateNewArticleData();
    const articleResponse = await api.articles.createArticle(articleData, user1.token);
    await api.articles.assertSuccessResponseCode(articleResponse);
    const slug = await api.articles.parseSlugFromResponse(articleResponse);

    const commentResponse = await api.createComment(slug, { body: 'Anonymous comment' }, null);
    await api.comments.assertUnauthorizedResponseCode(commentResponse);
  });
});
