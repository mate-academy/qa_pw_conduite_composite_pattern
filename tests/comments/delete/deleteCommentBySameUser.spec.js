import { test } from '../../_fixtures/fixtures';
import { generateNewArticleData } from '../../../src/common/testData/generateNewArticleData';

test(`Delete comment added by the same user`, async ({
  api,
  registeredUser,
}) => {
  const article = generateNewArticleData();
  const articleResponse = await api.createArticle(
    article,
    registeredUser.token,
  );
  await api.assertSuccessResponseCode(articleResponse);
  const slug = await api.articles.parseSlugFromResponse(articleResponse);

  const comment = { body: 'To be deleted' };
  const createCommentResponse = await api.createComment(
    slug,
    comment,
    registeredUser.token,
  );
  await api.comments.assertSuccessResponseCode(createCommentResponse);
  const commentId = await api.comments.parseCommentIdFromResponse(
    createCommentResponse,
  );

  const deleteResponse = await api.deleteComment(
    slug,
    commentId,
    registeredUser.token,
  );

  await api.comments.assertNoContentResponseCode(deleteResponse);
});
