<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Categorizable extends Pivot
{
    // point to the categorizables'; table
    protected $table = 'categorizables';

    // make sure it uses the central connection
    protected $connection = 'central';

    // your migration gives this table an `id` column
    public $incrementing = true;

    // if you need to mass-assign timestamps or other columns:
    protected $fillable = ['category_id', 'categorizable_id', 'categorizable_type'];
}
