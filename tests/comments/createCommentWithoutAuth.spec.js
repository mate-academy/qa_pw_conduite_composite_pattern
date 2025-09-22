import { test } from '../_fixtures/fixtures';
import { CommentsApi } from '../../src/api/resources/CommentsApi';
import { ArticlesApi } from '../../src/api/resources/ArticlesApi';

test.use({ usersNumber: 1 });

test(`Create new comment without auth token`, async ({
  registeredUser,
  userRequests,
  request,
}) => {
  const articlesApi = new ArticlesApi(userRequests[0]);
  const createArticleRes = await articlesApi.createArticle(
    { title: `t-${Date.now()}`, description: 'd', body: 'b', tagList: [] },
    registeredUser.token,
  );
  await articlesApi.assertSuccessResponseCode(createArticleRes);
  const slug = (await createArticleRes.json()).article.slug;

  const anonComments = new CommentsApi(request);
  const res = await anonComments.createComment(slug, 'should fail', null);
  await anonComments.assertForbiddenOrUnauthorizedResponseCode(res);
});
