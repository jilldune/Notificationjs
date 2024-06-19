// Notification class
export default class Notification {
    // Default Settings
    defaults = {
        // The header text, accepts HTML
        header: 'Notification',
        // notification to show, accepts HTML
        body: 'This is a notification body',
        // Array of text to be on button
        button: null,
        // Array of function, Maps the number of buttons
        actions: null,
        // function, fires(if set) when the app closes
        onClose: null,
        // position of the app on page
        position: 'bottom-right',
        // Closes Notification automaticaly if true,based on timer end.
        autoClose: true,
        // timer function, used to set how long app stays visbe onpage.
        // the default duration is used if none is set.
        // @property Number
        // @default  3500
        duration: 3500,
        // callback function, fires anytime the notification is closed.
        final: null,
        // adds a checkbox for a true or a false situation
        checkbox: {
            set: false,
            label: 'Default',
            checked: false
        }
    }
    // close icons set on the notification
    arrowIcons = {
        'top-right': `ri-arrow-right-line`,
        'right-center': `ri-arrow-right-line`,
        'bottom-right': `ri-arrow-right-line`,
        'top-left': `ri-arrow-left-line`,
        'left-center': `ri-arrow-left-line`,
        'bottom-left': `ri-arrow-left-line`,
        'bottom-center': `ri-close-line`,
        'top-center': `ri-close-line`,
        'center': `ri-close-line`,
    }
    // A list of page positions
    positionsArray = [
        'top-right','right-center',
        'bottom-right','top-left',
        'left-center','bottom-left',
        'bottom-center','top-center',
        'center'
    ];
    settings = {};
    notificationContainer = null;
    queue = undefined;
    isRunning = false;

    // Creates an initial settings option used for drawing the notification
    // in case user wants all notification to use the same formating,
    // which saves much time rather than defining terms for all notification drawn
    constructor(options) {
        this.queue = new Queue();
        this.isObject(options) ? this.settings = merge(this.defaults,options) : this.settings = this.defaults;
        this.createContainer();
    }

    createContainer() {
        const notificationContainer = document.createElement('div');
        notificationContainer.classList.add('notification');
        let scripts = document.body.querySelectorAll('script');
        if (scripts) {
            document.body.insertBefore(notificationContainer,scripts[0]);
        } else { document.body.append(notificationContainer); }

        // make the container available to the class
        this.notificationContainer = notificationContainer;
    }

    // Recieves OPtions in case user wants to define individual options for
    // the notification drawer
    notification = (options) => {
        // enque new incoming calls
        this.queue.enqueue(options);
        // the run function to perform the showing of the notification queues
        this.run();
    }

    run() {        
        // check if there is an element in the stack and run
        if (this.queue.peek()) {
            if (! this.isRunning) {
                this.display(this.queue.dequeue());
                this.isRunning = true;
            }
        }
    }

    // Displays the notification
    display(options) {
        // repopulates the settings for the notification
        this.isObject(options) ? this.settings = merge(this.defaults,options) : undefined;
        
        // extracting various terms from the settings
        let {header, body, position} = this.settings;
        header = (typeof header === 'string' && header === '')? this.defaults.header:header;
        body =  (typeof body === 'string' && body === '')? this.defaults.body:body;
        position = (position !== '')? position:this.defaults.position;

        this.checkPosition(position); // call to check position

        this.resetNotifiction();// reset the container

        // Setting up / Populating the notification
        this.setcontent(header, body, position);

        // Check the nofication close
        this.closeNotification();
    }

    // Setting up / Populating the notification
    setcontent(header, body, position) {
        this.notificationContainer.innerHTML = `
            <div class="notification-header">
                <p>${ header }</p>
                <span class="notification-close"><i class="${ this.closeIcon(position) }"></i></span>
            </div>
            <div class="notification-body">
                <p>${ body }</p>
            </div>
            <div class="notification-footer">
                ${ this.createCheckBox() }
                ${ this.setButtons() }
            </div>
        `;
        this.BindButtonEvent();
        this.checkAutoClose();
        this.notificationContainer.classList.add( position );
        setTimeout(() => { this.notificationContainer.classList.add( 'show' ); }, 200);      
    }

