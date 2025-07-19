<?php

namespace App\Http\Resources\Inventory;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class IngredientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $suppliers = $this->whenLoaded('suppliers', function () {
            return $this->suppliers->map(function ($supplier) {
                return [
                    'id' => $supplier->id,
                    'name' => $supplier->name,
                    'slug' => $supplier->slug,
                    'description' => $supplier->description,
                    'url' => $supplier->pivot->url,
                ];
            })->toArray();
        });

        $categories = $this->whenLoaded('categories', function () {
            // If you have a CategoryResource, you can use it here:
            // return CategoryResource::collection($this->categories);
            // Otherwise, map it manually like suppliers:
            return $this->categories->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'description' => $category->description,
                ];
            })->toArray();
        });
        
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'inci_name' => $this->inci_name,
            'cas_number' => $this->cas_number,
            'ec_number' => $this->ec_number,
            'description' => $this->description,
            'status' => $this->status(),
            'categories' => $categories,
            'state_of_matter' => $this->state_of_matter,
            'suppliers' => $suppliers
        ];
    }
}
