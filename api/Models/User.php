<?php

namespace Models;

use Models\Model;

class User extends Model
{
	/**
	 * Specify which fields you can't fill 
	 * 
	 * @param array
	 */
	protected $guarded = ['id'];
}