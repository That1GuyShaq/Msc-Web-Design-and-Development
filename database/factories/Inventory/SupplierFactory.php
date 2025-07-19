<?php

namespace Database\Factories\Inventory;

use App\Models\Inventory\Supplier;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class SupplierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'slug' => $this->faker->slug(),
            'name' => $this->faker->company(),
            'email' => $this->faker->email(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'country' => fake()->randomElement(DB::connection('central')->table('countries')->pluck('name')),
            'city' => fake()->randomElement(DB::connection('central')->table('cities')->pluck('name')),
            'state_province' => fake()->randomElement(DB::connection('central')->table('states')->pluck('name')),
            'zip_postal_code' => $this->faker->postcode(),
            'website' => $this->faker->url(),
            'description' => $this->faker->text(),
            'notes' => $this->faker->text()
        ];
    }
}
