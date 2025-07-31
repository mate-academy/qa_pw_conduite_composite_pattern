import { expect } from "allure-playwright";
import { BaseApi } from "../BaseApi";

export class CommentsApi extends BaseApi {
  _endpoint = (slug) => `api/articles/${slug}/comments`;
  constructor(client) {
    super(client);
    this._headers = { 'content-type': 'application/json' };
  }

  async getComments(articleSlug, token = null) {
    return await this.client.get(
      this._endpoint(articleSlug),
      {
        headers: {
          ...this._headers,
          authorization: `Token ${token}`,
        },
      },
    );
  }

  async createComment(articleSlug, comment, token = null) {
    return await this.client.post(
      this._endpoint(articleSlug),
      {
        headers: {
          ...this._headers,
          authorization: `Token ${token}`,
        },
        
        data: {
          comment : {
            body: comment,
          }
      }}
    );
  }

  async deleteComment(articleSlug, commentId, token = null) {
    return await this.client.delete(
      this._endpoint(articleSlug) + `/${commentId}`,
      {
        headers: {
          ...this._headers,
          authorization: `Token ${token}`,
        },
      }
    );
  }
}