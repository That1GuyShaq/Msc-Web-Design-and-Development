<?php

namespace Database\Factories\Inventory;

use App\Models\Category;
use App\Models\Inventory\Ingredient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class IngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word() . '_' . fake()->word(),
            'inci_name' => fake()->sentence(3),
            'cas_number' => fake()->regexify('[0-9]{2,7}-[0-9]{2}-[0-9]{1}'),
            'ec_number' => fake()->regexify('[0-9]{3}-[0-9]{3}-[0-9]{1}'),
            'slug' => fake()->slug() . '-' . fake()->slug(),
            'description' => fake()->sentence(),
            'state_of_matter' => fake()->randomElement(['liquid', 'solid', 'gas', 'powder']),
            'created_by' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
