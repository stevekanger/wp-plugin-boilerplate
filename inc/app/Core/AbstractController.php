<?php

declare(strict_types=1);

namespace WpPluginBoilerplate\Core;

defined('ABSPATH') || exit;

/**
 * AbstractController class.
 *
 * @since 0.1.0
 */
abstract class AbstractController {
    /**
     * Creates an instance of the class.
     *
     * @param Container $container The service container
     *
     * @since 0.1.0
     */
    public static function create(Container $container): static {
        return new static($container);
    }

    /**
     * Called when the application initalizes to register wordpress hooks, etc.
     *
     * @since 0.1.0
     */
    abstract public function register(): void;
}
