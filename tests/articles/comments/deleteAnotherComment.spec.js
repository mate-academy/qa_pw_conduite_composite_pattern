import { test } from '../../_fixtures/fixtures';

test.use({ usersNumber: 2 });

let slug;
let commentId;

test.beforeEach(async ({ registeredUsers, articlesApi, articleWithOneTag }) => {
  const response = await articlesApi.createArticle(
    articleWithOneTag,
    registeredUsers[0].token,
  );

  await articlesApi.assertSuccessResponseCode(response);

  slug = await articlesApi.parseSlugFromResponse(response);
});

test(`Create and delete not my comment`, async ({
  commentsApi,
  randomComment,
  registeredUsers,
}) => {
  await test.step(`Create a comment`, async () => {
    const response = await commentsApi.createComment(
      slug,
      randomComment,
      registeredUsers[0].token,
    );

    await commentsApi.assertSuccessResponseCode(response);
    commentId = await commentsApi.getAndVerifyCommentFromResponse(
      response,
      randomComment,
    );

    await commentsApi.assertResponseBodyContainsAuthor(
      response,
      registeredUsers[0].username,
    );
  });

  await test.step(`Delete a comment`, async () => {
    const response = await commentsApi.deleteComment(
      slug,
      commentId,
      registeredUsers[1].token,
    );

    await commentsApi.assertForbiddenResponseCode(response);
  });
});
