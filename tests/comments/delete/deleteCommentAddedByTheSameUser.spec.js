import { test } from '../../_fixtures/fixtures';
import { faker } from '@faker-js/faker';

test('Delete comment added by the same user', async ({ registeredUser, api, articleWithOneTag }) => {
  const responseArticle = await api.articles.createArticle(articleWithOneTag, registeredUser.token);
  const { article } = await responseArticle.json();
  const slug = article.slug;

  const body = faker.lorem.sentence();
  const responseComment = await api.comments.createComment(slug, body, registeredUser.token);
  await api.comments.assertSuccessResponseCode(responseComment);

  const { comment } = await responseComment.json();
  const commentId = comment.id;

  const deleteComment = await api.comments.deleteComment(slug, commentId, registeredUser.token);
  await api.comments.assertNoContentResponseCode(deleteComment);
});
