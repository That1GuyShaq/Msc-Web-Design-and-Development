<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Taggable extends Pivot
{
    // point to the taggables table
    protected $table = 'taggables';

    // make sure it uses the central connection
    protected $connection = 'central';

    // your migration gives this table an `id` column
    public $incrementing = true;

    // if you need to mass-assign timestamps or other columns:
    protected $fillable = ['tag_id', 'taggable_id', 'taggable_type'];
}
