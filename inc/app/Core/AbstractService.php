<?php

declare(strict_types=1);

namespace WpPluginBoilerplate\Core;

defined('ABSPATH') || exit;

/**
 * AbstractService class.
 *
 * @since 0.1.0
 */
abstract class AbstractService {
    /**
     * Construct the class attributes.
     *
     * @param Container $container The service container
     *
     * @since 0.1.0
     */
    public function __construct(
        protected Container $container,
    ) {
    }

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
}
