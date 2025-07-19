<?php

namespace App\Models\Inventory;

use App\Models\Tag;
use App\Models\Category;
use Illuminate\Support\Str;
use App\Models\Formulation\Phase;
use App\Models\Inventory\Supplier;
use Illuminate\Support\Facades\DB;
use Spatie\Activitylog\LogOptions;
use App\Models\Formulation\Formula;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ingredient extends Model
{
    use LogsActivity, SoftDeletes, HasFactory;

    
    protected $connection = 'central';

    protected $fillable = [
        'name',
        'inci_name',
        'cas_number',
        'ec_number',
        'slug',
        'description',
        'state_of_matter',
        'created_by',
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
            'deleted_at' => 'datetime',
        ];
    }

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categorizable')->withPivot('id');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function suppliers()
    {
        return $this->morphToMany(
            Supplier::class,        // related model
            'supplyable',           // morph name: defines supplyable_id + supplyable_type
            'supplyables',          // pivot table name
            'supplyable_id',        // this model’s foreign key on pivot
            'supplier_id'           // related model’s foreign key on pivot
        )
        ->withPivot('url') // Only include pivot table columns that actually exist
        ->select([
            'suppliers.id',
            'suppliers.name',
            'suppliers.slug',
            'suppliers.description',
            // The 'url' is already included via withPivot and will be available as pivot.url
        ]);
    }

    public function status()
    {
        return $this->trashed() ? 'Inactive' : 'Active';
    }
    
    public function getUrlAttribute()
    {
        return $this->suppliers->pluck('pivot.url')->first();
    }

    public function formulas()
    {
        return $this->belongsToMany(
            Formula::class,   // the related model
            'phases', // ← pivot table name
            'ingredient_id',  // this model’s FK on the pivot
            'formula_id'      // related model’s FK on the pivot
        )
        ->using(Phase::class) // hydrate pivot as your custom Pivot
        ->withPivot([
            'name',
            'percentage_weight_per_weight',
            'is_qs',
            // add any other pivot columns you need…
        ]);
    }
    
    
    /**
     * Get the activity log options for the User model.
     *
     * @return LogOptions
     */

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->useLogName('Ingredient')
        ->logOnlyDirty()
        ->logOnly([
            'name',
            'inci_name',
            'cas_number',
            'ec_number',
            'slug',
            'description',
            'state_of_matter',
            'created_by',
        ]);
    }
    
    /**
     * When the model is booted, automatically set the slug based on the name
     * 
     * @return void
     */
    protected static function booted()
    {
        static::saving(function (Ingredient $ingredient) {
            if ($ingredient->isDirty('name')) {
                $ingredient->slug = Str::slug($ingredient->name);
            }
        });
    }
}
