# Features

* Show the price per unit for local market ads
* Show the ETA of ships as actual date-time
* Show the ETA in flightplan as actual date-time
* Show the production order completion as actual date-time
* Show price per shipload for shipping ads
* Limit long user names in chat to 12 chars
* Show price per unit when posting local market ads
* Sort inventories by material code
* Change LM Post button to the type of ad

# Installation
[![CircleCI](https://circleci.com/gh/YarekTyshchenko/PMMGBeautifier.svg?style=shield)](https://circleci.com/gh/YarekTyshchenko/PMMGBeautifier)

For Chrome install from the [Web Store](https://chrome.google.com/webstore/detail/pmmg-beautifier/joibdcdllfaoegdpjkefncnmcmbkkabi)

For Firefox you need to install this extension manually (see below for instructions). 

## Contributing

The structure of this project is designed to be friendly to contributions.
Each feature is split into a module that can be worked on independently
from others. If a module is causing performance problems, it can be disabled
in the sidebar.

If you want to add a feature start by doing this:
- Clone this repository
- Create a branch with your feature's name
- Temporarily disable PMMGBeautifier if you installed it via web store 
- Follow setup instructions in the section below, and load your locally built copy
- Test that it works on the `test.html` file

You are now ready to begin hacking!
- Run the build process, and watch for any typescript errors as you work
- Create a new module in `src/` which follows the `Module` interface
- Instantiate it in `main.ts` and add it into the array of modules
- Iterate on your module until it works, commit often!

Each module has a `cleanup` and `run` method, they run once per second.
Your module should create or attach itself to any UI element that you need
to tweak. On cleanup you should do the reverse, and ensure the UI is
restored back to its original state. This ensures that when the module is
disabled, the UI isn't broken. Have a look at existing modules for inspiration
but be aware that some may need refactoring. Ask if you have questions.

When you are happy with how it works submit a Pull Request to this repository.
One of us will review it, suggest feedback with the goal of merging it in.
Be aware that as number of users of this extension grows, so does our care for
not breaking any existing features, or the interface itself. We might not be
able to accept all contributions if they cause stability issues.

Once your PR is merged, a new version of the extension will be automatically
published to the chrome web store.

## Development

Requirements: `nodejs`, `npm` (or `yarn` works too)

Webpack is used to create javascript from typescript, and puts everything into
`dist/` dir.
You can load that directly using "load unpacked" extension pointing to `dist`.
Keep the build command running to make it rebuild as you edit typescript files.
```bash
npm install
npm run build
```

There is a test file that you can use while developing so you don't have to
refresh the real website many times. Add snippets of HTML to it for your new
features, but consider it a temporary tool, we might wipe it if it gets too
out of hand

## Chrome

* Open Chrome Extensions Screen
* Enable Dev-Mode
* Select `Load unpacked` and browse to the `dist` folder where the build output is
* that's it

## Firefox

* Open `about:debugging` in Firefox
* Select `Load Temporary Add-on` and select the `manifest.json` from this repo
* that's it

## Deployment and Publishing

The extension is automatically built and deployed via Circle CI, but only on
branches `ci` and `master` (and published only on `master`). Setup so we
can debug CI builds correctly.
