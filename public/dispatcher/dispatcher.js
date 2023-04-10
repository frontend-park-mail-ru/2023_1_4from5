const prefix = 'ID_';

class Dispatcher {
  #callbacks;

  #isDispatching;

  #isHandled;

  #isPending;

  #lastID;

  pendingPayload;

  constructor() {
    this.#callbacks = {};
    this.#isDispatching = false;
    this.#isHandled = {};
    this.#isPending = {};
    this.#lastID = 1;
  }

  register(callback) {
    const id = prefix + this.#lastID++;
    this.#callbacks[id] = callback;
    return id;
  }

  dispatch(payload) {
    this.#startDispatching(payload);
    try {
      for (let id in this.#callbacks) {
        if (this.#isPending[id]) {
          continue;
        }
        this.#invokeCallback(id);
      }
    } finally {
      this.#stopDispatching();
    }
  }

  #invokeCallback(id) {
    this.#isPending[id] = true;
    this.#callbacks[id](this.pendingPayload);
    this.#isHandled[id] = true;
  }

  #startDispatching(payload) {
    for (let id in this.#callbacks) {
      this.#isPending[id] = false;
      this.#isHandled[id] = false;
    }
    this.pendingPayload = payload;
    this.#isDispatching = true;
  }

  #stopDispatching() {
    delete this.pendingPayload;
    this.#isDispatching = false;
  }
}

export const dispatcher = new Dispatcher();
