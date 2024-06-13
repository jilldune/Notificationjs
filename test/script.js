import { Notification, Prompt } from "../dist/notificationjs/Notificationjs.esm.js";
document.addEventListener('DOMContentLoaded', () => {
    const {notification} = new Notification();
    const {prompt} = new Prompt();

    document.getElementById('prompt').addEventListener('click', (e)=>{
        e.preventDefault();
        // Display the prompt
        prompt({
            header: 'User Input',
            placeHolder: 'Please enter your username',
            type: 'text',
            button: ['Okay','hello'],
            autoClose: false,
            position: 'top-center'
        });
    })
    
    document.getElementById('notif')
    .addEventListener('click', (e)=>{
        e.preventDefault();
        // Display the notification
        notification({
            header: 'Alert',
            body: 'This is a custom alert message',
            position: 'top-center',
            autoClose: false,
            button: ['Okay','hello'],
        });
    })

    
});

// ======== Global Scope Test ===========

// document.addEventListener('DOMContentLoaded', () => {
//     const { Notification, Prompt } = Notificationsjs;
//     const {notification} = new Notification();
//     const {prompt} = new Prompt();

//     document.getElementById('prompt').addEventListener('click', (e)=>{
//         e.preventDefault();
//         // Display the prompt
//         prompt({
//             header: 'User Input',
//             placeHolder: 'Please enter your username',
//             type: 'text',
//             button: ['Okay','hello'],
//             autoClose: false,
//             position: 'top-center'
//         });
//     })
    
//     document.getElementById('notif')
//     .addEventListener('click', (e)=>{
//         e.preventDefault();
//         // Display the notification
//         notification({
//             header: 'Alert',
//             body: 'This is a custom alert message',
//             position: 'top-center',
//             autoClose: false,
//         });
//     })
// });
