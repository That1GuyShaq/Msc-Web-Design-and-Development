<?php

namespace App\Http\Resources\Inventory;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'website' => $this->website,
            'status' => $this->status(),
            'description' => $this->description,
            'address' => $this->address,
            'city' => $this->city,
            'state_province' => $this->state_province,
            'country' => $this->country,
            'zip_postal_code' => $this->zip_postal_code,
            'notes' => $this->notes
        ];
    }
}
