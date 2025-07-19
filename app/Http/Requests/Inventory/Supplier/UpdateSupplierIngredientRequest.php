<?php

namespace App\Http\Requests\Inventory\Supplier;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSupplierIngredientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $allowed = false;

        if (Auth::user()->can('update supplier')) {
            $allowed = true;
        }

        return $allowed;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['required', 'numeric', 'max:255', 'exists:central.ingredients,id'],
            'currency' => ['required', 'string', 'max:255', 'exists:central.currencies,code'],
            'unit' => ['required', 'string', 'max:255', Rule::in(['g', 'ml', 'kg', 'L', 'oz', 'lb'])],
            'cost_per_unit' => ['required', 'numeric', 'min:0', 'regex:/\d{1,8}.\d{1,2}/'],
            'url' => ['required', 'string', 'max:255', 'url'],
        ];
    }
}
