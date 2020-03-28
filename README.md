# Features

* Show the price per unit for local market ads
* Show the ETA of ships as actual date-time
* Show the ETA in flightplan as actual date-time
* Show the production order completion as actual date-time
* Show price per shipload for shipping ads
* Limit long user names in chat to 12 chars
* Show price per unit when posting local market ads

# Installation

Right now you need to install this extension manually into Chrome or Firefox. 

## Build

[![CircleCI](https://circleci.com/gh/YarekTyshchenko/PMMGBeautifier.svg?style=shield)](https://circleci.com/gh/YarekTyshchenko/PMMGBeautifier)

The extension is automatically built and deployed via Circle CI, but only on
branches `ci` and `master` (and published only on `master`). Setup so we
can debug CI builds correctly.

Webpack is used to create javascript from typescript, and puts everything into
`dist/` dir.
You can load that directly using "load unpacked" extension pointing to `dist`.
Keep the build command running to make it rebuild as you edit typescript files.
```bash
npm install
npm run build
```

inside `dist` dir is a production manifest, which doesn't have permission for
the test file, so you might want to add `file:///*` there to both fields where
prun website appears. This has to be removed for uploading to chrome web store.

## Chrome

* Open Chrome Extensions Screen
* Enable Dev-Mode
* Select `Load unpacked` and browse to the `dist` folder where the build output is
* that's it

## Firefox

* Open `about:debugging` in Firefox
* Select `Load Temporary Add-on` and select the `manifest.json` from this repo
* that's it
