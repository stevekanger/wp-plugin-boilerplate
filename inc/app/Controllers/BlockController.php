<?php

declare(strict_types=1);

namespace WpPluginBoilerplate\Controllers;

use WpPluginBoilerplate\Core\Controller;
use WpPluginBoilerplate\Core\PluginConfig;

defined('ABSPATH') || exit;

/**
 * Block Controller.
 *
 * This controller sets up your wordpress blocks and block related functions
 *
 * @since 0.1.0
 */
final class BlockController extends Controller {
    /**
     * Register block hooks.
     *
     * @since 0.1.0
     */
    public function register(): void {
        add_action('init', [$this, 'register_all_blocks']);
    }

    /**
     * Register single block.
     *
     * @param string $slug The blocks slug
     *
     * @since 0.1.0
     */
    public function register_block(string $slug) {
        $blocks_dir = PluginConfig::root_dir('/build/blocks/');
        $block_path = $blocks_dir . $slug;
        register_block_type($block_path);
    }

    /**
     * Register all blocks.
     *
     * This function will scan the build/blocks folder, and register all available blocks.
     * It assumes any folder in this directory is a wordpress block to register
     *
     * @since 0.1.0
     */
    public function register_all_blocks(): void {
        $block_slugs = PluginConfig::config('block-config')['register'];

        foreach ($block_slugs as $slug) {
            $this->register_block($slug);
        }
    }
}
