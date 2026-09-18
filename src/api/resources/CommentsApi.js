import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class CommentsApi extends BaseApi {
  constructor(client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };
  }

  async createComment(slug, comment, token = null) {
    return await this.step(`Create new comment`, async () => {
      const headers = { ...this._headers };

      if (token) {
        headers.authorization = `Token ${token}`;
      }

      return await this.client.post(ROUTES.comments(slug).index, {
        data: { comment },
        headers,
      });
    });
  }

  async deleteComment(slug, commentId, token = null) {
    return await this.step(`Delete comment`, async () => {
      const headers = { ...this._headers };

      if (token) {
        headers.authorization = `Token ${token}`;
      }

      return await this.client.delete(ROUTES.comments(slug, commentId).single, {
        headers,
      });
    });
  }

  async parseCommentIdFromResponse(response) {
    const body = await this.parseBody(response);

    return body.comment.id;
  }
}
