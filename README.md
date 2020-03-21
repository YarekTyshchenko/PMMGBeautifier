# Features

* Show the price per unit for local market ads
* Show the ETA of ships as actual date-time
* Show the ETA in flightplan as actual date-time
* Show the production order completion as actual date-time

# Installation

Right now you need to install this extension manually into Chrome or Firefox. 

## Chrome

* Open Chrome Extensions Screen
* Enable Dev-Mode
* Select `Load unpacked` and browse to the folder where you checked out this repo
* that's it

## Firefox

* Open `about:debugging` in Firefox
* Select `Load Temporary Add-on` and select the `manifest.json` from this repo
* that's it

# Development

It uses webpack to create javascript from typescript, and puts it into `dist/` dir.
You can load that directly using "load unpacked" extension from the root dir.
Keep the build command running to make it rebuild as you edit the file.
```bash
npm install
npm run build
```
