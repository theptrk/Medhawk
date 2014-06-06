Set up Medhawk Client
=====================

## Building this project

You will need the ionic utility to build, emulate or package this project.

You can get it using npm like so:

```bash
$ sudo npm install -g ionic
```

Then run:

```bash
$ ionic platform ios
$ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git
$ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git
$ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-dialogs.git

$ ionic build ios
$ ionic emulate ios


```

to emulate. After building you can open the project in xcode for final
packaging as an ios application.


You will need bower to install client dependencies:

cd into the client directory
```bash
$ bower install
``` 

## File changes
All app changes are done in the "www" directory 
  within the file www/app/config.js, change SERVERPATH to the server address you want
  