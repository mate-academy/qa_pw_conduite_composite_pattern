import { test } from '../../_fixtures/fixtures';

let slug;
let commentId;

test.beforeEach(async ({ registeredUser, articlesApi, articleWithOneTag }) => {
  const response = await articlesApi.createArticle(
    articleWithOneTag,
    registeredUser.token,
  );

  await articlesApi.assertSuccessResponseCode(response);

  slug = await articlesApi.parseSlugFromResponse(response);
});

test(`Create and delete own comment`, async ({
  commentsApi,
  randomComment,
  registeredUser,
}) => {
  await test.step(`Create a comment`, async () => {
    const response = await commentsApi.createComment(
      slug,
      randomComment,
      registeredUser.token,
    );

    await commentsApi.assertSuccessResponseCode(response);
    commentId = await commentsApi.getAndVerifyCommentFromResponse(
      response,
      randomComment,
    );

    await commentsApi.assertResponseBodyContainsAuthor(
      response,
      registeredUser.username,
    );
  });

  await test.step(`Delete a comment`, async () => {
    const response = await commentsApi.deleteComment(
      slug,
      commentId,
      registeredUser.token,
    );

    await commentsApi.assertSuccessResponseCode(response);
  });
});
