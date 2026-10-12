<?php

declare(strict_types=1);

/**
 * Plugin Name: Wp Plugin Boilerplate
 * Plugin Uri:
 * Author: Steve Kanger
 * Author URI:
 * Description: Wp plugin boilerplate.
 * Version: 0.1.0
 * Requires at least: 7.1.3
 * Tested up to: 7.1.3
 * Requires PHP: 8.3
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:
 * Text Domain: wp-plugin-boilerplate
 * Requires Plugins:
 */

namespace WpPluginBoilerplate;

use WpPluginBoilerplate\Config\AppConfig;
use WpPluginBoilerplate\Controllers\AssetController;
use WpPluginBoilerplate\Controllers\BlockController;
use WpPluginBoilerplate\Core\Container;

defined('ABSPATH') || exit;

// Require autoloader
require_once __DIR__ . '/vendor/autoload.php';

// Initialize the app config information.
AppConfig::init(
    get_file_data(__FILE__, ['Version' => 'Version'])['Version'] ?: '0.1.0',
    __DIR__,
    __FILE__,
    'Wp Plugin Boilerplate',
    'wp_plugin_boilerplate',
    'wp-plugin-boilerplate',
);

// Create the service container
$container = new Container();

// If you have any services bind them to the container. Example:
// $container->bind(ExampleService::class, ExampleService::create(...));

// Create the app
$app = new App($container);

// Init the app
$app->init();

// Register controllers
$app->register_controller(AssetController::create(...));
$app->register_controller(BlockController::create(...));
