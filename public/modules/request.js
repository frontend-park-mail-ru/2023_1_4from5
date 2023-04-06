const WEB_URL = 'http://sub-me.ru';

export class Request {
  #REQUEST_METHODS = {
    GET: 'GET',
    POST: 'POST',
  };

  /**
   * get request
   * @param {string} path - end-point
   *
   * @returns {Promise} - response
   */
  async get(path) {
    const res = await fetch(WEB_URL + path, {
      method: this.#REQUEST_METHODS.GET,
      mode: 'cors',
      credentials: 'include',
    });
    return res;
  }

  /**
   * post request
   * @param {string} path - end-point
   * @param {Object} body - request body
   *
   * @returns {Promise} - response
   */
  async post(path, content, contentType = 'application/json') {
    let body;
    if (contentType === 'multipart/form-data') {
      body = content;
    } else {
      body = JSON.stringify(content);
    }
    console.log(body);

    const res = await fetch(WEB_URL + path, {
      method: this.#REQUEST_METHODS.POST,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': contentType,
      },
      body,
    });
    return res;
  }
}

export const request = new Request();
