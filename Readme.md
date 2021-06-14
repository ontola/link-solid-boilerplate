# Link Solid Component Boilerplate

A basic boilerplate for creating Solid Components which can also run as standalone apps.

It uses react and Link-Redux to render [linked data](https://ontola.io/what-is-linked-data/).

## Reference material

- Link-Redux [docs](https://fletcher91.github.io/link-redux/) & [wiki](https://github.com/fletcher91/link-redux/wiki)
- [About Solid](https://github.com/solid/solid)

## Get started

- Clone this repo `git clone git@github.com:ontola/link-solid-boilerplate.git`
- Install dependencies `yarn`
- Run the server `yarn serve`
- Visit `http://localhost:1234`
- Enter a public Pod URL, e.g. `https://joep.inrupt.net/public/`

## Edit the View

Go to the `./src/views/foaf/Person.jsx` file to understand how Link renders a Person.

## Deploying to github pages

`gh-pages -d ./dist/app`
