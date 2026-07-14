import { test } from '../../_fixtures/fixtures';

let slug;
let commentId;
const comment = {
    body: 'sdgvb',
  };

test.beforeEach(async ({ registeredUser, articlesApi, articleWithOneTag }) => {
  const response = await articlesApi.createArticle(
    articleWithOneTag,
    registeredUser.token,
  );

  await articlesApi.assertSuccessResponseCode(response);

  slug = await articlesApi.parseSlugFromResponse(response);
});

test(`Delete comment added by the same user`, async ({
  commentsApi,
  registeredUser,
}) => {
  const response = await commentsApi.createComment(
    comment,
    slug,
    registeredUser.token,
  );

  await commentsApi.assertSuccessResponseCode(response);
  commentId = await commentsApi.parseCommentIdFromResponse(response);

  const responseDelete = await commentsApi.deleteComment(
    slug,
    commentId,
    registeredUser.token,
  );

  await commentsApi.assertSuccessDeleteResponseCode(responseDelete);
});
