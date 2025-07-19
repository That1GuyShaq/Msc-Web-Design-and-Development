<?php

namespace App\Http\Resources\Inventory;

use Nnjeim\World\World;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Resources\Json\JsonResource;
use Nnjeim\World\Models\Currency;

class SupplierIngredientResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $symbol = Currency::where('code', $this->pivot->currency)->first()->symbol;

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'inci_name' => $this->inci_name,
            'cas_number' => $this->cas_number,
            'ec_number' => $this->ec_number,
            'description' => $this->description,
            'status' => $this->status(),
            'unit' => $this->pivot->unit,
            'symbol' => $symbol ,
            'cost_per_unit' => $this->pivot->cost_per_unit,
            'url' => $this->pivot->url,
            'currency' => $this->pivot->currency,
            'category' => $this->categories,
            'state_of_matter' => $this->state_of_matter,
            'supplier_slug' => $this->supplier_slug
        ];
    }
}
