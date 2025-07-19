<?php

namespace App\Http\Requests\Inventory\Supplier;

use Illuminate\Validation\Rule;
use App\Models\Inventory\Supplier;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property \App\Models\Inventory\Supplier $supplier
 */
class UpdateSupplierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique(Supplier::class, 'name')->ignore($this->supplier->slug, 'slug')],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(Supplier::class, 'email')->ignore($this->supplier->slug, 'slug')],
            'phone' => ['nullable', 'string', 'max:255', 'regex:/^\+\d{1,3}[\s.\-]*\(?\d{1,4}\)?[\s.\-]*\d{1,4}[\s.\-]*\d{1,9}$/', Rule::unique(Supplier::class, 'phone')->ignore($this->supplier->slug, 'slug')],
            'address' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'state_province' => ['nullable', 'string', 'max:255'],
            'country' => ['required', 'string', 'max:255'],
            'zip_postal_code' => ['nullable', 'string', 'max:255', Rule::unique(Supplier::class, 'zip_postal_code')->ignore($this->supplier->slug, 'slug')],
            'website' => ['nullable', 'string', 'max:255', 'url', Rule::unique(Supplier::class, 'website')->ignore($this->supplier->slug, 'slug')],
            'description' => ['nullable', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:255'],
        ];
    }
}
