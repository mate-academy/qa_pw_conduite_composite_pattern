// tests/comments/deleteOwnComment.spec.js
import { test } from '../_fixtures/fixtures';
import { CommentsApi } from '../../src/api/resources/CommentsApi';
import { ArticlesApi } from '../../src/api/resources/ArticlesApi';

test.use({ usersNumber: 1 });

test(`Delete comment added by the same user`, async ({
  registeredUser,
  userRequests,
}) => {
  const articlesApi = new ArticlesApi(userRequests[0]);
  const aRes = await articlesApi.createArticle(
    { title: `t-${Date.now()}`, description: 'd', body: 'b', tagList: [] },
    registeredUser.token,
  );
  await articlesApi.assertSuccessResponseCode(aRes);
  const slug = (await aRes.json()).article.slug;

  const commentsApi = new CommentsApi(userRequests[0]);
  const cRes = await commentsApi.createComment(
    slug,
    `mine-${Math.random().toString(36).slice(2, 6)}`,
    registeredUser.token,
  );
  await commentsApi.assertSuccessResponseCode(cRes);
  const commentId = (await cRes.json())?.comment?.id;

  const delRes = await commentsApi.deleteComment(slug, commentId, registeredUser.token);
  await commentsApi.assertSuccessResponseCode(delRes);

  const listRes = await commentsApi.getComments(slug, registeredUser.token);
  await commentsApi.assertSuccessResponseCode(listRes);
  await commentsApi.assertCommentsListNotContainsId(listRes, commentId);
});
