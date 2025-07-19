<?php

namespace App\Http\Requests\Formulation\Formula;

use App\Models\Formulation\Formula;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class CreateFormulaRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', Rule::unique(Formula::class, 'name')],
            'description' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'exists:central.categories,id'],

        ];
    }
}
