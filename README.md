# Notificationjs

## Table of Contents
- [Description](#description)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Methods](#methods)  

## Description
This Provides a simpler way to add custom notification style to your web project.  
  
There are two Javascript files in the 'dist/notificationjs' folder, each built for a specific project type,  
for modules i.e imports, the Notification.esm.js file can be loaded to enable the use of the new modules sytem in javascript.  
For requires, global scope and AMD systems, the 'Notification.umd.js' file can be loaded and used for that see [Installation](#installation) and [Usage](#usage) for more details.

## Installation
Copy/Download the dist folder into your project and that's all.  
Please note, the component's icon depends on remixicons so please do well to link remixicon.css into your projects html.  
See [page](https://remixicon.com/) or [github page](https://github.com/Remix-Design/RemixIcon) for updated icons or you can add a link from the 'dist/notificationjs/remixicon/remixicon.css' in your project.

## Usage
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
  
  
### For ES Modules
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

## Methods
The notification and prompt methods are available in the Notification and Prompt Class respectively for the running/life cycle of the notification or prompt. It is the same in any system used.
```Javascript
    // Notification
    const {notification} = new Notification(); // Extracting the notification method - inline (Class Object Destructuring)

    // Prompt
    const {prompt} = new Prompt(); // Extracting the prompt method - inline (Class Object Destructuring)
```  
The prompt and notification methods accepts a Javascript object as parameters
```Javascript
    prompt({}); // prompt method

    notification({}); // notification method
```    
The prompt and notification methods parameter share some similar object data. Some of which includes:
### Same Properties
|Item|Required|Type|Description|
|:----------|:----------:|:----------:|:----------|
|header|false|String|Shows what is to be used as a title for the notification. If not given, a placeholder text is used|
|button|false|Array|Adds a button to the notification or prompt. It must be an array of strings that indicate the label of the buttons to be added|
|actions|false|Array|Adds Event listener to the buttons included. It must be an array of functions that is mapped to the number of button labels spcified in the buttons property included|
|onClose|false|Function|When added, is run immediately the notifiation is closed|
|autoClose|false|Boolean|Specifies whether the notification/prompt should be auto closed. It is true by default|
|duration|false|Number|This specifies how long the notification is displayed. must be in code seconds 1000 = 1 second. 3.5s = 3500 is the default if not specified.|
|position|false|String|Specifies the position of the container on screen. Default is "bottom-right". Others can be specified see [Position](#position) for more details|
|final|false|Function|This is a function supplied to the notification/prompt process and called after everything is done and cleared/Can be used in interchangeably with onClose property|
### Exclusive properties for Notification
### Exclusive properties for Prompt
### Position
The table below shows the various position properties that can be used to controll the position of the notification or prompt container.
|Item|Description|
|:----------|:----------|
|top-right|Top Right of page|
|right-center|Right Center of page|
|bottom-right|Bottom Right of screen|
|top-left|Top Left of screen|
|left-center|Left Center of screen|
|bottom-left|Bottom Left of Screen|
|bottom-center|Bottom Center of the screen|
|top-center|Top Center of the screen|
|center|Center of the screen|
