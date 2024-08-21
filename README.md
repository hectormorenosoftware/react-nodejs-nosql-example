This is a Full Stack Web Application to track the progress of sprints, employee tasks, and status of employee tasks using different databases for development and production in React JS, Node JS, and NOSQL made by Hector Moreno Gomez. This software will allow you to track the status of your sprint by adding notes for each employee task. You can set the status of each employee's task to "not started", "in progress", "verifying", and "done" and you can also change the length of your sprint at any time.

To start server in development mode:

NODE_ENV=development node index.js

To start server in production mode:

NODE_ENV=production node index.js

To view ui:
http://localhost:5000

To login:
userName: JosePascal
password: testing

Remember that in the folder "nosqldatabase" in the file administrators_dev.json or administrators_prod.json you can find a username and password for you to log in.

To deploy into the internet without using AWS to have full control of your data use a tunnel through ngrok.
https://ngrok.com/

Or you can deploy this application using Heroku. Heroku is a cloud based company that is owned by Salesforce.

www.heroku.com

https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

To use FaceTime to make calls if you are using OSX

1. Command + Space(Search for FaceTime).
2. Once you have FaceTime open on the left corner in the top next to the Apple icon in your Mac
   ,Macbook Air, or Macbook Pro click on the FaceTime text and in the drop-down menu choose Preferences.
3. In the section "Default for Calls:" click on the drop-down menu and choose FaceTime to be able to use
   FaceTime to call employees once you click on a phone number.

Note: I chose Node JS as the technology for my server because of libuv the C library that implements the Node.js event loop, its worker threads and all of the asynchronous behaviors of the platform.

Created by: Hector Moreno Gomez