    // creates a checbox area
    createCheckBox() {
        const {checkbox} = this.settings;

        if (checkbox && this.isObject(checkbox)) {
            const {label,checked,set} = checkbox;
            if (set && set === true) {
                // Create checks for the properties
                let labeltxt = label && typeof label === 'string'? label : 'Checkbox';
                let lblchecked = checked && typeof checked === 'boolean'? checked : false;

                // create the various parts
                let container = `
                    <div class="notification-checker">
                        <label>
                            <input type="checkbox" ${lblchecked? 'checked':''}>
                            <span>${labeltxt}</span>
                        </label>
                    </div>
                `;

                return container;                
            } else { return ''; }
        } else { return ''; }
    }

    // Checking and setting up the footer
    setButtons() {
        const {button} = this.settings;
        let buttons = Array.isArray(button)? button:null;

        if (buttons && buttons.length >= 1) {
            let btn = '';
            for (let i in buttons) {
                let btnTxt = buttons[i];
                btn += `<button type="button">${btnTxt === ''? 'button':btnTxt}</button>`;
            }
            return `<div class="notification-buttons"> ${ btn } </div>`;
        } else { return ''; }
    }
    
    // Fires the final function when set
    showFinal(final) { if (final) final(); }

    // event Binding function
    BindButtonEvent() {
        const {button,final,actions} = this.settings;
        let buttons = Array.isArray(button)? button:null;
        let callback = Array.isArray(actions)? actions:null;
        let finalFn = typeof final === 'function'? final:null;
        let modalContainer =  this.notificationContainer; 

        if (buttons && buttons.length >= 1) {            
            // All buttons defined
            let cntbuttons = [...modalContainer.querySelectorAll('.notification-footer button')];
            
            // looping through the buttons and ading event listeners
            cntbuttons.forEach((e,i)=>{
                
                // listener function fired when clicked
                e.addEventListener('click', (evt) => {

                    evt.preventDefault(); // Stops the default behaviour of the element

                    // attaching function call when button is clicked
                    if (callback && Array.isArray(callback) && typeof callback[i] === 'function') {
                        let t = setTimeout(() => { callback[i](); clearTimeout(t)}, 10);
                    }
                    
                    this.showFinal(finalFn); // fires the final function

                    // Timer function to clear notiition after click
                    let time = setTimeout(() => {
                        this.resetNotifiction(); // reset notification container
                        this.isRunning = false; // Sets running status off
                        this.run(); // checks if there notifictons in queue
                        clearTimeout(time); // Clears the timer count from memory
                    }, 200);
                    
                },{ once: true });

            });
        }
    }

    // checking auto close
    checkAutoClose() {
        const {autoClose,final,onClose,duration} = this.settings;
        let finalfn = typeof final === 'function'? final : this.defaults.final;
        let autoCls = typeof autoClose === 'boolean'? autoClose : this.defaults.autoClose;
        let onCloseFn = typeof onClose === 'function'? onClose : this.defaults.onClose;
        let durationLen = typeof duration === 'number'? duration : this.defaults.duration;

        if (autoCls) {
            let autoTimer = setTimeout(() => {
                this.resetNotifiction();// reset notification container
                // function that fires when the notification is closed
                if (onCloseFn) onCloseFn();
                this.showFinal(finalfn);// fires the final function
                this.isRunning = false;
                this.run();
                clearTimeout(autoTimer);// resetting the timeout timer.
            }, durationLen);
        }
    }

    // reset the container
    resetNotifiction(){
        // clearing the position set
        this.clearPosition();
        // closing the notification
        this.notificationContainer.classList.remove('show');
        // cleariing the previous informaton if any
        this.notificationContainer.innerHTML = '';        
    }

