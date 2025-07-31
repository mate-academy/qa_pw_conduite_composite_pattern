import { expect } from 'allure-playwright';
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
  const responseBody = await api.articles.createArticle(
    articleWithoutTags,
    registeredUsers[firstUserIndex].token
  );
  articleSlug = responseBody.article.slug;
});

test('Creating a comment to an article created by another user', async ({ 
  api,
  registeredUsers,
}) => {
  await api.comments.createComment(
    articleSlug,
    newComment,
    registeredUsers[secondUserIndex].token
  );
  const commentsResponse = await api.comments.getComments(articleSlug);
  const responseBody = await commentsResponse.json();
  const comment = responseBody.comments.find(
    (c) => c.body === newComment
  ); 
  expect(comment).toBeDefined();
});