<?php

namespace App\Models;

use App\Models\Inventory\Supplier;
use Spatie\Activitylog\LogOptions;
use App\Models\Formulation\Formula;
use App\Models\Inventory\Ingredient;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use LogsActivity, SoftDeletes;

    protected $connection = 'central';
    
    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    public function categorizables()
    {
        return $this->morphedByMany(null, 'taggable');
    }

    public function formulas()
    {
        return $this->morphedByMany(Formula::class, 'taggable');
    }

    public function ingredients()
    {
        return $this->morphedByMany(Ingredient::class, 'taggable');
    }

    public function suppliers()
    {
        return $this->morphedByMany(Supplier::class, 'taggable');
    }
    
    /**
     * Get the activity log options for the User model.
     *
     * @return LogOptions
     */

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->useLogName('Category')
        ->logOnlyDirty()
        ->logOnly([
        'name',
        'slug',
        'description',
        ]);
    }
}
