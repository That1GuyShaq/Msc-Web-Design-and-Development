<?php

namespace App\Models\Formulation;

use App\Models\Tag;
use App\Models\User;
use App\Models\Category;
use App\Models\Taggable;
use Illuminate\Support\Str;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use App\Policies\Formulation\FormulaPolicy;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;

#[UsePolicy(FormulaPolicy::class)]

class Formula extends Model
{
    use LogsActivity, SoftDeletes;
    
    protected $connection = 'tenant';
    
    protected $fillable = [
        'name',
        'slug',
        'description',
        'notes',
        'status',
        'version',
        'created_by',
        'primary_formula',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

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

    public function versionIncrement(float $step = 0.01): void
    {
        $this->version = $this->version + $step;
        $this->save();
    }

    public function versionUp(): float
    {
        return round($this->version,0,PHP_ROUND_HALF_DOWN) + 1.00;
    }

    public function version(bool $minor = true, float $step = 0.01): void
    {
        if($minor){
            $this->version = $this->version + $step;
        }
        else{
            $this->version = round($this->version,0,PHP_ROUND_HALF_DOWN) + 1.00;
        }

        $this->save();
    }


    public function publish(): void
    {   
        if ($this->status === 'archived') {
            return;
        }
        $this->status = 'published';
        $this->save();
    }

    public function archive(): void
    {
        $this->status = 'archived';
        $this->save();
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function phases()
    {
        return $this->hasMany(Phase::class);
    }

    public function methods()
    {
        return $this->hasMany(Method::class);
    }

    public function categories()
    {
        return $this->morphToMany(Category::class, 'categorizable');
    }


    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable')->using(Taggable::class);
    }
    
    /**
     * Get the activity log options for the User model.
     *
     * @return LogOptions
     */

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->useLogName('Formula')
        ->logOnlyDirty()
        ->logOnly([
        'name',
        'slug',
        'description',
        'notes',
        'status',
        'version',
        'created_by',
        'primary_formula',
        ]);
    }

    protected static function booted()
    {
        static::saving(function (Formula $formula) {
            if ($formula->isDirty('name')) {
                $formula->slug = Str::slug($formula->name);
            }
        });

        static::created(function (Formula $formula) {
            $formula->saveQuietly([
                'primary_formula' => $formula->id,
            ]);
        });
    }
}
