export const ROOT = 'api';

export const ROUTES = {
  user: `${ROOT}/user`,
  users: {
    index: `${ROOT}/users`,
    login: `${ROOT}/users/login`,
  },
  profiles: username => ({
    index: `${ROOT}/profiles/${username}`,
    follow: `${ROOT}/profiles/${username}/follow`,
  }),
  articles: (slug = null) => ({
    index: `${ROOT}/articles`,
    single: `${ROOT}/articles/${slug}`,
    favorite: `${ROOT}/articles/${slug}/favorite`,
  }),
  comments: slug => ({
    index: `${ROOT}/articles/${slug}/comments`,
    single: commentId => `${ROOT}/articles/${slug}/comments/${commentId}`,
  }),
};
