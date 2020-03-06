<?php 

namespace Migrations;

use Database\Connection;

class Schema
{
    private function __construct()
    {
        //NO body will be able to create instance of this class.
    }

    /**
     * Create new table if it does not exist
     * 
     * @param string $table_name
     * @param array | mixed $column_data
     * @return void;
     */
    public static function create($table_name, $column_data)
    {
        $query = 'CREATE TABLE IF NOT EXISTS ' .$table_name.' (';
        foreach ($column_data as $column => $type) {
            $query .= $column.' '.implode(' ', $type).', ';
        }
        $query = rtrim($query, ', ');
        $query .= ') ENGINE = INNODB;';
        Connection::getInstance()->query($query);
    }
}