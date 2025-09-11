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
          authorization: token ? `Token ${token}` : undefined,
          ...this._headers,
        },
      });
    });
  }

  async createComment(comment, slug, token = null) {
    return await this.step('Create a new comment', async () => {
      return await this.client.post(ROUTES.comments(slug).create, {
          data: comment ? this.createCommentData(comment) : undefined,
          headers: {
            authorization: token ? `Token ${token}` : undefined,
            ...this._headers,
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
          authorization: token ? `Token ${token}` : undefined,
          ...this._headers,
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
