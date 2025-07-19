<?php

namespace App\Models\Formulation;

use Spatie\Activitylog\LogOptions;
use App\Models\Inventory\Ingredient;
use Illuminate\Database\Eloquent\Model;

class PhaseIngredient extends Model
{
    protected $connection = 'tenant';

    protected $fillable = [
        'phase_id',
        'ingredient_id',
        'percentage_weight_per_weight',
        'percentage_weight_per_volume',
        'percentage_volume_per_volume',
        'quantity_sufficient',
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
            'quantity_sufficient' => 'boolean',

        ];
    }

    public function phase()
    {
        return $this->belongsTo(Phase::class);
    }

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class);
    }
    
    /**
     * Get the activity log options for the User model.
     *
     * @return LogOptions
     */

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
        ->useLogName('Formula Phase Ingredient')
        ->logOnlyDirty()
        ->logOnly([
            'phase_id',
            'ingredient_id',
            'percentage_weight_per_weight',
            'percentage_weight_per_volume',
            'percentage_volume_per_volume',
            'quantity_sufficient',
        ]);
    }
}
