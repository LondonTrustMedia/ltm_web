# London Trust Media Holdings

https://londontrustmedia.com/

## Getting started

### Development

For local development, head to the `src` folder and run a web server of your choice to check your changes locally.

```bash
# in /src folder
$ python -m SimpleHTTPServer
# head to localhost:8000
```

:warning: Once you're done with your changes, remember to run and commit the new build.

```
$ npm i # install the dependencies necessary to run the build
$ npm run build
```

The new build can be then found in the `dist` directory.

The HTML/CSS has been built following the [BEM](http://getbem.com/introduction/) methodology.

### Production

For production deployment, we have a simple taskr build that:
1. post-processes & minifies HTML & CSS files
2. adds a suffix to the CSS files for cache-busting

Run the production build:

```
$ npm i # install the dependencies necessary to run the build
$ npm run build
```

## Gotchas

- The fonts are inlined in the CSS to avoid the Flash of Unstyled Text (FOUT)
- When adding new images, remember to optimize them (svg: `svgo`, png: `pngquant`, jpg: `jpegoptim`)
