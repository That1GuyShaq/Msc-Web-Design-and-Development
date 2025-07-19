<?php

namespace App\Http\Requests\Formulation\Formula;

use Illuminate\Validation\Rule;
use App\Models\Formulation\Formula;
use Illuminate\Foundation\Http\FormRequest;

/**
 * @property \App\Models\Formulation\Formula $formula
 */
class UpdateFormulaRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', Rule::unique(Formula::class, 'name')->ignore($this->formula->slug, 'slug')],
            'description' => ['required', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:255'],
            'category' => ['required', 'string', 'exists:central.categories,id'],
        ];
    }
}
