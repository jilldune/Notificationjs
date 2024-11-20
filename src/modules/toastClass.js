import { Queue } from "./helpers";

export default class Toast {
    TOAST_DEFAULTS = {
        duration: 5000 // 5 seconds default duration
    };
    TOAST_TYPES = {
      alert: 'alert',
      neutral: 'neutral',
      success: 'success',
      info: 'info',
      error: 'error',
    //   alternate reference
      a: 'alert',
      n: 'neutral',
      s: 'success',
      i: 'info',
      e: 'error'
    }; // Mapping of toast types to their respective class names
    PREFIX = 'toastjs'; // Prefix for class names
    CONTAINER_CLASS = `toast-container-${this.PREFIX}`; // Class name for the toast container
    #parentContainer = undefined;
    #queueContainer = undefined;
    #isRunTO = undefined;
    isRunning = false;// Flag to track running status
  
    constructor() {
        this.#queueContainer = new Queue();
        this.createParentContainer();
    }

    // Create the parent container for toasts
    createParentContainer() {
        // Check if the container already exists
        const existingContainer = document.querySelector(`.${this.CONTAINER_CLASS}`);
        this.#parentContainer = existingContainer;
        if (existingContainer) return;

        // Create a new container and insert it at the beginning of the body
        const toastCont = document.createElement('div');
        toastCont.className = this.CONTAINER_CLASS;
        document.body.insertAdjacentElement('afterbegin', toastCont);
        this.#parentContainer = toastCont;
    }

    // Create a new toast element
    createToastElement(toastObj) {
        if (!toastObj)  return '';

        const toast = document.createElement('div');
        // Set the class name for the toast element based on the toast type
        toast.className = `toast ${this.TOAST_TYPES[toastObj.toast_type.toLowerCase()]} active`;
        toast.textContent = toastObj.message;
        
        return toast;
    }

    run() {
        if (!this.#queueContainer.isEmpty() && !this.isRunning) {
            // Create new toast
            const toast = this.createToastElement(this.#queueContainer.dequeue());
            if (!toast) return;// if theres noting to do, we return
            // Append the toast to the container and set it as the current toast
            this.#parentContainer.appendChild(toast);
            // reset running status
            this.isRunning = true;
            // if the main process is still running
            if (this.#isRunTO) clearTimeout(this.#isRunTO);
            // Schedule dismissal of the toast after 5 seconds
            let timeout = setTimeout(() => {
                this.#isRunTO = timeout;
                if (this.isRunning)  this.dismissToast();
                clearTimeout(timeout);
            }, this.TOAST_DEFAULTS.duration);
        }
    }

    // Dismiss a toast
    dismissToast() {
        if (this.isRunning) {
            try {
                this.#parentContainer.querySelector('div.toast.active').classList.remove('active');
    
                let timeout = setTimeout(()=>{
                    clearTimeout(timeout);
                    this.#parentContainer.innerHTML = '';// clear container
                    this.isRunning = false;// Reset current status
                    this.run(); // Show the next toast, if any
                },1000);                
            } catch (error) {}
        } else { this.run(); }
    }

    // Display a new toast
    toast = (toast_type, message, immediate = false) => {
        if (immediate) {
            // If immediate is true and a toast is currently displayed, dismiss it first
            this.#queueContainer.appendFirst({toast_type,message});
            this.dismissToast();
            return;
        }
        
        this.#queueContainer.enqueue({toast_type,message});// Otherwise, add the toast to the queue
        this.run();// Show toast
    }
}