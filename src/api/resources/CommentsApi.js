export class CommentsApi {
  constructor(request, baseUrl) {
    this.request = request;
    this.baseUrl = baseUrl;
  }

  async createComment(slug, body, token) {
    return await this.request.post(
      `${this.baseUrl}/articles/${slug}/comments`,
      {
        headers: token ? { Authorization: `Token ${token}` } : {},
        data: { comment: { body } },
      },
    );
  }

  async getComments(slug, token) {
    return await this.request.get(`${this.baseUrl}/articles/${slug}/comments`, {
      headers: token ? { Authorization: `Token ${token}` } : {},
    });
  }

  async deleteComment(slug, id, token) {
    return await this.request.delete(
      `${this.baseUrl}/articles/${slug}/comments/${id}`,
      {
        headers: token ? { Authorization: `Token ${token}` } : {},
      },
    );
  }
}
