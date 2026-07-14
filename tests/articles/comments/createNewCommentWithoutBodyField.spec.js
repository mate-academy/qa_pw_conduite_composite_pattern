import {test} from '../../_fixtures/fixtures';

test(`Create new comment without body field`, async ({
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

  const comment = {};

  const commentResponse = await api.comments.createComment(
    (await response.json()).article.slug,
    comment,
    registeredUser.token,
  );

  await api.comments.assertSuccessResponseCode(commentResponse);
});