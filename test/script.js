import { Notification, Prompt, Toast } from "../dist/notificationjs/Notificationjs.esm.js";
document.addEventListener('DOMContentLoaded', () => {
    const {notification} = new Notification();
    const {prompt} = new Prompt();
    const {toast} = new Toast();

    document.getElementById('prompt').addEventListener('click', (e)=>{
        e.preventDefault();
        // Display the prompt
        prompt({
            header: 'Text',
            placeHolder: 'Please enter your username',
            type: 'text',
            button: ['Okay','hello'],
            actions: [(obj)=>{console.log(obj);},()=>{}],
            checkbox: {
                set: true,
                label: 'Check box',
                checked: true,
                onChange: (status) => console.log(status)
            },
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
            actions: [(obj)=>{console.log(obj);},()=>{}],
            checkbox: {
                set: true,
                label: 'Check box notification',
                checked: true,
                onChange: (state) => console.log(state)
            },
            backdrop: {
                level: 9,
                clickToClose: true
            }
        });
    })
    
    document.getElementById('toast').addEventListener('click', (e)=>{
        e.preventDefault();
        // Display the prompt
        toast('a','Hello, sup... Alert');
        toast('n','Hello, sup... Neutral');
        toast('s','Hello, sup... Success');
        toast('i','Hello, sup... Info');
        toast('e','Hello, sup... Error');
    })
    document.getElementById('toastIm').addEventListener('click', (e)=>{
        e.preventDefault();
        // Display the prompt
        toast('n','Hey, Hey, Hey, this is an immediate toast',true);
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
