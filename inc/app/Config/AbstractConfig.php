<?php

declare(strict_types=1);

namespace WpPluginBoilerplate\Config;

use WpPluginBoilerplate\App;
use WpPluginBoilerplate\Core\MakeableInterface;

defined('ABSPATH') || exit;

/**
 * AbstractConfig class.
 *
 * @since 1.0.0
 */
abstract class AbstractConfig implements MakeableInterface {
    /**
     * Creates an instance of the class.
     *
     * @param App $app The service continer
     *
     * @since 1.0.0
     */
    public static function make(App $app): static {
        return new static();
    }
}
