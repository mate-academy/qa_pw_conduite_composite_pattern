import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.use({ usersNumber: 3 });

test('Delete comment added by another user', async ({ registeredUsers, api, articleWithOneTag }) => {
  const [author, commenter, anotherUser] = registeredUsers;

  const responseArticle = await api.articles.createArticle(articleWithOneTag, author.token);
  await api.articles.assertSuccessResponseCode(responseArticle);
  const { article } = await responseArticle.json();
  const slug = article.slug;

  const commentBody = faker.lorem.sentence();
  const responseComment = await api.comments.createComment(slug, commentBody, commenter.token);
  await api.comments.assertSuccessResponseCode(responseComment);

  const { comment } = await responseComment.json();
  const commentId = comment.id;

  const deleteResponse = await api.comments.deleteComment(slug, commentId, anotherUser.token);
  await api.comments.assertForbiddenResponseCode(deleteResponse);
});
