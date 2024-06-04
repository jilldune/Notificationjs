// import { Notification } from "../src/notification.js";
document.addEventListener('DOMContentLoaded', () => {
    const { Notification, Prompt } = Notificationsjs;
    const {notification} = new Notification();
    const {prompt} = new Prompt();

    // const notification = new Notification({
    //     header: 'Welcome',
    //     body: 'This is a notification example',
    //     position: 'top-right'
    // });

    document.getElementById('prompt').addEventListener('click', (e)=>{
        e.preventDefault();
        // Display the notification
        notification({
            header: 'Alert',
            body: 'This is a custom alert message'
        });
    })

    document.getElementById('notif')
    .addEventListener('click', (e)=>{
        e.preventDefault();
        // Display the prompt
        prompt({
            header: 'User Input',
            placeHolder: 'Please enter your username',
            type: 'text',
            autoClose: false,
            position: 'top-center'
        });
    })

    
});
