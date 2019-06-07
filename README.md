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
  * `widget.ejs` code to embed the widgets into our app
  * `stage4.ejs` authorizes a guest token with the SDK
  * `stage5.ejs` makes a call with the SDK

## Workshop

### Preliminary Setup

* Set up a webex for developers account
  * <https://developer.webex.com/>
* Creating a guest issuer application
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
  * Copy generated token and paste it into <https://jwt.io>
  * The "payload" section should have two things:
    * `"name": "SDK Workshop"`
    * `"iss":` your guest issuer ID

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
  * Verify JWT has entered user name via <https://jwt.io>
  * The "payload" section should have two things:
    * `"name":` name you just entered
    * `"iss":` your guest issuer ID

### App Work Stage 3 (widget calling)

Now that we are creating a guest token, let's use the widgets to place our first call!

* Open the `views/widget.ejs` file
* Browse to page `/stage3` and verify widget opens.
* Try changing widget configurations
  * [View other widget configuration options here](https://github.com/webex/react-ciscospark/blob/master/packages/node_modules/@ciscospark/widget-space/README.md#configuration)
  * Edit the widget page to a new destination (your webex teams account?)
  * Edit the widget page to include messaging
  * Edit the widget to default the `initialActivity` to "message"

### App Work Stage 4 (removing the widget and using SDK to login)

The widgets are great for giving the look and feel of the Webex Teams clients, but what if you want to embed calling within your application and give it a custom feel?

We can do that with the SDK!

Let's convert our front end code to use the SDK. The first thing we need to do is authorize our guest token with the SDK.

* Open `stage4.ejs` file
* Find the `spark.authorization.requestAccessTokenFromJwt` line of code
  * This is where we login to Webex Teams with the guest token
* Browse to page `/stage4`
  * Enter your name
  * Verify that the `Authorizing` state changes to `User Authorized.`

### App Work Stage 5 (Using SDK)

Now that we have logged our guest user in with the SDK, let's take it a step further and do some calling with the SDK!

The application has been populated with the code from the [Single Party Call Demo](https://github.com/webex/spark-js-sdk/tree/master/packages/node_modules/samples/browser-single-party-call/).

At this stage, you have been given a fully working demo. Let's go through the code and find the important parts:

* Find the following lines of code:
  * `spark.authorization.requestAccessTokenFromJwt`
    * This is the same code we used in stage4 to login with our guest token
  * `function registerWithWebexTeamsCalling() {`
    * Our browser needs to "register" with Webex Teams servers in order to place calls
    * The end of this function will enable our calling button to place calls
      * `callButton.disabled = false;`
  * `const call = spark.phone.dial(destination);`
    * This is what does the actual calling in the SDK
    * The destination can be an email, SIP address, or room ID
    * The `call` object is an event emitter, that means we will get javascript events for all the things that happen during the call.
      * The `mediaStream` events let us know that video and audio have changed in the call
  * Can you find where we `hangup` the call?

#### Bonus Time

Our SDK calling page could use a bit of styling. Here are some things to try:

* Change the size of the "self view" to much smaller
* Give the video windows a nicer border
* Add a button to hide the "self view"

## Notes & Links

* SDK example is available on the developer portal at: <https://developer.webex.com/docs/sdks/browser>
