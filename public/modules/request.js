// это все не сделано
export default class Request {
    #REQUEST_REQUEST_METHODS = {
        GET: 'GET',
        POST: 'POST',
    };

    get(path) {
        console.log('get request');
        let res;
        fetch(path, {
            method: this.#REQUEST_REQUEST_METHODS.GET,
            mode: 'cors',
            credentials: 'include',
        })
            .then((response) => {
                res = response;
            });
        return res;
    }

    post(path, body) {
        let res;
        fetch(path, {
            method: this.#REQUEST_REQUEST_METHODS.POST,
            mode: 'cors',
            credentials: 'incude',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ body }),
        })
            .then((response) => {
                res = response;
            });
        return res;
    }
}