    // Check the nofication close
    closeNotification() {
        const {final,onClose} = this.settings;
        let finalfn = typeof final === 'function'? final:this.defaults.final;
        let onClosefn = typeof onClose === 'function'? onClose : this.defaults.onClose;
        let close = this.notificationContainer.querySelector('.notification-close');

        close.addEventListener('click',(e)=>{
            e.preventDefault();
            if (onClosefn) onClosefn(); // Fire the close function after everything done
            this.showFinal(finalfn);// fires the final function			
            this.resetNotifiction();// Reset the notification
        });
    }

    // removes any position set for the notification popup
    clearPosition() {
        this.positionsArray.forEach(position => { this.notificationContainer.classList.remove( position );});
    }

    // setting the close button icon per the position set
    closeIcon(pos) { return this.arrowIcons[pos]; }

    // Checks if the position given is a valid position in our
    // positions database/Array.
    checkPosition(pos) {
        if (! this.positionsArray.some(ps => ps === pos)) {
            console.error( `Invalid position: '${ pos }' is NOT a valid position.` );
        }
    }

    isObject(object) {
        const check = (item) => item && typeof item === "object" && ! Array.isArray(object);
        return check(object);
    }
}

// Prompt class
export class Prompt {
    // Default Settings
    defaults = {
        header: 'Prompt',// The header text, accepts HTML        
        placeHolder: 'enter text',// Text used as the placeholder of the input  
	    value: '',// string value creates an item pre-entered in the input type specified
        type: 'text',// Informs the plugin to use a specific input type in the prompt container        
        button: null,// Array of text to be on button        
        actions: null,// Array of function, Maps the number of buttons        
        onClose: null,// function, fires(if set) when the app closes        
        position: 'bottom-right',// position of the app on page        
        autoClose: true,// Closes Notification automaticaly if true,based on timer end.
        // timer function, used to set how long app stays visbe onpage.
        // the default duration is used if none is set.
        // @property Number
        // @default  3500
        duration: 3500,        
        final: null,// callback function, fires anytime the notification is closed.
        // adds a checkbox for a true or a false situation
        checkbox: {
            set: false,
            label: 'Default',
            checked: false
        }
    }
    // close icons set on the notification
    arrowIcons = {
        'top-right': `ri-arrow-right-line`,
        'right-center': `ri-arrow-right-line`,
        'bottom-right': `ri-arrow-right-line`,
        'top-left': `ri-arrow-left-line`,
        'left-center': `ri-arrow-left-line`,
        'bottom-left': `ri-arrow-left-line`,
        'bottom-center': `ri-close-line`,
        'top-center': `ri-close-line`,
        'center': `ri-close-line`,
    }
    // A list of page positions
    positionsArray = [
        'top-right','right-center',
        'bottom-right','top-left',
        'left-center','bottom-left',
        'bottom-center','top-center',
        'center'
    ];
    settings = {};
    promptContainer = null;
    queue = undefined;
    isRunning = false;
    checkBoxSet = false;

    // Creates an initial settings option used for drawing the notification
    // in case user wants all notification to use the same formating,
    // which saves much time rather than defining terms for all notification drawn
    constructor(options) {
        this.queue = new Queue();
        this.isObject(options) ? this.settings = merge(this.defaults,options) : this.settings = this.defaults;
        this.createPrompt();
    }

    createPrompt() {
        const promptContainer = document.createElement('div');
        promptContainer.classList.add('prompt');
        let scripts = document.body.querySelectorAll('script');
        if (scripts) {
            document.body.insertBefore(promptContainer,scripts[0]);
        } else { document.body.append(promptContainer); }

        // make the container available to the class
        this.promptContainer = promptContainer;
    }

    // Recieves OPtions in case user wants to define individual options for
    // the notification drawer
    prompt = (options) => {
        // enque new incoming calls
        this.queue.enqueue(options);
        // the run function to perform the showing of the notification queues
        this.run();
    }

