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
use WpPluginBoilerplate\Core\Container;

defined('ABSPATH') || exit;

// Require autoloader
require_once __DIR__ . '/vendor/autoload.php';

// Initialize the app config information.
AppConfig::init(
    version: get_file_data(__FILE__, ['Version' => 'Version'])['Version'] ?: '0.1.0',
    root_dir: __DIR__,
    root_file: __FILE__,
    title: 'Wp Plugin Boilerplate',
    prefix: 'wp_plugin_boilerplate',
    slug: 'wp-plugin-boilerplate',
);

// Create the service container
$container = new Container();

// Create the bootstrapper
$bootstrap = new Bootstrap($container);

// Populate container with services and shared dependencies
$bootstrap->populate_container();

// Create the app
$app = new App($container);

// Init the app
$app->init();

// Create and register controllers
$bootstrap->register_controllers();
