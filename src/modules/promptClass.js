import { BackDrop, Queue, generateV4UUID, merge } from "./helpers.js";

export default class Prompt {
    defaults = {
        header: 'Prompt', 
        placeHolder: 'enter text', 
        value: '',
        label: null,
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
            label: 'Label',
            checked: false,
            onChange: null
        },
        backdrop: {
            set: true,
            level: 1,
            clickToClose: false
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

    types = ['textarea','text','password','number','tel','email','url'];

    settings = {};
    promptContainer = null;
    queue = undefined;
    isRunning = false;
    backdropClass = null;

    constructor(options) {
        this.queue = new Queue();
        this.settings = this.isObject(options) ? merge(this.defaults, options) : this.defaults;

        this.backdropClass = new BackDrop(this.settings);
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
        if (!this.queue.isEmpty() && !this.isRunning) {
            this.display(this.queue.dequeue());
            this.isRunning = true;
        }
    }

    display(options) {
        this.settings = this.isObject(options) ? merge(this.defaults, {backdrop: this.settings.backdrop}, options) : this.settings;
        let { header, position, value, placeHolder, type, label } = this.settings;
        header = header || this.defaults.header;
        position = position || this.defaults.position;
        value = value || this.defaults.value;
        type = type || this.defaults.type;
        label = label || this.defaults.label;
        placeHolder = placeHolder || this.defaults.placeHolder;

        // backdrop
        this.backdropClass.setOptions(this.settings);
        this.backdropClass.createBackdrop();

        this.checkPosition(position);
        this.resetPrompt();
        this.setContent(header, position, type, value, placeHolder, label);
        this.closePrompt();
    }

    setContent(header, position, type, value, placeHolder, label) {
        let uid = generateV4UUID();        
        this.promptContainer.innerHTML = `
            <div class="prompt-header">
                <p>${header}</p>
                <span class="prompt-close"><i class="${this.closeIcon(position)}"></i></span>
            </div>
            <div class="prompt-body">
                ${label? `<label class="prompt-label" for="${uid}">${typeof label === "string"? label:''}</label>`:''}
                ${
                    this.types.includes(type) && type === 'textarea'?
                        `<textarea class="prompt-input" id="${uid}" placeholder="${placeHolder}" aria-placeholder="${placeHolder}">${value? `${value}`:""}</textarea>`:
                        this.types.includes(type)?
                            `<input class="prompt-input" id="${uid}" type="${type}" ${value? `value="${value}"`:""} placeholder="${placeHolder}" aria-placeholder="${placeHolder}" />`:
                            `<input class="prompt-input" id="${uid}" type="text" ${value? `value="${value}"`:""} placeholder="${placeHolder}" aria-placeholder="${placeHolder}" />`
                }
            </div>
            <div class="prompt-footer">
                ${this.createCheckBox()}
                ${this.setButtons()}
            </div>
        `;
        this.bindButtonEvent();
        this.checkAutoClose();
        this.promptContainer.classList.add(position);
        setTimeout(() =>{
            this.backdropClass.toggleBackdrop();
            this.promptContainer.classList.add('show')
        }, 200);
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

    bindCheckboxEvent() {
        const { checkbox } = this.settings;
        if (checkbox && this.isObject(checkbox)) {
            const { onChange, set } = checkbox;
            if (set) {
                if (onChange && typeof onChange === "function") {
                    this.promptContainer.querySelector('.prompt-checker label input[type="checkbox"]')
                    .addEventListener('change',(event)=>{
                        onChange(event.target.checked);
                    });
                }
            }
        }
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
        const { button, final, actions, checkbox } = this.settings;
        const buttons = Array.isArray(button) ? button : [];
        const callbacks = Array.isArray(actions) ? actions : [];
        const finalFn = typeof final === 'function' ? final : null;

        // bind checkbox event if set
        this.bindCheckboxEvent();

        // create and buttons and add listeners
        if (buttons.length) {
            const btnElements = [...this.promptContainer.querySelectorAll('.prompt-footer button')];
            let input = this.promptContainer.querySelector('.prompt-input');
            let checkInput = null;
            
            btnElements.forEach((btn, i) => {
                btn.addEventListener('click', (evt) => {
                    evt.preventDefault();
                    if (callbacks[i]) {

                        // Check if checkbox is set
                        if (checkbox.set) {
                            checkInput = this.promptContainer.querySelector('.prompt-checker label input');
                        }

                        // create an object to be passed to the
                        // callback function
                        const callObj = {
                            input,
                            value: input.value.trim() || null,
                            checked:  checkInput ? checkInput.checked : false
                        };

                        // calling the callback function
                        callbacks[i](callObj);
                    }

                    // displaying the final function if set
                    this.showFinal(finalFn);

                    // resetting the whole process
                    setTimeout(() => {
                        this.resetPrompt();
                        this.backdropClass.toggleBackdrop();
                        this.isRunning = false;
                        checkInput = false;
                        this.run();
                    }, 200);
                }, { once: true });
            });
        }

        // backdrop events
        this.backdropClass.bindBackDropEvent(()=>{
            this.resetNotification();
            this.run();
        });
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
                this.backdropClass.toggleBackdrop();
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
        this.isRunning = false;
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
            this.backdropClass.toggleBackdrop();
            this.run();
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