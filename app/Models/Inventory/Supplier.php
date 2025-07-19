<?php

namespace App\Models\Inventory;

use App\Models\Tag;
use App\Models\Category;
use Illuminate\Support\Str;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
{
    
    use LogsActivity, SoftDeletes, HasFactory;

    protected $connection = 'central';

    protected $fillable = [
        'name',
        'slug',
        'email',
        'phone',
        'address',
        'city',
        'state_province',
        'country',
        'zip_postal_code',
        'description',
        'website',
        'notes',
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
        return $this->morphToMany(Category::class, 'categorizable');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function ingredients()
    {
        return $this->morphedByMany(Ingredient::class, 'supplyable')
                ->withPivot('url','unit','cost_per_unit','currency')
                ->join('suppliers', 'suppliers.id', '=', 'supplyables.supplier_id')
                ->select([
                    'ingredients.*',
                    'supplyables.url',
                    'supplyables.unit',
                    'supplyables.cost_per_unit',
                    'supplyables.currency',
                    'suppliers.slug as supplier_slug',
                ]);;
    }

    public function status()
    {
        return $this->trashed() ? 'Inactive' : 'Active';
    }

    public function getRouteKeyName()
    {
       return 'slug'; 
    }
    
    public function getUrlAttribute()
    {
        return $this->supplyable->pluck('url')->first();
    }
    
    
    /**
     * Get the activity log options for the User model.
     *
     * @return LogOptions
     */

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->useLogName('Supplier')
        ->logOnlyDirty()
        ->logOnly([
            'name',
            'slug',
            'email',
            'phone',
            'address',
            'city',
            'state_province',
            'country',
            'zip_postal_code',
            'description',
            'website',
            'notes',
        ]);
    }

    protected static function booted()
    {
        static::saving(function (Supplier $supplier) {
            if ($supplier->isDirty('name')) {
                $supplier->slug = Str::slug($supplier->name);
            }
        });
    }
}
