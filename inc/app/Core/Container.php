<?php

declare(strict_types=1);

namespace WpPluginBoilerplate\Core;

/**
 * Container for services, etc.
 *
 * @since 0.1.0
 */
final class Container {
    private array $bindings = [];
    private array $instances = [];

    /**
     * Get all bound IDs.
     *
     * @since 0.1.0
     */
    public function get_ids(): array {
        return array_keys($this->bindings);
    }

    /**
     * Check if a binding exists.
     *
     * @param string $id The id to check
     *
     * @since 0.1.0
     */
    public function has(string $id): bool {
        return isset($this->bindings[$id]);
    }

    /**
     * Bind to the container.
     *
     * @param string $id Any string id to act as the key
     * @param callable $factory A function that returns an instance
     *
     * @since 0.1.0
     */
    public function bind(string $id, callable $factory): static {
        $this->bindings[$id] = $factory;

        return $this;
    }

    /**
     * Get from the container.
     *
     * @template T
     *
     * @param class-string<T> $id The class id
     *
     * @return T
     *
     * @since 0.1.0
     */
    public function get(string $id): mixed {
        if (!isset($this->bindings[$id])) {
            throw new \RuntimeException("No container binding found for {$id}");
        }

        if (!isset($this->instances[$id])) {
            $this->instances[$id] = $this->bindings[$id]($this);
        }

        return $this->instances[$id];
    }
}
