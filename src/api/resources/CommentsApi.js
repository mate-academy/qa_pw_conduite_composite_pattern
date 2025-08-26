import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class CommentsApi extends BaseApi {
  constructor(client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };
  }

  async getComments(slug, token = null) {
    return await this.step(`Get comments for article ${slug}`, async () => {
      return await this.client.get(ROUTES.comments(slug).index, {
        headers: {
          authorization: token ? `Token ${token}` : undefined,
          ...this._headers,
        },
      });
    });
  }

  async createComment(slug, body, token = null) {
    return await this.step(`Create new comment`, async () => {
      return await this.client.post(ROUTES.comments(slug).index, {
        data: { comment: { body } },
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }

  async deleteComment(slug, commentId, token = null) {
    return await this.step(`Delete comment`, async () => {
      return await this.client.delete(ROUTES.comments(slug, commentId).delete, {
        headers: {
          authorization: `Token ${token}`,
          ...this._headers,
        },
      });
    });
  }
}
