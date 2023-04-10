const WEB_URL = 'http://sub-me.ru';

export class Request {
  #REQUEST_METHODS = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
    PATCH: 'PATCH',
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
   * @param content
   * @param contentType
   *
   * @returns {Promise} - response
   */
  async post(path, content, contentType = 'application/json') {
    let body;
    if (contentType === 'multipart/form-data') {
      const boundary = String(Math.random()).slice(2);
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
      },
      body,
    });
    return res;
  }

  async postMultipart(path, body) {
    const response = await fetch(WEB_URL + path, {
      method: this.#REQUEST_METHODS.PUT,
      mode: 'cors',
      credentials: 'include',
      body,
    });
    return response;
  }

  async delete(path) {
    const res = await fetch(WEB_URL + path, {
      method: this.#REQUEST_METHODS.DELETE,
      mode: 'cors',
      credentials: 'include',
    });
    return res;
  }

  async put(path, body) {
    const res = await fetch(WEB_URL + path, {
      method: this.#REQUEST_METHODS.PUT,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res;
  }

  async patch(path, body) {
    const res = await fetch(WEB_URL + path, {
      method: this.#REQUEST_METHODS.PATCH,
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res;
  }
}

export const request = new Request();