    // sets a new prompt in queue
    run() {
        // check if there is an element in the stack and run
        if (this.queue.peek()) {
            if (! this.isRunning) {
                this.display(this.queue.dequeue());
                this.isRunning = true;                
            }
        }
    }

    display(options) {
        // repopulates the settings for the notification
        this.isObject(options) ? this.settings = merge(this.defaults,options) : undefined;
        // extracting various terms from the settings
        let {header, placeHolder, value, type, position} = this.settings;
        header = (header && typeof header === 'string')? header:this.defaults.header;
        position = (position)? position:this.defaults.position;
        placeHolder  = (placeHolder)? placeHolder:this.defaults.placeHolder;        

        this.checkPosition(position); // call to check position

        this.resetPrompt();// reset the container

        // create input for prompt receipt
        let input = `
            <input
                type="${type || this.defaults.type}"
                placeholder="${ placeHolder }"
                value="${value || this.defaults.value}"
                autocomplete="off"
                class="prompt-input"
            >
        `;

        // Setting up / Populating the notification
        this.setcontent(header, input, position);

        // Check the nofication close
        this.closePrompt();
    }

    // Setting up / Populating the notification
    setcontent(header, input, position) {
        this.promptContainer.innerHTML = `
            <div class="prompt-header">
                <p>${ header }</p>
                <span class="prompt-close"><i class="${ this.closeIcon(position) }"></i></span>
            </div>
            <div class="prompt-body">
                <p>${ input }</p>
            </div>
            <div class="prompt-footer">
                ${ this.createCheckBox() }
                ${ this.setButtons() }
            </div>
        `;
        this.BindButtonEvent();
        this.checkAutoClose();
        this.promptContainer.classList.add( position );
        setTimeout(() => { this.promptContainer.classList.add( 'show' ); }, 200);
    }

    createCheckBox() {
        const {checkbox} = this.settings;

        if (checkbox && this.isObject(checkbox)) {
            const {label,checked,set} = checkbox;
            if (set && set === true) {
                // set the global checkbox status
                this.checkBoxSet = set;
                // Create checks for the properties
                let labeltxt = label && typeof label === 'string'? label : 'Checkbox';
                let lblchecked = checked && typeof checked === 'boolean'? checked : false;

                // create the various parts
                let container = `
                    <div class="prompt-checker">
                        <label>
                            <input type="checkbox" ${lblchecked? 'checked':''}>
                            <span>${labeltxt}</span>
                        </label>
                    </div>
                `;

                return container;                
            } else { return ''; }
        } else { return ''; }
    }

    // Checking and setting up the footer
    setButtons() {
        const {button} = this.settings;
        let buttons = Array.isArray(button)? button:this.defaults.button;

        if (buttons && buttons.length >= 1) {
            let btn = '';
            for (let i in buttons) {
                let btnTxt = buttons[i];
                btn += `<button type="button">${btnTxt === ''? 'button':btnTxt}</button>`;
            }
            return `<div class="prompt-buttons"> ${ btn } </div>`;
        } else { return ''; }
    }
    
    // Fires the final function when set
    showFinal(final) { if (final) final(); }

