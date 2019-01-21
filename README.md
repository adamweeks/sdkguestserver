# Building Server and Client-side Applications in Javascript with the Webex Teams SDK

In this workshop, we are going to be building an application that will allow a visitor to our site to call our support desk. 

We will be utilizing the Webex Teams SDK and the Webex Teams Widgets to build our experience.

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

### App Work Stage 2 (widget to roomkit)

* User name entry form
* Generate JWT with user name
* Verify JWT has entered user name via <https://www.jwt.io>
* Create widget js from developer portal samples
  * Add hint: `guestToken`
* User generated JWT with widget to call roomkit@sparkdemos.com

### App Work Stage 3 (chat/call widget to user)

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