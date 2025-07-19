<?php

namespace App\Http\Requests\Inventory\Ingredient;

use App\Models\Inventory\Ingredient;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class CreateIngredientRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', Rule::unique(Ingredient::class, 'name')],
            'inci_name' => ['required', 'string', 'max:255', Rule::unique(Ingredient::class, 'inci_name')],
            'cas_number' => ['nullable', 'string', 'max:255', Rule::unique(Ingredient::class, 'cas_number')],
            'ec_number' => ['nullable', 'string', 'max:255', Rule::unique(Ingredient::class, 'ec_number')],
            'state_of_matter' => ['required', 'string', 'max:7', Rule::in(['liquid', 'solid', 'gas', 'powder'])],
            'description' => ['required', 'string', 'max:255'],
            'categories' => ['required', 'array', 'exists:central.categories,id'],
        ];
    }
}
