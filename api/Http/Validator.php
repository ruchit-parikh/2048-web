<?php

namespace Http;

use Database\Connection;
use Exception;

trait Validator 
{
    /**
     * Checks if field is not null
     * 
     * @param string $field_name
     * @param string $value
     * @return true | string $message
     */
    public function required($field_name, $value)
    {
        if (!empty($value)) {
            return true;
        }
        return ucfirst($field_name).' is required.';
    }

    /**
     * Checks if email is valid or not
     * 
     * @param string $field_name
     * @param string $value
     * @return true | string $message
     */
    public function email($field_name, $value)
    {
        if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return true;
        }
        return ucfirst($field_name).' must be a valid email address.';
    }

    /**
     * Checks if field has specific min length
     * 
     * @param string $field_name
     * @param string $value
     * @param int $min_length
     * @return true | string $message
     */
    public function min($field_name, $value, $min_length)
    {
        if (strlen($value) >= $min_length) {
            return true;
        }
        return ucfirst($field_name).' must have at least length of '.$min_length.'.';
    }

    /**
     * Checks if field has specific max length
     * 
     * @param string $field_name
     * @param string $value
     * @param int $max_length
     * @return true | string $message
     */
    public function max($field_name, $value, $max_length)
    {
        if (strlen($value) <= $max_length) {
            return true;
        }
        return ucfirst($field_name).' must have max length of '.$max_length.'.';
    }

    /**
     * Check if field has same value as confirm-field
     * 
     * @param string $field_name
     * @param string $value
     * @param string $confirmed_value
     * @return true | string $message
     */
    public function confirmed($field_name, $value, $confirmed_value)
    {
        if ($value == $confirmed_value) {
            return true;
        }
        return ucfirst($field_name).' must be matched.';
    }

    /**
     * Checks if field has no similar entry in database
     * 
     * @param string $field_name
     * @param string $value
     * @param array $params - ['table_name', 'column_name', 'exclude_ids']
     * @return true | string $message
     */
    public function unique($field_name, $value, $params)
    {
        try {
            $query = 'SELECT * FROM '.$params[0].' WHERE '.$params[1].' = "'.$value.'"';
            
            //for update these value will be set to exclude current users email
            if (!empty($params[2])) {
                $query .= ' AND ID != "'.$params[2].'"';
            }
            $query .= ';';

            $result = Connection::getInstance()->query($query);
            if ($result->rowCount() == 0) {
                return true;
            }
        } catch (Exception $e) {
            echo "Error Details: ".$e->getMessage();
        }
        return ucfirst($field_name).' already exists in our data.';
    }

    /**
     * Checks if field has similar entry in database
     * 
     * @param string $field_name
     * @param string $value
     * @param array $params - ['table_name', 'column_name', 'match_column_name', 'match_column_value']
     * @return true | string $message
     */
    public function match($field_name, $value, $params)
    {
        try {
            $query = 'SELECT * FROM '.$params[0].' WHERE '.$params[1].' = "'.$value.'"';
            $query .= ' AND '.$params[2].' = "'.md5($params[3]).'";';

            $result = Connection::getInstance()->query($query);
            if ($result->rowCount() > 0) {
                return true;
            }
        } catch (Exception $e) {
            echo "Error Details: ".$e->getMessage();
        }
        return ucfirst($field_name).' and it\'s combination does not exist in our data.';
    }
}