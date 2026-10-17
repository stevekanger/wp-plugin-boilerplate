<?php

declare(strict_types=1);

namespace WpPluginBoilerplate;

use WpPluginBoilerplate\Config\AppConfig;
use WpPluginBoilerplate\Core\Container;

defined('ABSPATH') || exit;

/**
 * Main application class.
 *
 * @since 0.1.0
 */
final class App {
    /**
     * Setup the App attributes.
     *
     * @param Container $container The service container
     *
     * @since 0.1.0
     */
    public function __construct(
        private Container $container,
    ) {
    }

    /**
     * Initializes any application specific functionality.
     *
     * @since 0.1.0
     */
    public function init(): static {
        // Plugin activation hooks
        $root_file = AppConfig::root_file();
        register_activation_hook($root_file, [$this, 'activate']);
        register_deactivation_hook($root_file, [$this, 'deactivate']);

        return $this;
    }

    /**
     * Gets the service container.
     *
     * @since 0.1.0
     */
    public function get_container(): Container {
        return $this->container;
    }

    /**
     * Plugin activation hook.
     *
     * @since 0.1.0
     */
    public function activate(): void {
        flush_rewrite_rules();
    }

    /**
     * Plugin deactivation hook.
     *
     * @since 0.1.0
     */
    public function deactivate(): void {
        flush_rewrite_rules();
    }
}
