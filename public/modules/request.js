// это все не сделано
export class Ajax {
    #AJAX_REQUEST_METHODS = {
        GET: 'GET',
        POST: 'POST',
    }

    url = 'http://sub-me.ru:8000/'

    GET(path) {
        fetch (url + path, {
            method: this.#AJAX_REQUEST_METHODS.GET,
            mode: 'cors',
            credentials: 'include',
        })
    }
}