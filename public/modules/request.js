// это все не сделано
export class Request {
    #REQUEST_REQUEST_METHODS = {
        GET: 'GET',
        POST: 'POST',
    }

    url = 'http://sub-me.ru:8000/'

    get(path) {
        let res;
        fetch (url + path, {
            method: this.#REQUEST_REQUEST_METHODS.GET,
            mode: 'cors',
            credentials: 'include',
        })
        .then((response) => {
            res = response;
        })
        return res;
    }

    post(path, body) {
        let res
        fetch (url + path, {
            method: this.#REQUEST_REQUEST_METHODS.POST,
            mode: 'cors',
            credentials: 'incude',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({body}),
        })
        .then((response) => {
            res = response;
        })
        return res;
    }
}