<?php

declare(strict_types=1);

namespace PluginNamespace\Controllers;

use PluginNamespace\Core\Controller;

defined('ABSPATH') || exit;

/**
 * Example Controller.
 *
 * Connect to wordpress through hooks and filters with your controllers
 *
 * @since 0.1.0
 */
final class ExampleController extends Controller {
    /**
     * Regster some hooks here.
     *
     * @since 0.1.0
     */
    public function register(): void {
    }
}
