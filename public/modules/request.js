const WEB_URL = 'https://sub-me.ru';

export class Request {
  #REQUEST_METHODS = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
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

  async getHeader(path) {
    const get = await fetch(WEB_URL + path, {
      method: this.#REQUEST_METHODS.GET,
      mode: 'cors',
      credentials: 'include',
    });
    const header = [...get.headers.entries()];
    let token;
    for (const title in header) {
      if (header[title][0] === 'x-csrf-token') {
        token = header[title][1];
      }
    }
    return token;
  }

  /**
   * post request
   * @param {string} path - end-point
   * @param content
   * @param token
   * @param contentType
   *
   * @returns {Promise} - response
   */
  async post(path, content, token, contentType = 'application/json') {
    let body;
    if (contentType === 'multipart/form-data') {
      const boundary = String(Math.random())
        .slice(2);
      const boundaryMiddle = `--${boundary}\r\n`;
      const boundaryLast = `--${boundary}--\r\n`;
      body = ['\r\n'];
      for (let key in content) {
        body.push(`Content-Disposition: form-data; name="${key}"\r\n\r\n${content[key]}\r\n`);
      }
      body = body.join(boundaryMiddle) + boundaryLast;

      contentType = `multipart/form-data; boundary=${boundary}`;
    } else {
      body = JSON.stringify(content);
    }

    const res = await fetch(WEB_URL + path, {
      method: this.#REQUEST_METHODS.POST,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': contentType,
        'X-Csrf-Token': token,
      },
      body,
    });
    return res;
  }

  async putMultipart(path, body, token) {
    const response = await fetch(WEB_URL + path, {
      method: this.#REQUEST_METHODS.PUT,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'x-csrf-token': token,
      },
      body,
    });
    return response;
  }

  async postMultipart(path, body, token) {
    const response = await fetch(WEB_URL + path, {
      method: this.#REQUEST_METHODS.POST,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'x-csrf-token': token,
      },
      body,
    });
    return response;
  }

  async delete(path, token) {
    const res = await fetch(WEB_URL + path, {
      method: this.#REQUEST_METHODS.DELETE,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'X-Csrf-Token': token,
      }
    });
    return res;
  }

  async put(path, body, token) {
    const res = await fetch(WEB_URL + path, {
      method: this.#REQUEST_METHODS.PUT,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Csrf-Token': token,
      },
      body: JSON.stringify(body),
    });
    return res;
  }
}

export const request = new Request();
