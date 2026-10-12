<?php

declare(strict_types=1);

namespace WpPluginBoilerplate\Core;

use WpPluginBoilerplate\Traits\WpdbTrait;

defined('ABSPATH') || exit;

/**
 * Base model class.
 *
 * Models intended to be used for your data.
 * Extend this class to create your models.
 *
 * @since 0.1.0
 */
abstract class Model {
    use WpdbTrait;
}
