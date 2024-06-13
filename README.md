# Notificationjs

## Description
This Provides a simpler way to add custom notification style to your web project.  
  
There are two Javascript files in the 'dist/notificationjs' folder, each built for a specific project type,  
for modules i.e imports, the Notification.esm.js file can be loaded to enable the use of the new modules sytem in javascript.  
For requires, global scope and AMD systems, the 'Notification.und.js' file can be loaded and used for that see [Installation](#installation) and [Usage](#usage) for more details.

## Installation
Copy/Download the dist folder into your project and that's all.  
Please note, the component's icon depends on remixicons so please do well to link remixicon.css into your projects html.  
See page [text](https://remixicon.com/) or github page [text](https://github.com/Remix-Design/RemixIcon) for updated icons or you can add a link from the 'dist/notificationjs/remixicon/remixicon.css' in your project.

## Usage
### For ES Modules
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificationjs</title>
    <!-- Link to remixicons -->
    <link rel="stylesheet" href="../dist/notificationjs/remixicon/remixicon.css">
    <!-- Link to the components css -->
    <link rel="stylesheet" href="../dist/notificationjs/style/minified/notification.min.css">
</head>
<body>
    <button id="prompt">Prompt</button>
    <button id="notif">Notif</button>

    <!-- This is Added for Global System type -->
    <!-- <script src="../dist/Notificationjs.umd.js"></script> -->

    <!-- Add type="module" to the script tag to enable the use of modules  -->
    <script type="module" src="script.js"></script>
</body>
</html>
```
```Javascript
import { Notification, Prompt } from "path/to/folder/notificationjs/Notificationjs.esm.js";
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
```
### For UMD Modules
Import file in the global space i.e in your html file and it'll be available globally in the 'Notificationjs' variable
```Javascript
document.addEventListener('DOMContentLoaded', () => {
    const { Notification, Prompt } = Notificationsjs;
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
        });
    })
});
```
