import { test } from '../_fixtures/fixtures';
import { CommentsApi } from '../../src/api/resources/CommentsApi';
import { ArticlesApi } from '../../src/api/resources/ArticlesApi';

test.use({ usersNumber: 2 });

test(`Delete comment added by the another user`, async ({
  registeredUsers,
  userRequests,
}) => {
  const userA = registeredUsers[0];
  const userB = registeredUsers[1];

  // A creates article
  const articlesApiA = new ArticlesApi(userRequests[0]);
  const aRes = await articlesApiA.createArticle(
    { title: `t-${Date.now()}`, description: 'd', body: 'b', tagList: [] },
    userA.token,
  );
  await articlesApiA.assertSuccessResponseCode(aRes);
  const slug = (await aRes.json()).article.slug;

  // B comments
  const commentsApiB = new CommentsApi(userRequests[1]);
  const cRes = await commentsApiB.createComment(
    slug,
    `byB-${Math.random().toString(36).slice(2, 6)}`,
    userB.token,
  );
  await commentsApiB.assertSuccessResponseCode(cRes);
  const commentId = (await cRes.json())?.comment?.id;

  // A tries to delete B's comment
  const commentsApiA = new CommentsApi(userRequests[0]);
  const delRes = await commentsApiA.deleteComment(slug, commentId, userA.token);
  await commentsApiA.assertForbiddenOrUnauthorizedResponseCode(delRes);
});
