<?php

namespace App\Http\Resources\Formulation;

use App\Models\Formulation\Phase;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FormulaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $category = $this->whenLoaded('categories', function () {
            return $this->categories->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                ];
            })->toArray() ?? [];
        }) ? $this->categories[0] : [
            'id' => 0,
            'name' => null
        ];
        
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'description' => $this->description,
            'notes' => $this->notes,
            'status' => $this->status,
            'tags' => $this->tags,
            'category' => $category,
            'phases' => PhaseResource::collection($this->phases)->resolve(),
            'method' => MethodResource::collection($this->methods)->resolve(),
            'version' => $this->version,
            'primary_formula' => (bool)($this->id === $this->primary_formula),
            'created_at' => Carbon::parse($this->created_at)->format('d M, Y'),
        ];
    }
}
