export class CommentsApi {
  constructor(client) {
    this.client = client;
  }

  async createComment(slug, comment, token = null) {
    return await this.client.post(`/api/articles/${slug}/comments`, {
      data: { comment },
      headers: token ? { Authorization: `Token ${token}` } : {},
    });
  }

  async deleteComment(slug, commentId, token) {
    return await this.client.delete(
      `/api/articles/${slug}/comments/${commentId}`,
      {
        headers: { Authorization: `Token ${token}` },
      },
    );
  }

  // Metody assert
  async assertSuccessResponseCode(response) {
    if (response.status() !== 200 && response.status() !== 204) {
      throw new Error(`Expected success code but got ${response.status()}`);
    }
  }

  async assertUnauthorizedResponseCode(response) {
    if (response.status() !== 401) {
      throw new Error(`Expected 401 but got ${response.status()}`);
    }
  }

  async assertUnprocessableEntityResponseCode(response) {
    if (response.status() !== 422) {
      throw new Error(`Expected 422 but got ${response.status()}`);
    }
  }

  async assertForbiddenResponseCode(response) {
    if (response.status() !== 403) {
      throw new Error(`Expected 403 but got ${response.status()}`);
    }
  }
}
