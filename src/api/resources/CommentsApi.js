import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';


export class CommentsApi extends BaseApi {

  constructor (client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };

  }

  async getComments(slug, token = null) {
    return await this.step(`Get comments for article`, async () => {
      return await this.client.get(ROUTES.comments(slug).index, {
        headers: {
          ...this._headers,
          ...(token ? { authorization: `Token ${token}` } : {}),
        },
      });
    });
  }

  async createComment(comment, slug, token = null) {
    return await this.step('Create a new comment', async () => {
      return await this.client.post(ROUTES.comments(slug).create, {
          data: {
            ...(comment ? { comment: { body: comment } } : {}),
          },
          headers: {
            ...this._headers,
            ...(token ? { authorization: `Token ${token}` } : {}),
        },
      });

    });
  }

  async deleteComment(commentResponse, slug, token = null) {
    return await this.step('Delete a new comment', async () => {
      const id = await this.getCommentId(commentResponse);
      return await this.client.delete(
        ROUTES.comments(slug, id).delete
        , {
        headers: {
          ...this._headers,
          ...(token ? { authorization: `Token ${token}` } : {}),
        },
      });
    });
  }

  createCommentData(comment) {
    return {
      comment: {
        body: comment
      }
    };
  }

  async getCommentId(responseComment) {
    return (await this.parseBody(responseComment)).comment.id;
  }

}
