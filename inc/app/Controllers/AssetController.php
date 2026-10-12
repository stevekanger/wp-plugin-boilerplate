<?php

declare(strict_types=1);

namespace WpPluginBoilerplate\Controllers;

use WpPluginBoilerplate\Config\AppConfig;
use WpPluginBoilerplate\Core\AbstractController;

defined('ABSPATH') || exit;

/**
 * AssetController class.
 *
 * This is the controller responsible for handling assets.
 * Enqueuing scripts, etc.
 *
 * @since 0.1.0
 */
final class AssetController extends AbstractController {
    /**
     * Register asset hooks.
     *
     * @since 0.1.0
     */
    public function register(): void {
        // Uncomment if you need to enqueue client scripts
        // add_action('wp_enqueue_scripts', [$this, 'enqueue_client_assets']);

        // Uncomment if you need to enqueue admin scripts
        // add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
    }

    /**
     * Enqueue the client side scripts.
     *
     * @since 0.1.0
     */
    public function enqueue_client_assets(): void {
        // enqueue js
        wp_enqueue_script(
            AppConfig::prefix('client'),
            AppConfig::root_dir_url('/build/client/index.js'),
            [],
            AppConfig::version(),
            [],
        );

        // enqueue css
        wp_enqueue_style(
            AppConfig::prefix('client'),
            AppConfig::root_dir_url('/build/client/index.css'),
            [],
            AppConfig::version(),
        );
    }

    /**
     * Enqueue the admin side scripts.
     *
     * @return void
     *
     * @since 0.1.0
     */
    public function enqueue_admin_assets() {
        // enqueue js
        wp_enqueue_script(
            AppConfig::prefix('admin'),
            AppConfig::root_dir_url('/build/admin/index.js'),
            [],
            AppConfig::version(),
            [],
        );

        // enqueue css
        wp_enqueue_style(
            AppConfig::prefix('admin'),
            AppConfig::root_dir_url('/build/admin/index.css'),
            [],
            AppConfig::version(),
        );
    }
}
