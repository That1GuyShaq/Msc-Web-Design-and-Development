<?php

namespace App\Http\Resources\Formulation;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PhaseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $this->load('ingredients');

        return [
            'id' => $this->id,
            'name' => $this->name,
            'ingredients' => PhaseIngredientResource::collection($this->ingredients)->resolve(),
        ];
    }
}
