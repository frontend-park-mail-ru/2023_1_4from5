// это все не сделано
export default class Request {
    #REQUEST_REQUEST_METHODS = {
        GET: 'GET',
        POST: 'POST',
    };

    async get(path) {
        const res = await fetch (path, {
            method: this.#REQUEST_REQUEST_METHODS.GET,
            mode: 'cors',
            credentials: 'include',
        })
        return res;
    }

    async post(path, body) {
        const res = await fetch (path, {
            method: this.#REQUEST_REQUEST_METHODS.POST,
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        return res;
    }
}
