import {test} from '../../_fixtures/fixtures';

test(`Delete comment added by the the same user`, async ({
  registeredUser,
  articlesApi,
  api,
  articleWithoutTags,
}) => {
    
  const article = articleWithoutTags;

  const response = await api.articles.createArticle(article, registeredUser.token);
  await api.articles.assertSuccessResponseCode(response);

    const commentResponse = await api.comments.createComment(
    (await response.json()).article.slug,
    { body: 'This is a comment' },
    registeredUser.token,
  );
  await api.comments.assertSuccessResponseCode(commentResponse);

  const deleteResponse = await api.comments.deleteComment(
    (await response.json()).article.slug,
    (await commentResponse.json()).comment.id,
    registeredUser.token,
  );
  await api.comments.assertNoContentResponseCode(deleteResponse);
});