export class Queue {
    items = [];

    enqueue(element) {
        this.items.push(element);
    }

    appendFirst(element) {
        this.items.unshift(element);
    }

    dequeue() {
        if (this.isEmpty()) return 'Underflow';
        return this.items.shift();
    }

    peek() {
        if (this.isEmpty()) return 'No elements in Queue';
        return this.items[0];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    printQueue() {
        let str = "";
        for (let i = 0; i < this.items.length; i++) {
            str += this.items[i] + " ";
        }
        return str;
    }
}

export class BackDrop {
    defaults = {
        backdrop: {
            set: false,
            level: 1,
            clickToClose: false
        }
    };
    settings = {};
    PREFIX = '-notifjs';
    BACK_DROP_ID = `backdrop${this.PREFIX}`;
    notificationBackdrop = null;
    listenerAdded = false;
    callback = null;

    constructor(options) {
        this.setOptions(options);
    }

    setOptions(options) {
        this.settings = isObject(options) ? merge(this.defaults, options) : this.defaults;
    }

    createBackdrop() {
        let dropSetting = this.settings.backdrop;
        if (!dropSetting.set) return; // return if backdrop is not needed

        let currentDrop = document.getElementById(this.BACK_DROP_ID);// get id from the DOM
        // if id is present
        if (currentDrop) {
            this.removeBackdropBGLevel(currentDrop);
            currentDrop.classList.add(`drop-${dropSetting.level}`);
            this.notificationBackdrop = currentDrop;// save it
            return;
        }

        const notificationBackdrop = document.createElement('div');
        notificationBackdrop.classList.add(`drop-${dropSetting.level}`);
        notificationBackdrop.id = this.BACK_DROP_ID;
        const scripts = document.body.querySelectorAll('script');
        if (scripts) {
            document.body.insertBefore(notificationBackdrop, scripts[0]);
        } else {
            document.body.append(notificationBackdrop);
        }
        this.notificationBackdrop = notificationBackdrop;        
    }

    removeBackdropBGLevel(backdropElem) {
        for (let i = 1; i < 11 ; i++) {
            backdropElem.classList.remove(`drop-${i}`);
        }
    }

    toggleBackdrop() {
        let dropSetting = this.settings.backdrop;        
        if (dropSetting.set) {
            let currentDrop = document.getElementById(this.BACK_DROP_ID);
            if (currentDrop.classList.contains('show')) {
                currentDrop.classList.remove('show');
                this.notificationBackdrop = currentDrop;
                this.removeListener();
            } else {
                currentDrop.classList.add('show');
                this.notificationBackdrop = currentDrop;
            }
        }
    }

    bindBackDropEvent(callback) {
        if (this.listenerAdded) return;

        const {backdrop} = this.settings;
        if (backdrop.set && backdrop.clickToClose) {
            this.callback = callback;
            this.notificationBackdrop.addEventListener('click',this.backdropClick);
            this.listenerAdded = true;
        }
    }

    backdropClick = (e) => {
        e.preventDefault();
        setTimeout(() => {
            if (isFunction(this.callback)) this.callback();                    
            this.toggleBackdrop();
            this.removeListener();
        }, 200);
    }

    removeListener() {
        if (this.listenerAdded)  {
            this.notificationBackdrop.removeEventListener('click', this.backdropClick);
            this.listenerAdded = false;
        }
    }
}

// Merge Object function
export const merge = (...objects) => {
    const isObject = obj => obj && typeof obj === 'object';
    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach(key => {
            const pVal = prev[key];
            const oVal = obj[key];
            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);
            } else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = merge(pVal, oVal);
            } else {
                prev[key] = oVal;
            }
        });
        return prev;
    }, {});
};

export const isObject = (obj) => {
    return obj && typeof obj === "object" && !Array.isArray(obj);
}

export const isFunction = (fn) => {
    return fn && typeof fn === "function";
}

export const generateV4UUID = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,
        c => (
            c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c/4
        ).toString(16)
    );
}