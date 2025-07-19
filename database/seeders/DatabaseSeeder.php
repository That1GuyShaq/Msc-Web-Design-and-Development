<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Tag;
use App\Models\User;
use App\Models\Tenant;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use App\Models\Inventory\Supplier;
use Spatie\Permission\Models\Role;
use App\Models\Inventory\Ingredient;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->createRolesAndPermissions();
        $this->createAdministrator();
        $this->createCategories();
        $this->createTestUser();
        $this->createTags();

        Supplier::factory(3)->create();
        Ingredient::factory(15)->create();

        Ingredient::all()->each(function ($ingredient) {
            $randomSuppliers = Supplier::all()->random(rand(1, Supplier::count()));
            foreach ($randomSuppliers as $supplier) {
                $ingredient->suppliers()->attach($supplier->id, [
                    'url' => fake()->url(),
                    'unit' => fake()->randomElement(['g', 'ml', 'kg', 'L', 'oz', 'lb']),
                    'cost_per_unit' => fake()->randomFloat(2, 0, 100),
                    'currency' => fake()->randomElement(['EUR', 'USD', 'GBP', 'TTD']),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                
            }
            $ingredient->categories()->attach(Category::where('class', 'ingredient')->get()->random()->id);
        });
    }

    /**
     * Creates roles and permissions in the database.
     *
     * This function creates all the possible combinations of operator and target
     * as permissions, and assigns them to roles as follows:
     *
     * - Administrator: user, tenant
     * - Formulator: formulation, inventory, product, batch
     */
    private function createRolesAndPermissions()
    {
        $operators = [
            'create',
            'read',
            'update',
            'delete'
        ];
        
        $targets = [
            'ingredient',
            'supplier',
            'formula',
            'product',
            'method',
            'tenant',
            'batch',
            'phase',
            'user',
        ];

        $roles = [
            'administrator' => [
                'tenant',
                'user',
            ],
            'formulator' => [
                'ingredient',
                'supplier',
                'formula',
                'product',
                'method',
                'batch',
                'phase',
            ]
        ];

        // Create permissions for each target
        foreach ($targets as $target) {
            foreach ($operators as $operator) {
                Permission::create(["name" => "$operator $target"]);
            }
        }

        // Create roles
        foreach ($roles as $role => $permissions) {
            Role::create(["name" => $role]);
        }

        // Assign permissions to roles
        foreach ($roles as $role => $role_permissions) {
            $role = Role::findByName($role);
            foreach ($role_permissions as $rolePermission) {
                $permissions = Permission::where('name', 'like', "% $rolePermission")->get();
                foreach($permissions as $permission) {
                    $role->givePermissionTo($permission->name);
                }
            }
        }
    }

    private function createAdministrator()
    {
        User::create([
            'name' => fake()->name(),
            'email' => 'admin@altuvis.test', 
            'password' => 'Independent@uditor09',
            'email_verified_at' => now(),
        ])->assignRole('administrator');
    }

    private function createTestUser()
    {
        $user = User::create([
            'name' => fake()->name(),
            'email' => 'qycica@mailinator.test', 
            'password' => 'Pa$$w0rd!',
            'email_verified_at' => now(),
        ])->assignRole('formulator');

        $tenant = Tenant::create([
            'id' => 'foo',
            'name' => fake()->company(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $tenant->domains()->create([
            'domain' => 'foo.' . config('app.domain'),
        ]);

        $user->tenants()->attach($tenant->id);
    }

    private function createTags()
    {
        $tags = collect([
            ['name' => 'Vegan', 'description' => 'No animal derived ingredients.'],
            ['name' => 'Fragrance Free', 'description' => 'Unscented or no added perfumes.'],
            ['name' => 'Sensative Skin', 'description' => 'Formulated for sensative or reactive skin.'],
            ['name' => 'Organic', 'description' => 'No synthetic ingredients.'],
            ['name' => 'Anti-aging', 'description' => 'Contains actives targeting fine lines.'],
            ['name' => 'Hydrating', 'description' => 'Boosts moisture retension.'],
            ['name' => 'Exfoliating', 'description' => 'Containes mechanical or chemical exfoliants.'],
            ['name' => 'Aeromatic', 'description' => 'Contains essential oils from plants.'],
            ['name' => 'Preservative Free', 'description' => 'No synthetic preservatives.'],

        ])->map(fn($tag) => array_merge($tag, ['slug' => Str::slug($tag['name'])]));
        
        Tag::insert($tags->toArray());
    }

    private function createCategories()
    {
        $categories = collect([
            [
                'name' => "liquid", 
                'class' => 'formula', 
                'description' => "A fluid formulation, typically water-based, that spreads easily and is absorbed quickly."
            ],[
                'name' => "gel", 
                'class' => 'formula', 
                'description' => "A semi-solid, jelly-like formulation that provides a cooling sensation and lightweight feel."
            ],[
                'name' => "foaming gel", 
                'class' => 'formula', 
                'description' => "A gel that transforms into a rich foam on application, ideal for gentle cleansing or targeted delivery."
            ],[
                'name' => "serum", 
                'class' => 'formula', 
                'description' => "A highly concentrated, lightweight formulation designed to deliver active ingredients deep into the skin."
            ],[
                'name' => "lotion", 
                'class' => 'formula', 
                'description' => "A light emulsion of oil and water that moisturizes without feeling heavy or greasy."
            ],[
                'name' => "cream", 
                'class' => 'formula', 
                'description' => "A thicker emulsion offering intensive hydration and barrier support for dry or mature skin."
            ],[
                'name' => "powder", 
                'class' => 'formula', 
                'description' => "A dry, finely milled formulation that absorbs oil, sets makeup, or provides gentle exfoliation."
            ],[
                'name' => "balm", 
                'class' => 'formula', 
                'description' => "A rich, wax-based formulation that soothes, protects, and seals in moisture."
            ],[
                'name' => "mud", 
                'class' => 'formula', 
                'description' => "A mineral-rich mask formulation that detoxifies, absorbs excess oil, and refines pores."
            ],[
                'name' => "scrub", 
                'class' => 'formula', 
                'description' => "A formulation containing small particulates to physically exfoliate and smooth skin."
            ],[
                'name' => "abrasive",
                'class' => 'ingredient',
                'description' => "Particle-based materials used to physically slough off dead skin cells."
            ],[
                'name' => "antioxidant",
                'class' => 'ingredient',
                'description' => "Compounds that neutralize free radicals to protect skin or product integrity."
            ],[
                'name' => "chelating agent",
                'class' => 'ingredient',
                'description' => "Molecules that bind and deactivate metal ions to stabilize formulations."
            ],[
                'name' => "colorant",
                'class' => 'ingredient',
                'description' => "Pigments or dyes added to impart color or opacity to a product."
            ],[
                'name' => "cosmetic astringent",
                'class' => 'ingredient',
                'description' => "Ingredients that tighten pores and temporarily firm the skin."
            ],[
                'name' => "emulsion stabiliser",
                'class' => 'ingredient',
                'description' => "Agents that maintain a consistent blend of oil and water phases."
            ],[
                'name' => "exfoliant",
                'class' => 'ingredient',
                'description' => "Chemical agents (e.g., AHAs, BHAs) that dissolve bonds between dead skin cells."
            ],[
                'name' => "fragrance",
                'class' => 'ingredient',
                'description' => "Natural or synthetic scents added to enhance the sensory experience."
            ],[
                'name' => "hair conditioning agent",
                'class' => 'ingredient',
                'description' => "Substances that smooth, detangle, and improve hair manageability."
            ],[
                'name' => "hair fixative",
                'class' => 'ingredient',
                'description' => "Polymers or resins that hold hair in place and maintain style control."
            ],[
                'name' => "opacifying agent",
                'class' => 'ingredient',
                'description' => "Ingredients that increase product opacity and improve visual texture."
            ],[
                'name' => "ph adjuster",
                'class' => 'ingredient',
                'description' => "Acids or bases used to set or correct the formulation’s pH level."
            ],[
                'name' => "preservative",
                'class' => 'ingredient',
                'description' => "Chemicals that prevent microbial growth and extend product shelf life."
            ],[
                'name' => "skin conditioning agent - humectant",
                'class' => 'ingredient',
                'description' => "Moisture-attracting agents that draw water from the environment or deeper skin layers to hydrate and plump the skin."
            ],[
                'name' => "skin conditioning agent - emollient",
                'class' => 'ingredient',
                'description' => "Ingredients that fill the spaces between skin cells to soften, smooth, and improve skin suppleness."
            ],[
                'name' => "skin conditioning agent - miscellaneous",
                'class' => 'ingredient',
                'description' => "Other skin conditioning ingredients that provide moisturizing or barrier support not classified elsewhere."
            ],[
                'name' => "skin conditioning agent - occlusive",
                'class' => 'ingredient',
                'description' => "Ingredients that form a protective barrier on the skin`s surface to prevent water loss."
            ],[
                'name' => "solvents",
                'class' => 'ingredient',
                'description' => "Liquids (e.g., alcohols) used to dissolve other ingredients in a formulation."
            ],[
                'name' => "miscellaneous",
                'class' => 'ingredient',
                'description' => "Any other functional ingredient not covered by the above categories."
            ],[
                'name' => "sunscreen agents",
                'class' => 'ingredient',
                'description' => "UV-filtering ingredients that protect skin from ultraviolet radiation."
            ],[
                'name' => "surfactant - cleaning agent",
                'class' => 'ingredient',
                'description' => "Surface-active molecules that lift and remove dirt, oil, and makeup."
            ],[
                'name' => "surfactant - emulsifying agent",
                'class' => 'ingredient',
                'description' => "Surfactants that help mix oil and water phases into a stable emulsion."
            ],[
                'name' => "surfactant - solubilise",
                'class' => 'ingredient',
                'description' => "Agents that make hydrophobic ingredients soluble in water."
            ],[
                'name' => "viscosity agent - aqueous",
                'class' => 'ingredient',
                'description' => "Thickeners designed to increase the viscosity of water-based formulations."
            ],[
                'name' => "viscosity agent - nonaqueous",
                'class' => 'ingredient',
                'description' => "Thickeners for oil-based or anhydrous formulations to control flow and texture."
            ]
        ])->map(fn($categories) => array_merge($categories, ['slug' => Str::slug($categories['name'])]));
        
        Category::insert($categories->toArray());
    }
}
