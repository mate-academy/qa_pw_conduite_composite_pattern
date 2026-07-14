import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

let slug;
let commentId;
const comment = {
    body: 'sdgvb',
  };

test.beforeEach(async ({ registeredUsers, articlesApi, articleWithOneTag }) => {
  const response = await articlesApi.createArticle(
    articleWithOneTag,
    registeredUsers[0].token,
  );

  await articlesApi.assertSuccessResponseCode(response);

  slug = await articlesApi.parseSlugFromResponse(response);
});

test(`Delete comment added by the another user`, async ({
  commentsApi,
  registeredUsers,
}) => {
  const response = await commentsApi.createComment(
    comment,
    slug,
    registeredUsers[0].token,
  );

  await commentsApi.assertSuccessResponseCode(response);
  commentId = await commentsApi.parseCommentIdFromResponse(response);

  const responseDelete = await commentsApi.deleteComment(
    slug,
    commentId,
    registeredUsers[1].token,
  );

  await commentsApi.assertUnauthorizedResponseCode(responseDelete);
});
