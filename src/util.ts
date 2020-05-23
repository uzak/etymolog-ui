
class LinkedList {
    private _head: any;

    constructor() {
      this._head = null;
    }

    public head() {
        return this._head;
    }

    public push(val: any) {
      var node = {
        value: val,
        next: null
      };
      if (!this._head) {
        this._head = node;
      } else {
        let current = this._head;
        while (current.next) {
          current = current.next;
        }
        current.next = node;
      }
    }
}

export default LinkedList;