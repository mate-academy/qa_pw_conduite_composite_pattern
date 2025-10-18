import { test } from './../../_fixtures/fixtures';

test.use({ usersNumber: 2 });
let articleSlug;
const firstUserIndex = 0;
const secondUserIndex = 1;
const newComment = 'This is a comment';

test.beforeEach(async ({
  registeredUsers,
  articleWithoutTags,
  api,
}) => {
  const articleResponse = await api.articles.createArticle(
    articleWithoutTags,
    registeredUsers[firstUserIndex].token
  );
  articleSlug = articleResponse.article.slug;
});

test('Creating a comment without auth token', async ({ 
  api,
}) => {
  const response = await api.comments.createComment(
    articleSlug,
    newComment,
  );
  await api.comments.assertResponseCode(response, 401);
});