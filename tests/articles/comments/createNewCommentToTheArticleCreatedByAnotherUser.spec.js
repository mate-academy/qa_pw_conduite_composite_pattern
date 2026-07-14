import {test} from '../../_fixtures/fixtures';

test(`Create new comment to the article created by another user`, async ({
  registeredUser,
  api,
  articleWithoutTags,
}) => {
  const article = articleWithoutTags;

  const response = await api.articles.createArticle(
    article,
    registeredUser.token,
  );

  await api.articles.assertSuccessResponseCode(response);

  const comment = {
    body: 'This is a comment',
  };

  const commentResponse = await api.comments.createComment(
    (await response.json()).article.slug,
    comment,
    registeredUser.token,
  );

  await api.comments.assertSuccessResponseCode(commentResponse);
});