<?php

namespace App\Http\Resources\Formulation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PhaseIngredientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $raw = $this->percentage_weight_per_weight;

        if (! is_numeric($raw)) {
            
            $formatted = $raw;
        } else {
            $v = (float) $raw;

            if (fmod($v, 1) === 0.0) {
                $formatted = number_format($v, 0, '.', '');
            } elseif (fmod($v * 100, 1) === 0.0) {
                $formatted = number_format($v, 2, '.', '');
            } elseif (fmod($v * 1000, 1) === 0.0) {
                $formatted = number_format($v, 3, '.', '');
            } else {
                $formatted = number_format($v, 3, '.', '');
            }
        }

        return[
            'id' => $this->ingredient_id,
            'name' => $this->ingredient->name,
            'inci_name' => $this->ingredient->inci_name,
            'percentage_weight_per_weight' => $formatted,
            'quantity_sufficient' => $this->quantity_sufficient
        ];
    }
}
