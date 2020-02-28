<?php

namespace Migrations;

use Migrations\Schema;

Schema::create('users', [
    'id' => ['INT', 'AUTO_INCREMENT', 'PRIMARY KEY'],
    'name' => ['VARCHAR(255)', 'NOT NULL'],
    'email' => ['VARCHAR(255)', 'NOT NULL', 'UNIQUE'],
    'password' => ['VARCHAR(255)', 'NOT NULL'],
    'created_at' => ['TIMESTAMP', 'DEFAULT CURRENT_TIMESTAMP'],
    'updated_at' => ['TIMESTAMP', 'DEFAULT CURRENT_TIMESTAMP'],
]);