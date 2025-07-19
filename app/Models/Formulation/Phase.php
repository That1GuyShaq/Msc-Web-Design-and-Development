<?php

namespace App\Models\Formulation;

use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use App\Policies\Formulation\PhasePolicy;
use App\Models\Formulation\PhaseIngredient;
use Illuminate\Database\Eloquent\Attributes\UsePolicy;

#[UsePolicy(PhasePolicy::class)]

class Phase extends Model
{
    protected $connection = 'tenant';

    protected $fillable = [
        'formula_id',
        'name'
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

    public function formula()
    {
        return $this->belongsTo(Formula::class);
    }

    public function ingredients()
    {
        return $this->hasMany(PhaseIngredient::class);
    }
    
    /**
     * Get the activity log options for the User model.
     *
     * @return LogOptions
     */

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->useLogName('Formula Phase')
        ->logOnlyDirty()
        ->logOnly([
            'formula_id',
            'name',
        ]);
    }
}
