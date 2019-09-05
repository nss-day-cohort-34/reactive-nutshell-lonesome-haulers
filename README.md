# Nutshell - dragonfire

### Introduction
Nutshell is a dashboard for people to use to organize their daily tasks, events, news article, friends, and chat messages.

### User Registration
To register as a user click on the "Register" button the home screen. The user will be required to enter their name and password. When the required information has been entered, click on the "Submit" button.

### User Login
To login click on the "Login" button on the home screen. The user will be required to enter their username and email address. When the required information has been entered, click on the "Submit" button.

### Friends
The Friends area allows a registered user to initiate a friend request with another registered user. The friend request will remain pending until the request has been approved.

Friend Request: To request a friend click the "Add Friend" button in the friends area.
Friend Approval: To approve friend request click on the "Accept" button in the Friends area.
Friend Denial: To deny a friend request click on the "Deny" button in the Friends area.

### To-Do
The To-Do area of the Nutshell dashboard to add, edit, and delete to-do items. Each individual to-do provides information on the to-item, the date due and status of completion.

Adding To-Do: To add a to-do item complete the following fields:
 - Description of task
 - Date task is due
 - If task has been already been completed, click on the "Toggle Compeleted" button.
 When all fields have been completed, click on the "Add" button.
 
Editing To-Do: To edit a to-do, click on the "Edit" button and make the desired changes to the to-do item. When edit has been completed, click on the "Submit" button.

Deleting To-Do: To delete a to-do,  click on the "Delete" button on the desired to-do item.

### News
The News area of the Nutshell dashboard provides functionality to add, edit and delete news.
When news articles have been entered they will be displayed in the news area of the dashboard in descending chronological order.

Adding News: To add an event the following fields need to be completed:
 - Title : title of news article
 - Synopsis: a synopsis of the news article
 - URL: a text link to the article on an external resource. 
 When fields have been completed, click on the Submit button.

Editing News: To edit a news article click on the "Edit News Article" button on the news article to be edited. The news article will be presented in a separate edit window for editing. When editing has been completed, press the save button on the edit window. If the edit action needs to be canceled

Deleting News: To delete the news article click on the "Delete News Article" button on the news article to be deleted.

### Events
The Events area of the Nutshell dashboard to add, edit, and delete Event items. Each individual event item provides information on the event, the date of the event and location of the event.

Adding Event: To add an event the following fields need to be completed:
 - Event Name: the name of the event
 - Event Date: the date of the event
 - Event Location: the location of the event
 
Editing Event: To edit an event, click on the "Edit Event" button and make the appropriate changes. When editing has been completed, click on the "Submit" button
 
Deleting Event: To delete an event, click on the "Delete Event" button of the event to be deleted.

# Nutshell: The Information Dashboard

Nutshell is a new product offering that you have been tasked with building. It's a dashboard for people to use to organize their daily tasks, events, news article, friends, and chat messages.

You will be using the React library to build out this application.

To start you off, here's an example of what the resources in your API should look like once it's populated with some data from your application.

### Users

```json
{ "id": 1, "username": "Steve", "email": "me@me.com" }
```

### Messages

```json
{ "id": 1, "userId": 1, "message": "What's up?" }
```

### News

```json
{
    "id": 1,
    "userId": 2,
    "url": "https://www.quantamagazine.org/newfound-wormhole-allows-information-to-escape-black-holes-20171023/",
    "title": "Wormholes Allow Information to Escape Black Holes",
    "synopsis": "Check out this recent discovery about workholes"
}
```

### Friends

```json
{ "connectionId": 1, "userId": 1, "otherFriendId": 3 }
```

### Tasks

```json
{ "id": 1, "userId": 3, "task": "Take out garbage" }
```

## Professional Requirements

1. All teammates must use React and JSON-server. 
1. Each module should have a comment at the top with the following info: author(s) and purpose of module
1. The README for your project should include instructions on how another person can download and run the application

## How to Handle Authentication

You will be using session storage to keep track of which user has logged into Nutshell. When the user fills out the registration form, you will POST their username and password to the `users` collection in your API. You will then immediately take the `id` of the object in the response and save it to session storage.

```js
sessionStorage.setItem("activeUser", user.id)
```

If you want to add a Logout feature, all you need to do it remove the session storage item.

```js
sessionStorage.removeItem("activeUser")
```
