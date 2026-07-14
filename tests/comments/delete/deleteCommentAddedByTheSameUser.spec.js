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
  api,
  registeredUser,
}) => {
  const response = await api.createComment(
    comment,
    slug,
    registeredUser.token,
  );

  await api.assertSuccessResponseCode(response);
  commentId = await api.parseCommentIdFromResponse(response);

  const responseDelete = await api.deleteComment(
    slug,
    commentId,
    registeredUser.token,
  );

  await api.assertSuccessDeleteResponseCode(responseDelete);
});
