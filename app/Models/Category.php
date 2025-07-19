<?php

namespace App\Models;

use App\Models\Inventory\Supplier;
use Spatie\Activitylog\LogOptions;
use App\Models\Formulation\Formula;
use App\Models\Inventory\Ingredient;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Category extends Model
{
    use LogsActivity, SoftDeletes;

    protected $connection = 'central';
    
    protected $fillable = [
        'name',
        'slug',
        'class',
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
    
    public function formulas()
    {
        return $this->morphedByMany(Formula::class, 'categorizable');
    }

    public function ingredients()
    {
        return $this->morphedByMany(Ingredient::class, 'categorizable');
    }

    public function suppliers()
    {
        return $this->morphedByMany(Supplier::class, 'categorizable');
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
        'class',
        'description',
        ]);
    }
}
