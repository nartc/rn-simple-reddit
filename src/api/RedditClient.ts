export class RedditClient {
  private readonly baseUrl: string;
  private readonly defaultHeaders: { [key: string]: string };

  constructor(token: string) {
    this.baseUrl = 'https://oauth.reddit.com/';
    this.defaultHeaders = {
      'Authorization': `bearer ${ token }`,
    };
  }

  getPosts = (endpoint: string) => this.fetchWithHeaders(this.baseUrl + endpoint);
  getRandom = () => this.fetchWithHeaders(this.baseUrl + '/random');

  private fetchWithHeaders = (url: string) => {
    return fetch(url, { headers: this.defaultHeaders })
      .then(res => res.json());
  };
}
