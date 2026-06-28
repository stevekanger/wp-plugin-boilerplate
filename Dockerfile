ARG PHP_VERSION
ARG WORDPRESS_VERSION
FROM wordpress:${WORDPRESS_VERSION} AS wordpress_source
FROM php:${PHP_VERSION}-apache
WORKDIR /var/www/html

# Install system dependencies and PHP extensions
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends ghostscript; \
    rm -rf /var/lib/apt/lists/*

# Install GD and Imagick for image processing (required by SEO plugins like Rank Math, Yoast)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpng-dev libjpeg-dev libwebp-dev libmagickwand-dev && \
    docker-php-ext-configure gd --with-jpeg --with-webp && \
    docker-php-ext-install gd && \
    pecl install imagick && \
    docker-php-ext-enable imagick

# Install mysqli for WordPress database connection
RUN docker-php-ext-install mysqli

# Enable Apache modules
RUN a2enmod rewrite expires

COPY --from=wordpress_source /usr/src/wordpress /usr/src/wordpress
COPY --from=wordpress_source /usr/local/bin/docker-entrypoint.sh /usr/local/bin/
RUN chown -R www-data:www-data /usr/src/wordpress
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
