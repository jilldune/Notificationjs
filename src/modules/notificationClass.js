import { Queue, merge } from "./helpers";

export class Notification {
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