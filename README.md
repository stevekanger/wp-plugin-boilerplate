# Wordpress plugin boilerplate

Boilerplate wordpress plugin. This plugin encourages a modern structure and has support for autoloading via composer, docker, webpack, wordpress blocks, tons of build tools and more.

MVC style structure with Dependency Injection for the core plugin class. Obviously this is not a true MVC because we are dealing with wordpress but at its base you have

- Models: for when you need to get something from the database.
- Views: which show a template part.
- Controllers: where you intereact with wordpress via hooks and filters.

You can also have Services for external API's, Databases, etc.

## Folder structure

All php files reside in `inc`. All `psr-4` classes will be autoloaded via `composer` from the `app` folder.

All raw js, css, and blocks reside in `src`. These are files that need to be built during the build process.

## Installation

```bash
git clone https://github.com/stevekanger/wp-plugin-boilerplate

```

first run

```bash
npm install

```

Then you can run the init script to bootstrap your plugin. This will prompt you for your information.

```bash
npx ts-node ./dev-tools/init

```

After running the init script you can then run.

```bash
composer install

composer dump-autoload

```

And now your plugin is all setup

## Usage

### Docker

This plugin has docker set up to control the development environment. You don't have to use docker but its definitely recommended to ensure your plugin works with your target Wordpress/Php versions. You must have `docker` and `docker-compose` installed.

The `debug.log` file from the container is also set to appear in the plugins root directory for easy debugging. Docker env variables for php and wordpress versions will be set when running the init script.

### Dev Scripts

Build run.

```bash
npm run build

```

Development run.

```bash
npm run dev

```

To archive your plugin for distribution run.

```bash
npm run archive:plugin

```

To archive your entire development version of the plugin. This can be handy if your developing for a client and need to ship the entire plugin contents.

```bash
npm run archive:dev

```

## Blocks

### Create a block

Create a block in the `src/blocks` directory with either of the following methods.

Use the `create:block` npm script supplied. Block information can be controlled in the `dev-tools/config.ts` file. Any additional `block.json` defaults may be placed in `createBlock.json`.

Then just run the command below specifying the block type `dynamic` or `static` and changing `my-block` to your desired block slug:

( Note: the slug should be dash seperated. Eg. `my-block` )

```bash
npm run create:block dynamic my-block

```

The script will create your block files. Block files will use typescript by default. Go to the block folder at `src/blocks/my-block`. Then edit the `block.json` file to your liking. The `create:block` script uses basically the same templates wordpress does `https://github.com/WordPress/gutenberg/tree/trunk/packages/create-block/lib/templates/block` located in the `dev-tools/createBlock/templates` folder. They have been modified slightly for use with typescript.

Alternatively you can just use the wordpress `@wordpress/create-block` interactive script if you just want regular `.js` files or prefer the interactive script. Just make sure you point your `--target-dir` to the `src/blocks` folder.

```bash
npx @wordpress/create-block@latest --no-plugin --target-dir=resources/blocks/my-block

```

### Register a block

Once you have successfully created a block all you have to do is add the block slug to the `register` array in `inc/config/block-config.php`. This array assumes your blocks source files are located in the `src/blocks` folder and built to `build/blocks` folder.

## Testing

Js testing is done with `vitest` and php testig is done with `phpunit` and the wordpress phpunit test suite.

for js run

```bash
npm run test
```

for php run

```bash
composer test
```

The wordpress testing suits are installed from `https://develop.svn.wordpress.org/tags`. It will be installed via custom composer repository and use whatever wordpress version you picked when running the init script.

## Updating php and wordpress versions

The choice is up to you how you want to keep your plugin current. In `.env` you can specify your php and wordpress versions.

For every wordpress release in the future you will need to update the `composer.json` wordpress testing suite manually. So if you change versions in your `.env` file for docker you would want to update `composer.json` to match your wordpress version. Then run `composer update`.
