import { test } from '../_fixtures/fixtures';
import { CommentsApi } from '../../src/api/resources/CommentsApi';
import { ArticlesApi } from '../../src/api/resources/ArticlesApi';

test.use({ usersNumber: 1 });

test(`Create new comment without body field`, async ({
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
  const res = await commentsApi.createCommentPayload(slug, { comment: {} }, registeredUser.token);
  await commentsApi.assertUnprocessableEntityResponseCode(res);
});
