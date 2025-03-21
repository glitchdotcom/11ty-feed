# Feed page for 11ty blog with Fastly Compute

This starter kit turns a JSON feed from an 11ty site into a web page in a Fastly Compute app written in JavaScript.

* The app uses a default origin website as its backend `glitchdotcom.github.io` with the sample site at `/my-site/`: [glitchdotcom.github.io/my-site/](https://glitchdotcom.github.io/my-site/)
  * The sample site is a variant of the [Eleventy Base Blog](https://demo-base-blog.11ty.dev/) which you can also [clone and deploy to Github Pages](https://github.com/glitchdotcom/my-site) if you like – **update the `package.json` mentions of `my-site` to your repo name in your clone**
* The app uses [Expressly](https://expressly.edgecompute.app/) for routing requests with the [Fastly JavaScript Compute SDK](https://js-compute-reference-docs.edgecompute.app/docs/)
* The `/feed/feed.json` endpoint turns the JSON into HTML

You can use this starter kit out of the box with the default backend, or you can use your own website by changing it in the `fastly.toml` section `[setup.backends.blog]` and changing the `root` variable in the `src/index.js` file __before you deploy the app for the first time__ (otherwise you need to update the backend address via the Fastly CLI).

⏲️ _Stay tuned for more including a tutorial series on using this starter kit..._

> This repo is cloned from the [default starter kit for Expressly](https://github.com/fastly/compute-starter-kit-javascript-expressly).

## Demo

Explore an example of what this starter does: [informally-one-shrimp.edgecompute.app/my-site/](https://informally-one-shrimp.edgecompute.app/my-site/)

![Feed page](https://github.com/user-attachments/assets/f669c809-6e44-468d-be87-46ade8cd6531)

## 1. Setup

Develop with the project locally by [installing the Fastly tools](https://www.fastly.com/documentation/guides/compute/) and starting a new Compute project.

Create a new directory and navigate to it in your Terminal. Install the CLI:

```
npm install -g @fastly/cli
```

Start a new Compute project using this app as a template:

```
fastly compute init --from=https://github.com/glitchdotcom/11ty-feed
```

> 💡 Include the flag `--accept-defaults` if you don't want to choose all the details.

Install dependencies: `npm install`

Run `fastly profile create` and set the token you copied from your account as the value.

> 💡 You can [authenticate in other ways](https://www.fastly.com/documentation/reference/tools/cli/#configuring). 

By default the edge app will use `glitchdotcom.github.io` as its origin, but you can change it to use your own site if you like:

* In the `fastly.toml` file, change the `backend` address to your domain
* In `src/index.js` change the `root` variable to the path for your site or "/"

## 2. Publish your app

Once you have the repo installed locally and your API token set up in your environment, use the publish command to deploy the app to a Compute service:

```
fastly compute publish
```

Your terminal will output the address of your new Compute app – make sure you open the path set as `root` in `src/index.js` which is `my-site` by default.

* Open the site at `your-project.edgecompute.app/my-site/` changing `my-site` if you used a different root
* Check out the feed page:
  * Example: [informally-one-shrimp.edgecompute.app/my-site/feed/feed.json](https://informally-one-shrimp.edgecompute.app/my-site/feed/feed.json)

## 3. Edit your code 

Make an edit to your Compute app to learn what else you can do at the edge! 

Fastly gives you access to lots of other information about the user request. Check out the docs for [Expressly](https://expressly.edgecompute.app/docs/handling-data/request), and the [code examples](https://www.fastly.com/documentation/solutions/examples/) for functionality you can build into your app.

Each time you edit your Compute code, run the publish command again and give it a minute to deploy your changes!

## Help

[Get help on the Fastly community forum!](https://community.fastly.com)
