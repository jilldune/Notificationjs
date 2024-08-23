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
See remixicons [page](https://remixicon.com/) or [github page](https://github.com/Remix-Design/RemixIcon) for updated icons. You can add a link from the 'dist/notificationjs/remixicon/remixicon.css' in your project htmL header tag.  
Make sure to link the styles of the component into the header tag for the component relies on that for it's styling and functioning. There are two files compiled, minified version 'notification.min.css' for production and regular style 'notification.css' for development all stored in a seperate folder - 'css' and 'minified' in the style folder .
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notificationjs</title>
    <!-- Link to remixicons -->
    <link rel="stylesheet" href="../dist/notificationjs/remixicon/remixicon.css"> <!--OR LINK TO CDN -->
    <!-- Link to the component's css -->
    <link rel="stylesheet" href="../dist/notificationjs/style/minified/notification.min.css">
</head>
<body>
</body>
```

## Usage
There are three components in all that can be found in the file loaded namely; Notification, Prompt and Toast  
which is present for different purposes,  
Notification for displaying messages and can also be used to get user interactions; 
Prompt for geting user inputs same as Js prompt and also user interactions to make a decision; 
Toast for actually displaying message snippets and also the most easiest way to display simple messages. Since all the other two depends on
options passed to them, this only needs two important and one optional argument
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
        <button id="toast">Toast</button>

        <!-- This is Added for Global System type -->
        <!-- <script src="../dist/Notificationjs.umd.js"></script> -->

        <!-- Add type="module" to the script tag to enable the use of modules  -->
        <script type="module" src="script.js"></script>
    </body>
</html>
```  
  
  
### ES Modules
```Javascript
import { Notification, Prompt, Toast } from "path/to/folder/notificationjs/Notificationjs.esm.js";
document.addEventListener('DOMContentLoaded', () => {
    const {notification} = new Notification();
    const {prompt} = new Prompt();
    const {toast} = new Toast();

    // prompt
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
    
    // Notification
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
    
    // Toast
    document.getElementById('toast').addEventListener('click', (e)=>{
        e.preventDefault();
        // Display the prompt
        toast('a','Alert');
        toast('n','Neutral');
        toast('s','Success');
        toast('i','Info');
        toast('e','Error');
        toast('n','immediate toast',true);
    })
});
```
### UMD Modules
Import file in the global space i.e in your html file and it'll be available globally in the 'Notificationjs' variable
```Javascript
document.addEventListener('DOMContentLoaded', () => {
    const { Notification, Prompt, Toast } = Notificationsjs;
    const {notification} = new Notification();
    const {prompt} = new Prompt();
    const {toast} = new Toast();

    // prompt
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
    
    // Notification
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
    
    // Toast
    document.getElementById('toast').addEventListener('click', (e)=>{
        e.preventDefault();
        // Display the prompt
        toast('a','Alert');
        toast('n','Neutral');
        toast('s','Success');
        toast('i','Info');
        toast('e','Error');
        toast('n','immediate toast',true);
    })
});
```

## Methods
The notification, prompt and toast methods are available in the Notification, Prompt and Toast Class respectively for the running/life cycle of the notification or prompt. It is the same in any system used.
```Javascript
    // Notification
    const {notification} = new Notification(); // Extracting the notification method - inline (Class Object Destructuring)

    // Prompt
    const {prompt} = new Prompt(); // Extracting the prompt method - inline (Class Object Destructuring)

    // Toast
    const {toast} = new Toast(); // Extracting the prompt method - inline (Class Object Destructuring)
```  
The prompt and notification methods accepts a Javascript object as parameters or arguments but toast needs only three individual parameters
first two need but the third is optional
```Javascript
    prompt({}); // prompt method

    notification({}); // notification method

    toast(toast_type,message,immediate);
```    
The prompt and notification methods parameter share some similar object data. Some of which includes:
### Similar Properties
```Javascript
let options = {
    // ... other properties
    header: 'Notification',
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
    },
    backdrop: {
        set: false,
        level: 1,
        clickToClose: false
    }
}
```
|Property|Required|Type|Description|
|:----------|:----------:|:----------:|:----------|
|header|no|String|Shows what is to be used as a title for the notification. If not given, a placeholder text is used|
|button|no|Array|Adds a button to the notification or prompt. It must be an array of strings that indicate the label of the buttons to be added|
|actions|no|Array|Adds Event listener to the buttons included. It must be an array of functions that is mapped to the number of button labels spcified in the buttons property included|
|onClose|no|Function|When added, is run immediately the notifiation is closed|
|autoClose|no|Boolean|Specifies whether the notification/prompt should be auto closed. It is true by default|
|duration|no|Number|This specifies how long the notification is displayed. must be in code seconds 1000 = 1 second. 3.5s = 3500 is the default if not specified.|
|position|no|String|Specifies the position of the container on screen. Default is "bottom-right". Others can be specified see [Position](#position) for more details|
|final|no|Function|This is a function supplied to the notification/prompt process and called after everything is done and cleared/Can be used in interchangeably with onClose property|  
### Toast Arguments
|Property|Required|Type|Description|
|:----------|:----------:|:----------:|:----------|
|toast_type|yes|String|Tells the process what toast to be used. see [ToastTypes](#toast-types) for more|
|message|yes|String|The message snippet to display|
|immediate|no|Boolean|Sets its priority to high and displays it immediately, skipping all steps. The default is false if nothing is specified|  

#### Checkbox
A checkbox can be added to the notification or the prompt container. To do so, a checkbox property can be added to the object which is also an object example
```Javascript
let options = {
    // ... other properties
    checkbox: {
        set: true,
        label: 'Label Name',
        checked: false,
        onChange: null
    }
}
```
More about the checkbox object is shown in the table below:  
|Property|Required|Type|Description|
|:----------|:----------:|:----------:|:----------|
|set|yes|Boolean|Tells the process to create the checkbox or not. Default is False|
|label|no|String|The label/name of the checkbox. Default is 'Label'.|
|checked|no|Boolean|Shows whether the checkbox is initially checked or not. Default is False|
|onChange|no|Function|If this function is set, it is fired any time the state of the checkbox changes and the state is passed to it as an argument that can be received and used.|

#### Backdrop
A backdrop can be added to the notification or the prompt container. To do so, a backdrop property can be added to the object which is also an object 
```Javascript
let options = {
    // ... other properties
    backdrop: {
        set: false,
        level: 1,
        clickToClose: false
    }
}
```
More about the checkbox object is shown in the table below:  
|Property|Required|Type|Description|
|:----------|:----------:|:----------:|:----------|
|set|yes|Boolean|Tells the process to create the checkbox or not. Default is True|
|level|no|Number|The the level shows how much background should be added, it ranges from 1 - 10. Default is transparent.|
|clcikToClose|no|Boolean|Shows whether the backdrop can be clicked to close the whole function, it doesn't execute any user defined code passed. Default is False|  
Note: This property and others can be passed to the constructor function and is set as default, but can be over written at runtime as the object is passed to the notification or prompt method.  
```Javascript
    let options = {
        // ... other properties
        backdrop: {
            set: false,
            level: 1,
            clickToClose: false
        }
    }

    // options passed to the constructor function
    const {notification} = new Notification(options);
    const {prompt} = new Prompt(options);

    // passed to the method to be executed at runtime
    notifiation({
        // ... other properties
        backdrop: {
            set: true,
            level: 1,
            clickToClose: false
        }
    })
    prompt({
        // ... other properties
        backdrop: {
            set: false,
            level: 1,
            clickToClose: true
        }
    })
```

### Exclusive properties for Notification
```Javascript
let options = {
    // ... other properties
    body: 'This is a notification body'
}
```
|Property|Required|Type|Description|
|:----------|:----------:|:----------:|:----------|
|body|no|String|Shows what is to be used as a body text for the notification. If not given, a placeholder text is used|
### Exclusive properties for Prompt
```Javascript
let options = {
    // ... other properties 
    placeHolder: 'enter text', 
    type: 'text',
    value: ''
}
```
The prompt is actualy used to collect user input and the resulting value entered is returned.  
The table below shows the various properties that can be included in the parameter object passed.  

|Property|Required|Type|Description|
|:----------|:----------:|:----------:|:----------|
|type|no|String|Shows the type of element input type to used. If not given, a 'text' input type is used|
|placeholder|no|String|Shows what is to be used as a placeholder for the input. If not given, a placeholder text is used|
|value|no|String|Shows what is to be used as an initial for the input.|
### Position
The table below shows the various position properties that can be used to controll the position of the notification or prompt container.
```Javascript
let options = {
    // ... other properties
    position: 'bottom-right'
}
```
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

### Toast Types
All Toast types are strings. The type can be used or the alternate representation can be substituted
```Javascript
    // toast(toast_type,message,immediate);
    toast('error','message',true);
    toast('e','message',false);
    toast('e','message');
```
|type|Alternate|Description|
|:----------|:----------:|:----------|
|success|s|Success toast message|
|error|e|Error toast message|
|info|i|Information toast message|
|alert|a|Alert toast message|
|neutral|n|Neutral toast message|  
