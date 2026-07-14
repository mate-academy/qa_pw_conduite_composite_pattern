import {test} from '../../_fixtures/fixtures';

test(`Create new comment without auth token`, async ({
  registeredUser,
  api,
  articleWithoutTags,   
}) => {
  const article = articleWithoutTags;

  const response = await api.createArticle(
    article,
    registeredUser.token,
  );

  await api.assertSuccessResponseCode(response);

  const comment = {
    body: 'This is a comment',
  };

  const commentResponse = await api.comments.createComment(
    (await response.json()).article.slug,
    comment,
    null,
  );

  await api.comments.assertUnauthorizedResponseCode(commentResponse);
});