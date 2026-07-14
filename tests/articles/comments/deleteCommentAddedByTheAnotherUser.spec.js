import {test} from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

test(`Delete comment added by another user`, async ({
  registeredUsers, 
  articleWithoutTags,
  api,
}) => {
  const user1 = registeredUsers[0];
  const user2 = registeredUsers[1];
  // 1. User1 создает статью
  const response = await api.articles.createArticle(articleWithoutTags, user1.token);
  await api.articles.assertSuccessResponseCode(response);
  const slug = (await response.json()).article.slug;
  // 2. User1 создает комментарий
  const commentResponse = await api.comments.createComment(
    slug,
    { body: 'Comment by user1' },
    user1.token,
  );
  await api.comments.assertSuccessResponseCode(commentResponse);
  const commentId = (await commentResponse.json()).comment.id;
  // 3. User2 пытается удалить комментарий user1
  const deleteResponse = await api.comments.deleteComment(slug, commentId, user2.token);
  
  // Должен получить 403 Forbidden
  await api.comments.assertForbiddenResponseCode(deleteResponse);
});