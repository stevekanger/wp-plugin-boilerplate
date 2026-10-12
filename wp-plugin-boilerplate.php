<?php

declare(strict_types=1);

/**
 * Plugin Name: Wordpress Plugin Boilerplate
 * Plugin Uri:
 * Author:
 * Author URI:
 * Description:
 * Version: 0.1.0
 * Requires at least: 7.0
 * Tested up to: 7.0
 * Requires PHP: 8.3
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:
 * Text Domain: wp-plugin-boilerplate
 * Requires Plugins:
 */

namespace WpPluginBoilerplate;

use WpPluginBoilerplate\Core\Container;
use WpPluginBoilerplate\Core\Plugin;
use WpPluginBoilerplate\Core\PluginConfig;

defined('ABSPATH') || exit;

// Require autoloader
require_once __DIR__ . '/vendor/autoload.php';

/*
 * Initialize the plugin config information.
 *
 * Remember to update the version here for every release.
 *
 * @since 0.1.0
 */
PluginConfig::init(
    '0.1.0',
    __DIR__,
    __FILE__,
    'Wordpress Plugin Boilerplate',
    'wordpress_plugin_boilerplate',
    'wordpress-plugin-boilerplate',
);

/**
 * Get the plugin instance.
 *
 * If there is no running instance then initialize and assign it to the $instance.
 *
 * @since 0.1.0
 */
function get_plugin(): Plugin {
    static $instance = null;

    if (!$instance) {
        // Setup plugin dependencies
        $container = new Container();

        // Setup the plugin
        $instance = new Plugin($container);
        $instance->init();
    }

    return $instance;
}

// Start the plugin
$plugin = get_plugin();
