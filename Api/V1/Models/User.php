<?php

namespace Api;

use Api\V1\Models\Model;

class User extends Model
{
	// object properties
	public $columns = ['id', 'name', 'email', 'password', 'created_at', 'updated_at'];	
}