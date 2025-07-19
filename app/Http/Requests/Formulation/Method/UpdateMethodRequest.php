<?php

namespace App\Http\Requests\Formulation\Method;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMethodRequest extends FormRequest
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
            'methods.*.step' => ['required', 'integer', 'min:1'],
            'methods.*.instruction' => ['required', 'string'],
        ];
    }
}
