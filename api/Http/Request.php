<?php

namespace Http;

use Http\Validator;

class Request 
{
    use Validator;

    /**
     * Parse normal request to create object
     * 
     * @param mixed
     * @return void
     */
    public function __construct($data)
    {
        foreach ($data as $key => $value) {
            $this->$key = htmlspecialchars(stripslashes($value), ENT_QUOTES, 'UTF-8');
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

    /**
     * Validate request
     * 
     * @param array
     * @return array
     */
    public function validate(array $validations)
    {
        $errors = [];
        foreach ($validations as $field => $rules) {
            $messages = [];
            foreach ($rules as $rule) {
                $function_name = $rule;
                $params = [];
                $is_valid = false;

                if (strpos($rule, ':')) {
                    $temp = explode(':', $rule);
                    $function_name = $temp[0];
                    $params = explode(',', $temp[1]);
                }

                if (empty($params)) {
                    $is_valid = $this->$function_name($field, $this->$field);
                } else {
                    if (count($params) > 1) {
                        $is_valid = $this->$function_name($field, $this->$field, $params);
                    } else {
                        $is_valid = $this->$function_name($field, $this->$field, $params[0]);
                    }
                }

                if (!$is_valid) {
                    $messages[] = $is_valid;
                }
            }
            
            if (!empty($messages)) {
                $errors[$field] = $messages;
            }
        }

        if (!empty($errors)) {
            //send 422 response for validation with messages
            print_r(json_encode($errors));
            header("HTTP/1.1 422 Unprocessable entity");
            header('Connection: close');
            die();
        }
    }

}