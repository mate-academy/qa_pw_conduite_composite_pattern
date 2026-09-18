import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test.use({ usersNumber: 2 });

test(`Create new comment to the article created by another user`, async ({
  api,
  registeredUsers,
}) => {
  const article = generateNewArticleData();
  const articleResponse = await api.createArticle(
    article,
    registeredUsers[0].token,
  );
  await api.assertSuccessResponseCode(articleResponse);
  const slug = await api.articles.parseSlugFromResponse(articleResponse);

  const comment = { body: 'Great article!' };
  const response = await api.createComment(
    slug,
    comment,
    registeredUsers[1].token,
  );

  await api.comments.assertSuccessResponseCode(response);
});
