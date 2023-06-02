const prefix = 'ID_';

class Dispatcher {
  #callbacks;

  #isDispatching;

  #isHandled;

  #isPending;

  #lastID;

  pendingPayload: any;

  constructor() {
    this.#callbacks = {};
    this.#isDispatching = false;
    this.#isHandled = {};
    this.#isPending = {};
    this.#lastID = 1;
  }

  register(callback: any) {
    const id = prefix + this.#lastID++;
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    this.#callbacks[id] = callback;
    return id;
  }

  dispatch(payload: any) {
    this.#startDispatching(payload);
    try {
      for (let id in this.#callbacks) {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (this.#isPending[id]) {
          continue;
        }
        this.#invokeCallback(id);
      }
    } finally {
      this.#stopDispatching();
    }
  }

  #invokeCallback(id: any) {
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    this.#isPending[id] = true;
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    this.#callbacks[id](this.pendingPayload);
    // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    this.#isHandled[id] = true;
  }

  #startDispatching(payload: any) {
    for (let id in this.#callbacks) {
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      this.#isPending[id] = false;
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
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
