<?php

namespace Http;

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
        return ucfirst($field_name).'is required.';
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
        return ucfirst($field_name).'must be a valid email address.';
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
        return ucfirst($field_name).'must have at least length of '.$min_length.'.';
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
        return ucfirst($field_name).'must have max length of '.$max_length.'.';
    }

    /**
     * Checks if field has no similar entry in database
     * 
     * @param string $field_name
     * @param string $value
     * @param array $params
     * @return true | string $message
     */
    public function unique($field_name, $value, $params)
    {
        
    }
}