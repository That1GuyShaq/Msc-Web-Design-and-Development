<?php

namespace App\Http\Requests\Inventory\Ingredient;

use Illuminate\Validation\Rule;
use App\Models\Inventory\Ingredient;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property \App\Models\Inventory\Ingredient $ingredient
 */
class UpdateIngredientRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', Rule::unique(Ingredient::class, 'name')->ignore($this->ingredient->slug, 'slug')],
            'inci_name' => ['required', 'string', 'max:255', Rule::unique(Ingredient::class, 'inci_name')->ignore($this->ingredient->slug, 'slug')],
            'cas_number' => ['nullable', 'string', 'max:255', Rule::unique(Ingredient::class, 'cas_number')->ignore($this->ingredient->slug, 'slug')],
            'ec_number' => ['nullable', 'string', 'max:255', Rule::unique(Ingredient::class, 'ec_number')->ignore($this->ingredient->slug, 'slug')],
            'state_of_matter' => ['required', 'string', 'max:7', Rule::in(['liquid', 'solid', 'gas', 'powder'])],
            'description' => ['required', 'string', 'max:255'],
            'categories' => ['required', 'array', 'exists:central.categories,id'],
        ];
    }
}
