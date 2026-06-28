<?php

declare(strict_types=1);

namespace PluginNamespace\Models;

use PluginNamespace\Core\Model;

defined('ABSPATH') || exit;

/**
 * Example Model.
 *
 * Models for getting and setting data. Normally from the database.
 *
 * @since 0.1.0
 */
final class ExampleModel extends Model {
    /**
     * Get some data.
     *
     * @since 0.1.0
     */
    public function get(): array {
        return ['data' => 'Your data'];
    }
}
