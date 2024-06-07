import { Queue, merge } from "./helpers.js";

export default class Notification {
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
        if (!this.queue.isEmpty() && !this.isRunning) {
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

// export default class Notification {
//     // Default Settings
//     defaults = {
//         // The header text, accepts HTML
//         header: 'Notification',
//         // notification to show, accepts HTML
//         body: 'This is a notification body',
//         // Array of text to be on button
//         button: null,
//         // Array of function, Maps the number of buttons
//         actions: null,
//         // function, fires(if set) when the app closes
//         onClose: null,
//         // position of the app on page
//         position: 'bottom-right',
//         // Closes Notification automaticaly if true,based on timer end.
//         autoClose: true,
//         // timer function, used to set how long app stays visbe onpage.
//         // the default duration is used if none is set.
//         // @property Number
//         // @default  3500
//         duration: 3500,
//         // callback function, fires anytime the notification is closed.
//         final: null,
//         // adds a checkbox for a true or a false situation
//         checkbox: {
//             set: false,
//             label: 'Default',
//             checked: false
//         }
//     }
//     // close icons set on the notification
//     arrowIcons = {
//         'top-right': `ri-arrow-right-line`,
//         'right-center': `ri-arrow-right-line`,
//         'bottom-right': `ri-arrow-right-line`,
//         'top-left': `ri-arrow-left-line`,
//         'left-center': `ri-arrow-left-line`,
//         'bottom-left': `ri-arrow-left-line`,
//         'bottom-center': `ri-close-line`,
//         'top-center': `ri-close-line`,
//         'center': `ri-close-line`,
//     }
//     // A list of page positions
//     positionsArray = [
//         'top-right','right-center',
//         'bottom-right','top-left',
//         'left-center','bottom-left',
//         'bottom-center','top-center',
//         'center'
//     ];
//     settings = {};
//     notificationContainer = null;
//     queue = undefined;
//     isRunning = false;

//     // Creates an initial settings option used for drawing the notification
//     // in case user wants all notification to use the same formating,
//     // which saves much time rather than defining terms for all notification drawn
//     constructor(options) {
//         this.queue = new Queue();
//         this.isObject(options) ? this.settings = merge(this.defaults,options) : this.settings = this.defaults;
//         this.createContainer();
//     }

//     createContainer() {
//         const notificationContainer = document.createElement('div');
//         notificationContainer.classList.add('notification');
//         let scripts = document.body.querySelectorAll('script');
//         if (scripts) {
//             document.body.insertBefore(notificationContainer,scripts[0]);
//         } else { document.body.append(notificationContainer); }

//         // make the container available to the class
//         this.notificationContainer = notificationContainer;
//     }

//     // Recieves OPtions in case user wants to define individual options for
//     // the notification drawer
//     notification = (options) => {
//         // enque new incoming calls
//         this.queue.enqueue(options);
//         // the run function to perform the showing of the notification queues
//         this.run();
//     }

//     run() {        
//         // check if there is an element in the stack and run
//         if (!this.queue.isEmpty() && !this.isRunning) {
//             this.display(this.queue.dequeue());
//             this.isRunning = true;
//         }
//     }

//     // Displays the notification
//     display(options) {
//         // repopulates the settings for the notification
//         this.isObject(options) ? this.settings = merge(this.defaults,options) : undefined;
        
//         // extracting various terms from the settings
//         let {header, body, position} = this.settings;
//         header = (typeof header === 'string' && header === '')? this.defaults.header:header;
//         body =  (typeof body === 'string' && body === '')? this.defaults.body:body;
//         position = (position !== '')? position:this.defaults.position;

//         this.checkPosition(position); // call to check position

//         this.resetNotification();// reset the container

//         // Setting up / Populating the notification
//         this.setContent(header, body, position);

//         // Check the nofication close
//         this.closeNotification();
//     }

//     // Setting up / Populating the notification
//     setContent(header, body, position) {
//         console.log('set content');
//         this.notificationContainer.innerHTML = `
//             <div class="notification-header">
//                 <p>${ header }</p>
//                 <span class="notification-close"><i class="${ this.closeIcon(position) }"></i></span>
//             </div>
//             <div class="notification-body">
//                 <p>${ body }</p>
//             </div>
//             <div class="notification-footer">
//                 ${ this.createCheckBox() }
//                 ${ this.setButtons() }
//             </div>
//         `;
//         this.bindButtonEvent();
//         this.checkAutoClose();
//         this.notificationContainer.classList.add( position );
//         setTimeout(() => { this.notificationContainer.classList.add( 'show' ); }, 200);      
//     }

//     // creates a checbox area
//     createCheckBox() {
//         const {checkbox} = this.settings;

//         if (checkbox && this.isObject(checkbox)) {
//             const {label,checked,set} = checkbox;
//             if (set && set === true) {
//                 // Create checks for the properties
//                 let labeltxt = label && typeof label === 'string'? label : 'Checkbox';
//                 let lblchecked = checked && typeof checked === 'boolean'? checked : false;

//                 // create the various parts
//                 let container = `
//                     <div class="notification-checker">
//                         <label>
//                             <input type="checkbox" ${lblchecked? 'checked':''}>
//                             <span>${labeltxt}</span>
//                         </label>
//                     </div>
//                 `;

//                 return container;                
//             } else { return ''; }
//         } else { return ''; }
//     }

//     // Checking and setting up the footer
//     setButtons() {
//         const {button} = this.settings;
//         let buttons = Array.isArray(button)? button:null;

//         if (buttons && buttons.length >= 1) {
//             let btn = '';
//             for (let i in buttons) {
//                 let btnTxt = buttons[i];
//                 btn += `<button type="button">${btnTxt === ''? 'button':btnTxt}</button>`;
//             }
//             return `<div class="notification-buttons"> ${ btn } </div>`;
//         } else { return ''; }
//     }
    
//     // Fires the final function when set
//     showFinal(final) { if (final) final(); }

//     // event Binding function
//     bindButtonEvent() {
//         const {button,final,actions} = this.settings;
//         let buttons = Array.isArray(button)? button:null;
//         let callback = Array.isArray(actions)? actions:null;
//         let finalFn = typeof final === 'function'? final:null;
//         let modalContainer =  this.notificationContainer; 

//         if (buttons && buttons.length >= 1) {            
//             // All buttons defined
//             let cntbuttons = [...modalContainer.querySelectorAll('.notification-footer button')];
            
//             // looping through the buttons and ading event listeners
//             cntbuttons.forEach((e,i)=>{
                
//                 // listener function fired when clicked
//                 e.addEventListener('click', (evt) => {

//                     evt.preventDefault(); // Stops the default behaviour of the element

//                     // attaching function call when button is clicked
//                     if (callback && Array.isArray(callback) && typeof callback[i] === 'function') {
//                         let t = setTimeout(() => { callback[i](); clearTimeout(t)}, 10);
//                     }
                    
//                     this.showFinal(finalFn); // fires the final function

//                     // Timer function to clear notiition after click
//                     let time = setTimeout(() => {
//                         this.resetNotification(); // reset notification container
//                         this.isRunning = false; // Sets running status off
//                         this.run(); // checks if there notifictons in queue
//                         clearTimeout(time); // Clears the timer count from memory
//                     }, 200);
                    
//                 },{ once: true });

//             });
//         }
//     }

//     // checking auto close
//     checkAutoClose() {
//         const {autoClose,final,onClose,duration} = this.settings;
//         let finalfn = typeof final === 'function'? final : this.defaults.final;
//         let autoCls = typeof autoClose === 'boolean'? autoClose : this.defaults.autoClose;
//         let onCloseFn = typeof onClose === 'function'? onClose : this.defaults.onClose;
//         let durationLen = typeof duration === 'number'? duration : this.defaults.duration;

//         if (autoCls) {
//             let autoTimer = setTimeout(() => {
//                 this.resetNotification();// reset notification container
//                 // function that fires when the notification is closed
//                 if (onCloseFn) onCloseFn();
//                 this.showFinal(finalfn);// fires the final function
//                 this.isRunning = false;
//                 this.run();
//                 clearTimeout(autoTimer);// resetting the timeout timer.
//             }, durationLen);
//         }
//     }

//     // reset the container
//     resetNotification() {
//         // clearing the position set
//         this.clearPosition();
//         // closing the notification
//         this.notificationContainer.classList.remove('show');
//         // cleariing the previous informaton if any
//         this.notificationContainer.innerHTML = '';        
//     }

//     // Check the nofication close
//     closeNotification() {
//         const {final,onClose} = this.settings;
//         let finalfn = typeof final === 'function'? final:this.defaults.final;
//         let onClosefn = typeof onClose === 'function'? onClose : this.defaults.onClose;
//         let close = this.notificationContainer.querySelector('.notification-close');

//         close.addEventListener('click',(e)=>{
//             e.preventDefault();
//             if (onClosefn) onClosefn(); // Fire the close function after everything done
//             this.showFinal(finalfn);// fires the final function			
//             this.resetNotification();// Reset the notification
//         });
//     }

//     // removes any position set for the notification popup
//     clearPosition() {
//         this.positionsArray.forEach(position => { this.notificationContainer.classList.remove( position );});
//     }

//     // setting the close button icon per the position set
//     closeIcon(position) { return this.arrowIcons[position]; }

//     // Checks if the position given is a valid position in our
//     // positions database/Array.
//     checkPosition(position) {
//         // if (! this.positionsArray.some(ps => ps === position)) {
//         //     console.error( `Invalid position: '${ position }' is NOT a valid position.` );
//         // }
//         if (!this.positionsArray.includes(position)) {
//             console.error(`Invalid position: '${position}' is NOT a valid position.`);
//         }
//     }

//     isObject(obj) {
//         return obj && typeof obj === "object" && !Array.isArray(obj);
//     }
// }