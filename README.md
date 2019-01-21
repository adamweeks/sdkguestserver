# Building Server and Client-side Applications in Javascript with the Webex Teams SDK

In this workshop, we are going to be building an application that will allow a visitor to our site to call our support desk.

We will be utilizing the Webex Teams SDK and the Webex Teams Widgets to build our experience.

## Project Layout

This is a basic express server project.

* `index.js` handles the main routing of the server
* `guest.js` has helper functions for generating JWTs
* `views` folder has the front end code
  * `main.ejs` basic page layout
  * `form.ejs` person name entry form

## Workshop

### Preliminary Setup

* Set up a webex for developers account
  * <https://developer.webex.com/>
* Creating a guest issuer account
  * Once logged in, click on "My Webex Teams Apps" under your profile at the top
  * Click "Create a New App" button
  * Click "Create a Guest Issuer"
  * Choose a name, example: "Webex Teams SDK Workshop"
  * Note: Free users cannot create guest issuers (request a demo account from your instructor)
* Create a fork of the code repository from repl.it
  * <https://repl.it/@adamweeks/SDKGuestServer>
  * Click "Fork"
  * Optional: "Sign Up" to save your work for later!

### App Work Stage 1 (setup)

First, let's make sure our environment is setup properly and able to create guest tokens.

* Rename the `.env.default` file to `.env`
  * This makes the file hidden to everyone except you, making it safe for secret keys
* Add guest user settings to `.env` file
  * `GUEST_ISSUER_ID=` is for the Guest Issuer ID Credentials
  * `GUEST_SHARED_SECRET` is for the Shared Secret Credentials
* Click "Run" to start your server
* In the mini browser on repl.it, click on "open in a new tab".
* Verify that the `/guest` endpoint works
  * Add "/guest" to the url in the new tab that just opened.
    * Example: <https://sdkguestserver.adamweeks.repl.co/guest>
  * Copy generated token and paste it into <https://www.jwt.io>

### App Work Stage 2 (display name entry)

Our app needs to know what to call the user.
In this step, We will use an input form and generate a guest token from it.

* Open `index.js`
  * Find the "Stage 2" section:
    ```js
    app.get('/stage2', (req, res) => {
    ```
  * Stage 2 has two states: entry form and user display
  * Test out the form and user entry on your site by browsing to `/stage2`
  * Verify JWT has entered user name via <https://www.jwt.io>

### App Work Stage 3 (widget to roomkit)

Now that we are creating a guest token, let's use the widgets to place our first call!

* Create widget js from developer portal samples
  * Add hint: `guestToken`
* User generated JWT with widget to call `roomkit@sparkdemos.com`
* Edit the widget page to a new destination
* Edit the widget page to include messaging
* Run app and verify widget opens

### App Work Stage 4 (removing the widget and using SDK to auth)

* Guest issuer SDK example <https://developer.webex.com/docs/sdks/browser>
* Pass token generated to SDK
* Authorize with token

### App Work Stage 5 (Using SDK)

* Show the SDK calling demo page
* Use SDK calling demo instead of widgets