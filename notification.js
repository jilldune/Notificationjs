(function (global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        global = global || self;
        global.Notificationjs = factory();
    }
}(this, function () {
    'use strict';

    class Queue {
        items = [];

        enqueue(element) {
            this.items.push(element);
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

    const merge = (...objects) => {
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

    class Notification {
        defaults = {
            header: 'Notification', 
            body: 'This is a notification body', 
            button: null, 
            actions: null, 
            onClose: null, 
            position: 'bottom-right', 
            autoClose: true, 
            duration: 3500, 
            final: null, 
            checkbox: { 
                set: false,
                label: 'Default',
                checked: false
            }
        };

        arrowIcons = {
            'top-right': 'ri-arrow-right-line',
            'right-center': 'ri-arrow-right-line',
            'bottom-right': 'ri-arrow-right-line',
            'top-left': 'ri-arrow-left-line',
            'left-center': 'ri-arrow-left-line',
            'bottom-left': 'ri-arrow-left-line',
            'bottom-center': 'ri-close-line',
            'top-center': 'ri-close-line',
            'center': 'ri-close-line',
        };

        positionsArray = [
            'top-right', 'right-center',
            'bottom-right', 'top-left',
            'left-center', 'bottom-left',
            'bottom-center', 'top-center',
            'center'
        ];

        settings = {};
        notificationContainer = null;
        queue = undefined;
        isRunning = false;

        constructor(options) {
            this.queue = new Queue();
            this.settings = this.isObject(options) ? merge(this.defaults, options) : this.defaults;
            this.createContainer();
        }

        createContainer() {
            const notificationContainer = document.createElement('div');
            notificationContainer.classList.add('notification');
            const scripts = document.body.querySelectorAll('script');
            if (scripts) {
                document.body.insertBefore(notificationContainer, scripts[0]);
            } else {
                document.body.append(notificationContainer);
            }
            this.notificationContainer = notificationContainer;
        }

        notification = (options) => {
            this.queue.enqueue(options);
            this.run();
        }

        run() {
            if (this.queue.peek() && !this.isRunning) {
                this.display(this.queue.dequeue());
                this.isRunning = true;
            }
        }

        display(options) {
            this.settings = this.isObject(options) ? merge(this.defaults, options) : this.settings;
            let { header, body, position } = this.settings;
            header = header || this.defaults.header;
            body = body || this.defaults.body;
            position = position || this.defaults.position;

            this.checkPosition(position);
            this.resetNotification();
            this.setContent(header, body, position);
            this.closeNotification();
        }

        setContent(header, body, position) {
            this.notificationContainer.innerHTML = `
                <div class="notification-header">
                    <p>${header}</p>
                    <span class="notification-close"><i class="${this.closeIcon(position)}"></i></span>
                </div>
                <div class="notification-body">
                    <p>${body}</p>
                </div>
                <div class="notification-footer">
                    ${this.createCheckBox()}
                    ${this.setButtons()}
                </div>
            `;
            this.bindButtonEvent();
            this.checkAutoClose();
            this.notificationContainer.classList.add(position);
            setTimeout(() => this.notificationContainer.classList.add('show'), 200);
        }

        createCheckBox() {
            const { checkbox } = this.settings;
            if (checkbox && this.isObject(checkbox)) {
                const { label, checked, set } = checkbox;
                if (set) {
                    return `
                        <div class="notification-checker">
                            <label>
                                <input type="checkbox" ${checked ? 'checked' : ''}>
                                <span>${label || 'Checkbox'}</span>
                            </label>
                        </div>
                    `;
                }
            }
            return '';
        }

        setButtons() {
            const { button } = this.settings;
            if (Array.isArray(button) && button.length) {
                return `
                    <div class="notification-buttons">
                        ${button.map(btnTxt => `<button type="button">${btnTxt || 'button'}</button>`).join('')}
                    </div>
                `;
            }
            return '';
        }

        showFinal(final) {
            if (final) final();
        }

        bindButtonEvent() {
            const { button, final, actions } = this.settings;
            const buttons = Array.isArray(button) ? button : [];
            const callbacks = Array.isArray(actions) ? actions : [];
            const finalFn = typeof final === 'function' ? final : null;

            if (buttons.length) {
                const btnElements = [...this.notificationContainer.querySelectorAll('.notification-footer button')];
                btnElements.forEach((btn, i) => {
                    btn.addEventListener('click', (evt) => {
                        evt.preventDefault();
                        if (callbacks[i]) callbacks[i]();
                        this.showFinal(finalFn);
                        setTimeout(() => {
                            this.resetNotification();
                            this.isRunning = false;
                            this.run();
                        }, 200);
                    }, { once: true });
                });
            }
        }

        checkAutoClose() {
            const { autoClose, final, onClose, duration } = this.settings;
            const finalFn = typeof final === 'function' ? final : this.defaults.final;
            const autoCloseEnabled = typeof autoClose === 'boolean' ? autoClose : this.defaults.autoClose;
            const onCloseFn = typeof onClose === 'function' ? onClose : this.defaults.onClose;
            const durationMs = typeof duration === 'number' ? duration : this.defaults.duration;

            if (autoCloseEnabled) {
                setTimeout(() => {
                    this.resetNotification();
                    if (onCloseFn) onCloseFn();
                    this.showFinal(finalFn);
                    this.isRunning = false;
                    this.run();
                }, durationMs);
            }
        }

        resetNotification() {
            this.clearPosition();
            this.notificationContainer.classList.remove('show');
            this.notificationContainer.innerHTML = '';
        }

        closeNotification() {
            const { final, onClose } = this.settings;
            const finalFn = typeof final === 'function' ? final : this.defaults.final;
            const onCloseFn = typeof onClose === 'function' ? onClose : this.defaults.onClose;
            const closeBtn = this.notificationContainer.querySelector('.notification-close');

            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (onCloseFn) onCloseFn();
                this.showFinal(finalFn);
                this.resetNotification();
            });
        }

        clearPosition() {
            this.positionsArray.forEach(position => {
                this.notificationContainer.classList.remove(position);
            });
        }

        closeIcon(position) {
            return this.arrowIcons[position];
        }

        checkPosition(position) {
            if (!this.positionsArray.includes(position)) {
                console.error(`Invalid position: '${position}' is NOT a valid position.`);
            }
        }

        isObject(obj) {
            return obj && typeof obj === "object" && !Array.isArray(obj);
        }
    }

    class Prompt {
        defaults = {
            header: 'Prompt', 
            placeHolder: 'enter text', 
            value: '', 
            type: 'text', 
            button: null, 
            actions: null, 
            onClose: null, 
            position: 'bottom-right', 
            autoClose: true, 
            duration: 3500, 
            final: null, 
            checkbox: { 
                set: false,
                label: 'Default',
                checked: false
            }
        };

        arrowIcons = {
            'top-right': 'ri-arrow-right-line',
            'right-center': 'ri-arrow-right-line',
            'bottom-right': 'ri-arrow-right-line',
            'top-left': 'ri-arrow-left-line',
            'left-center': 'ri-arrow-left-line',
            'bottom-left': 'ri-arrow-left-line',
            'bottom-center': 'ri-close-line',
            'top-center': 'ri-close-line',
            'center': 'ri-close-line',
        };

        positionsArray = [
            'top-right', 'right-center',
            'bottom-right', 'top-left',
            'left-center', 'bottom-left',
            'bottom-center', 'top-center',
            'center'
        ];

        settings = {};
        promptContainer = null;
        queue = undefined;
        isRunning = false;

        constructor(options) {
            this.queue = new Queue();
            this.settings = this.isObject(options) ? merge(this.defaults, options) : this.defaults;
            this.createContainer();
        }

        createContainer() {
            const promptContainer = document.createElement('div');
            promptContainer.classList.add('prompt');
            const scripts = document.body.querySelectorAll('script');
            if (scripts) {
                document.body.insertBefore(promptContainer, scripts[0]);
            } else {
                document.body.append(promptContainer);
            }
            this.promptContainer = promptContainer;
        }

        prompt = (options) => {
            this.queue.enqueue(options);
            this.run();
        }

        run() {
            if (this.queue.peek() && !this.isRunning) {
                this.display(this.queue.dequeue());
                this.isRunning = true;
            }
        }

        display(options) {
            this.settings = this.isObject(options) ? merge(this.defaults, options) : this.settings;
            let { header, position, value, placeHolder } = this.settings;
            header = header || this.defaults.header;
            position = position || this.defaults.position;
            value = value || this.defaults.value;
            placeHolder = placeHolder || this.defaults.placeHolder;

            this.checkPosition(position);
            this.resetPrompt();
            this.setContent(header, position, value, placeHolder);
            this.closePrompt();
        }

        setContent(header, position, value, placeHolder) {
            this.promptContainer.innerHTML = `
                <div class="prompt-header">
                    <p>${header}</p>
                    <span class="prompt-close"><i class="${this.closeIcon(position)}"></i></span>
                </div>
                <div class="prompt-body">
                    <input class="prompt-input" type="text" value="${value}" placeholder="${placeHolder}" />
                </div>
                <div class="prompt-footer">
                    ${this.createCheckBox()}
                    ${this.setButtons()}
                </div>
            `;
            this.bindButtonEvent();
            this.checkAutoClose();
            this.promptContainer.classList.add(position);
            setTimeout(() => this.promptContainer.classList.add('show'), 200);
        }

        createCheckBox() {
            const { checkbox } = this.settings;
            if (checkbox && this.isObject(checkbox)) {
                const { label, checked, set } = checkbox;
                if (set) {
                    return `
                        <div class="prompt-checker">
                            <label>
                                <input type="checkbox" ${checked ? 'checked' : ''}>
                                <span>${label || 'Checkbox'}</span>
                            </label>
                        </div>
                    `;
                }
            }
            return '';
        }

        setButtons() {
            const { button } = this.settings;
            if (Array.isArray(button) && button.length) {
                return `
                    <div class="prompt-buttons">
                        ${button.map(btnTxt => `<button type="button">${btnTxt || 'button'}</button>`).join('')}
                    </div>
                `;
            }
            return '';
        }

        showFinal(final) {
            if (final) final();
        }

        bindButtonEvent() {
            const { button, final, actions } = this.settings;
            const buttons = Array.isArray(button) ? button : [];
            const callbacks = Array.isArray(actions) ? actions : [];
            const finalFn = typeof final === 'function' ? final : null;

            if (buttons.length) {
                const btnElements = [...this.promptContainer.querySelectorAll('.prompt-footer button')];
                btnElements.forEach((btn, i) => {
                    btn.addEventListener('click', (evt) => {
                        evt.preventDefault();
                        if (callbacks[i]) callbacks[i]();
                        this.showFinal(finalFn);
                        setTimeout(() => {
                            this.resetPrompt();
                            this.isRunning = false;
                            this.run();
                        }, 200);
                    }, { once: true });
                });
            }
        }

        checkAutoClose() {
            const { autoClose, final, onClose, duration } = this.settings;
            const finalFn = typeof final === 'function' ? final : this.defaults.final;
            const autoCloseEnabled = typeof autoClose === 'boolean' ? autoClose : this.defaults.autoClose;
            const onCloseFn = typeof onClose === 'function' ? onClose : this.defaults.onClose;
            const durationMs = typeof duration === 'number' ? duration : this.defaults.duration;

            if (autoCloseEnabled) {
                setTimeout(() => {
                    this.resetPrompt();
                    if (onCloseFn) onCloseFn();
                    this.showFinal(finalFn);
                    this.isRunning = false;
                    this.run();
                }, durationMs);
            }
        }

        resetPrompt() {
            this.clearPosition();
            this.promptContainer.classList.remove('show');
            this.promptContainer.innerHTML = '';
        }

        closePrompt() {
            const { final, onClose } = this.settings;
            const finalFn = typeof final === 'function' ? final : this.defaults.final;
            const onCloseFn = typeof onClose === 'function' ? onClose : this.defaults.onClose;
            const closeBtn = this.promptContainer.querySelector('.prompt-close');

            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (onCloseFn) onCloseFn();
                this.showFinal(finalFn);
                this.resetPrompt();
            });
        }

        clearPosition() {
            this.positionsArray.forEach(position => {
                this.promptContainer.classList.remove(position);
            });
        }

        closeIcon(position) {
            return this.arrowIcons[position];
        }

        checkPosition(position) {
            if (!this.positionsArray.includes(position)) {
                console.error(`Invalid position: '${position}' is NOT a valid position.`);
            }
        }

        isObject(obj) {
            return obj && typeof obj === "object" && !Array.isArray(obj);
        }
    }

    return {
        Notification,
        Prompt,
        Queue
    };
}));
