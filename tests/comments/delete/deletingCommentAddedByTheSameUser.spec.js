import { test } from './../../_fixtures/fixtures';

let articleSlug;
const newComment = 'This is a comment';
let commentId;

test.beforeEach(async ({
  registeredUser,
  articleWithoutTags,
  api,
}) => {
  const responseBody = await api.articles.createArticle(
    articleWithoutTags,
    registeredUser.token
  );
  articleSlug = responseBody.article.slug;
  const commentResponse = await api.comments.createComment(
    articleSlug,
    newComment,
    registeredUser.token
  );
  const commentResponseBody = await commentResponse.json();
  commentId = commentResponseBody.comment.id;
});

test('Deleting comment added by the same user', async ({ 
  api,
  registeredUser,
}) => {
  const response = await api.comments.deleteComment(
    articleSlug,
    commentId,
    registeredUser.token,
  );
  await api.comments.assertResponseCode(response, 204);
});