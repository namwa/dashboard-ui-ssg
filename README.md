This dashboard is built using a hand built Static Site Generator (SSG), Tailwind CSS and Alpine.js.

It has no npm install or node modules dependencies as it's used Tailwind CLI to compile the styles.

[Demo site](https://misty-slopes.web.app/)

## Installation
- SSG tool
- Tailwind CLI

## Production

-  ```./build.sh``` to minify css

- ```sitebuild build``` to build the site

- ```sitebuild genroutes``` to generate routes to be used in Firebase Hosting. Copy the output and paste the routes in `firebase.json`, which is an array of `rewrites`.

- Deploy for hosting

## Development

- ```./watch.sh``` to watch for styles change.

- ```sitebuild serve``` for local server.
