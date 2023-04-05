// TODO invariant
// TODO export object
// TODO delete unregister
// TODO waitfor
// TODO isDispatching()

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

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */
  register(callback) {
    const id = prefix + this.#lastID++;
    this.#callbacks[id] = callback;
    return id;
  }

  /**
   * Removes a callback based on its token.
   */
  // unregister(id) {
  //   invariant(
  //     this._callbacks[id],
  //     'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
  //     id,
  //   );
  //   delete this.#callbacks[id];
  // }

  // TODO попробовать воспользоваться им в async start (actions)
  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */
  // waitFor(ids) {
  //   invariant(
  //     this._isDispatching,
  //     'Dispatcher.waitFor(...): Must be invoked while dispatching.',
  //   );
  //   for (var ii = 0; ii < ids.length; ii++) {
  //     var id = ids[ii];
  //     if (this._isPending[id]) {
  //       invariant(
  //         this._isHandled[id],
  //         'Dispatcher.waitFor(...): Circular dependency detected while ' +
  //         'waiting for `%s`.',
  //         id,
  //       );
  //       continue;
  //     }
  //     invariant(
  //       this._callbacks[id],
  //       'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
  //       id,
  //     );
  //     this._invokeCallback(id);
  //   }
  // }

  /**
   * Dispatches a payload to all registered callbacks.
   */
  dispatch(payload) {
    // invariant(
    //   !this._isDispatching,
    //   'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.',
    // );
    if (this.#isDispatching) {
      console.log('Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.');
    }
    //
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

  /**
   * Is this Dispatcher currently dispatching.
   */
  // isDispatching(): boolean {
  //   return this._isDispatching;
  // }

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */
  #invokeCallback(id) {
    this.#isPending[id] = true;
    this.#callbacks[id](this.pendingPayload);
    this.#isHandled[id] = true;
  }

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */
  #startDispatching(payload) {
    for (let id in this.#callbacks) {
      this.#isPending[id] = false;
      this.#isHandled[id] = false;
    }
    this.pendingPayload = payload;
    this.#isDispatching = true;
  }

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */
  #stopDispatching() {
    delete this.pendingPayload;
    this.#isDispatching = false;
  }
}

export const dispatcher = new Dispatcher();
