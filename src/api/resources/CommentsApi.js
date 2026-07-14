import{ BaseApi }from'../BaseApi';

import { ROUTES } from '../../constants/apiRoutes';

export class CommentsApi extends BaseApi {
  constructor(client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };
  }

  async createComment(slug, comment, token = null) {
    return await this.step(`Create new comment`, async () => {
      return await this.client.post(ROUTES.articles(slug).comments, {
        data: { comment },
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async deleteComment(slug, commentId, token = null) {
    return await this.step(`Delete comment`, async () => {
      return await this.client.delete(
        ROUTES.articles(slug).comment(commentId),
        {
          headers: {
            authorization: `Token ${token}`,
            ...this._headers,
          },
        },
      );
    });
  }
}