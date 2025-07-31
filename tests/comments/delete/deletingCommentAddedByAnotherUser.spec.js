import { test } from './../../_fixtures/fixtures';

let articleSlug;
const newComment = 'This is a comment';
let commentId;
test.use({ usersNumber: 2 });
const firstUserIndex = 0;
const secondUserIndex = 1;

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
  const commentResponse = await api.comments.createComment(
    articleSlug,
    newComment,
    registeredUsers[firstUserIndex].token
  );
  const commentResponseBody = await commentResponse.json();
  commentId = commentResponseBody.comment.id;
});

test('Deleting comment added by another user', async ({ 
  api,
  registeredUsers,
}) => {
  const response = await api.comments.deleteComment(
    articleSlug,
    commentId,
    registeredUsers[secondUserIndex].token,
  );
  await api.comments.assertResponseCode(response, 403);
});