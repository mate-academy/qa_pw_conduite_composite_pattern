import { test } from '../_fixtures/fixtures';
import { CommentsApi } from '../../src/api/resources/CommentsApi';
import { ArticlesApi } from '../../src/api/resources/ArticlesApi';

test.use({ usersNumber: 2 });

test(`Create new comment to the article created by another user`, async ({
  registeredUsers,
  userRequests,
}) => {
  const userA = registeredUsers[0];      // article owner
  const userBRequest = userRequests[1];  // commenter

  // Create article as user A
  const articlesApiForA = new ArticlesApi(userRequests[0]);
  const article = {
    title: `t-${Date.now()}`,
    description: 'desc',
    body: 'body',
    tagList: [],
  };
  const createArticleRes = await articlesApiForA.createArticle(article, userA.token);
  await articlesApiForA.assertSuccessResponseCode(createArticleRes);
  const slug = (await createArticleRes.json()).article.slug;

  // Comment as user B
  const commentsApiForB = new CommentsApi(userBRequest);
  const body = `Nice post ${Math.random().toString(36).slice(2, 8)}`;
  const createCommentRes = await commentsApiForB.createComment(slug, body, registeredUsers[1].token);
  await commentsApiForB.assertSuccessResponseCode(createCommentRes);
  await commentsApiForB.assertCommentBodyEquals(createCommentRes, body);

  // Verify in list
  const commentId = (await createCommentRes.json())?.comment?.id;
  const listRes = await commentsApiForB.getComments(slug, registeredUsers[1].token);
  await commentsApiForB.assertSuccessResponseCode(listRes);
  await commentsApiForB.assertCommentsListContainsId(listRes, commentId);
});
