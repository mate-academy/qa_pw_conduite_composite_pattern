import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';


export class CommentsApi extends BaseApi {

  constructor (client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };

  }

  async createComment (comment, article, token = null) {
    return await this.step('Create a new comment', async () => {
      return await this.client.post(ROUTES.comments(article.slug).create, {
          data: this.createCommentData(comment),
          headers: {
            authorization: `Token ${token}`,
            ...this._headers,
        },
      });

    });
  }

  async deleteComment (commentResponse, article, token = null) {
    return await this.step('Delete a new comment', async () => {
      const id = await this.getCommentId(commentResponse);
      return await this.client.delete(
        ROUTES.comments(article.slug, id).delete
        , {
        headers: {
          authorization: `Token ${token}`,
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
