<?php

declare(strict_types=1);

namespace WpPluginBoilerplate\Controllers;

use WpPluginBoilerplate\App;

defined('ABSPATH') || exit;

/**
 * AssetController class.
 *
 * This is the controller responsible for handling assets.
 * Enqueuing scripts, etc.
 *
 * @since 1.0.0
 */
final class AssetController extends AbstractController {
    /**
     * AssetController class constructor.
     *
     * @param string $prefix The app prefix
     * @param string $build_dir_url The url to the build dir
     * @param string $version The app version
     *
     * @since 1.0.0
     */
    public function __construct(
        private readonly string $prefix,
        private readonly string $build_dir_url,
        private readonly string $version,
    ) {
    }

    /**
     * Creates an instance of the class.
     *
     * @param App $app The app instance
     *
     * @since 1.0.0
     */
    public static function make(App $app): static {
        return new static(
            prefix: $app->prefix(),
            build_dir_url: $app->build_dir_url(),
            version: $app->version()
        );
    }

    /**
     * Register asset hooks.
     *
     * @since 1.0.0
     */
    public function register(): void {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_client_assets']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
    }

    /**
     * Enqueue the client side scripts.
     *
     * @since 1.0.0
     */
    public function enqueue_client_assets(): void {
        // enqueue js
        wp_enqueue_script(
            $this->prefix . '_client',
            $this->build_dir_url . '/client/index.js',
            [],
            $this->version,
            [],
        );

        // enqueue css
        wp_enqueue_style(
            $this->prefix . '_client',
            $this->build_dir_url . '/client/index.css',
            [],
            [],
            $this->version,
        );
    }

    /**
     * Enqueue the admin side scripts.
     *
     * @return void
     *
     * @since 1.0.0
     */
    public function enqueue_admin_assets() {
        // enqueue js
        wp_enqueue_script(
            $this->prefix . '_admin',
            $this->build_dir_url . '/admin/index.js',
            [],
            $this->version,
            [],
        );

        // enqueue css
        wp_enqueue_style(
            $this->prefix . '_admin',
            $this->build_dir_url . '/admin/index.css',
            [],
            [],
            $this->version,
        );
    }
}
