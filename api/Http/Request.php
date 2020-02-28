<?php

namespace Http;

class Request 
{
    /**
     * Parse normal request to create object
     * 
     * @param mixed
     * @return void
     */
    public function __construct($data)
    {
        foreach ($data as $key => $value) {
            $this->$key = htmlspecialchars(stripslashes($value), 'ENT_QUOTES', 'UTF-8');
        }
    }

    /**
     * Returns data of only key specified
     * 
     * @param array
     * @return array
     */
    public function only($keys)
    {
        $data = [];

        foreach ($keys as $key) {
            $data[$key] = $this->$key;
        }

        return $data;
    }
}