    // event Binding function
    BindButtonEvent() {
        const {button,final,actions} = this.settings;
        let buttons = Array.isArray(button)? button:null;
        let callback = Array.isArray(actions)? actions:null;
        let finalFn = typeof final === 'function'? final:null;
        let modalContainer =  this.promptContainer; 
        
        if (buttons && buttons.length >= 1) {
            // All buttons defined
            let cntbuttons = [...modalContainer.querySelectorAll('.prompt-footer button')];
            let input = modalContainer.querySelector('.prompt-input');
            let checkInput = null;

            if (this.checkBoxSet) {
                checkInput = modalContainer.querySelector('.prompt-checker label input');
            }
            
            // looping through the buttons and ading event listeners
            cntbuttons.forEach((btn,i)=>{
                btn.addEventListener('click', (event)=>{
                    event.preventDefault();

                    if (callback && typeof callback[i] === 'function') {
                        let time = setTimeout(() => {
                            // input specified
                            let status =  checkInput ? checkInput.checked : checkInput;
                            callback[i]({input:input,value:input.value.trim(), checked:  status});
                            clearTimeout(time);
                        }, 10);
                    }

                    this.showFinal(finalFn);// fires the final function

                    // destroying the current one
                    let time1 = setTimeout(() => {
                        this.resetPrompt();// reset notification container
                        this.isRunning = false;
                        this.run();
                        clearTimeout(time1);
                    }, 200);                    
                });
            });
        }
    }

    // checking auto close
    checkAutoClose() {
        const {autoClose,final,onClose,duration} = this.settings;
        let finalfn = typeof final === 'function'? final : this.defaults.final;
        let autoCls = typeof autoClose === 'boolean'? autoClose : this.defaults.autoClose;
        let onCloseFn = typeof onClose === 'function'? onClose : this.defaults.onClose;
        let durationLen = typeof duration === 'number'? duration : this.defaults.duration;
    
        if (autoCls) {
            let autoTimer = setTimeout(() => {
                this.resetPrompt();// reset notification container
                // function that fires when the notification is closed
                if (onCloseFn) onCloseFn();
                this.showFinal(finalfn);// fires the final function
                this.isRunning = false;
                this.run();
                clearTimeout(autoTimer);// resetting the timeout timer.
            }, durationLen);
        }
    }

    // reset the container
    resetPrompt(){
        // clearing the position set
        this.clearPosition();
        // closing the notification
        this.promptContainer.classList.remove('show');
        // cleariing the previous informaton if any
        this.promptContainer.innerHTML = '';        
    }

    // Check the promp close
    closePrompt() {
        const {final,onClose} = this.settings;
        let finalfn = typeof final === 'function'? final : this.defaults.final;
        let onCloseFn = typeof onClose === 'function'? onClose : this.defaults.onClose;
        let close = this.promptContainer.querySelector('.prompt-close');

        close.addEventListener('click',(e)=>{
            e.preventDefault();
            if (onCloseFn) onCloseFn();
            this.showFinal(finalfn);// fires the final function			
            this.resetPrompt();// Reset the notification
        });
    }

    // removes any position set for the notification popup
    clearPosition() {
        this.positionsArray.forEach(position => { this.promptContainer.classList.remove( position );});
    }

    // setting the close button icon per the position set
    closeIcon(pos) { return this.arrowIcons[pos]; }

    // Checks if the position given is a valid position in our
    // positions database/Array.
    checkPosition(pos) {
        if (! this.positionsArray.some(ps => ps === pos)) {
            console.error( `Invalid position: '${ pos }' is NOT a valid position.` );
        }
    }

    isObject(object) {
        const check = (item) => item && typeof item === "object" && ! Array.isArray(object);
        return check(object);
    }
}
// merger
function merge(...objects) {
    const isObject = (item) => item && typeof item === "object" && ! Array.isArray(item);
    return objects.reduce((merged, obj) => {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (isObject(obj[key]) && isObject(merged[key])) {
                    merged[key] = merge(merged[key], obj[key]);
                } else { merged[key] = obj[key]; }
            }
        }
        return merged;
    }, {});
}

// QUEUE IMPLEMENTATION
class Queue {
    constructor() {
        this.items = [];
        this.frontIndex = 0;
        this.backIndex = 0;
    }

    enqueue(item) {
        this.items[this.backIndex] = item;
        this.backIndex++;
    }

    dequeue() {
        const item = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        return item;
    }

    peek() { return this.items[this.frontIndex]; }

    get printQueue() { return this.items; }

    get size() { return this.items.length; }
}