import { expect } from '@playwright/test';
import { BaseApi } from '../BaseApi';
import { ROUTES } from '../../constants/apiRoutes';

export class CommentsApi extends BaseApi {
  constructor(client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };
  }

  async createComment(slug, commentBody, token = null) {
    return await this.step(`Create new comment for article: ${slug}`, async () => {
      const headers = { ...this._headers };
      if (token !== null) {
        headers.authorization = `Token ${token}`;
      }
      return await this.client.post(ROUTES.articles(slug).comments, {
        data: commentBody !== null ? { comment: commentBody } : undefined,
        headers,
      });
    });
  }

  async deleteComment(slug, commentId, token = null) {
    return await this.step(`Delete comment ${commentId} for article: ${slug}`, async () => {
      const headers = { ...this._headers };
      if (token !== null) {
        headers.authorization = `Token ${token}`;
      }
      return await this.client.delete(ROUTES.articles(slug).singleComment(commentId), {
        headers,
      });
    });
  }

  async parseCommentIdFromResponse(response) {
    const body = await this.parseBody(response);
    return body.comment.id;
  }

  async assertCommentBodyHasCorrectValue(response, expectedBody) {
    await this.step(`Assert response body has correct comment body`, async () => {
      const body = await this.parseBody(response);
      expect(body.comment.body).toBe(expectedBody);
    });
  }

  async assertCommentAuthorHasCorrectValue(response, expectedUsername) {
    await this.step(`Assert response body has correct comment author username`, async () => {
      const body = await this.parseBody(response);
      expect(body.comment.author.username).toBe(expectedUsername);
    });
  }
}
