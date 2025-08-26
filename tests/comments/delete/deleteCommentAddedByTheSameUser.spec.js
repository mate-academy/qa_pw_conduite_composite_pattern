import { test } from '../../_fixtures/fixtures'
import { faker } from '@faker-js/faker';

test('Delete comment added by the same user', async ({
  registeredUser,
  api,
  articleWithOneTag
}) => {
  const responseArticle = await api.articles.createArticle(articleWithOneTag, registeredUser.token);
  const createdArticle = await responseArticle.json();
  const slug = createdArticle.article.slug;

  const body = faker.lorem.sentence();
  const responseComment = await api.comments.createComment(slug, body, registeredUser.token);
  const { comment } = await responseComment.json();

  await api.comments.assertSuccessResponseCode(responseComment);

  const deleteComment = await api.comments.deleteComment(slug, comment.id, registeredUser.token);

  await api.comments.assertNoContentResponseCode(deleteComment);
});
