<?php

namespace App\Http\Requests\Formulation\Phase;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePhaseRequest extends FormRequest
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
            'phases' => ['required', 'array', 'min:1'],
            'phases.*.name' => ['required', 'string', 'max:255', 'regex:/^Phase [A-Z]{1,3}$/'],
            'phases.*.ingredients.*.ingredient_id' => ['required', 'numeric', 'max:255', 'exists:central.ingredients,id'],
            'phases.*.ingredients.*.percentage_weight_per_weight' => ['requiredIf:phases.*.ingredients.*.quantity_sufficient,false', 'nullable', 'numeric', 'min:0.01', 'max:255'],
            'phases.*.ingredients.*.quantity_sufficient' => ['requiredIf:phases.*.ingredients.*.percentage_weight_per_weight,0.00', 'boolean', 'max:255'],
        ];
    }
}
