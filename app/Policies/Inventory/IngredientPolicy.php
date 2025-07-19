<?php

namespace App\Policies\Inventory;

use App\Models\Inventory\Ingredient;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class IngredientPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        $allowed = false;
        
        if ($user->can('read ingredient')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to access this page.');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Ingredient $ingredient): Response
    {
        $allowed = false;

        if ($user->can('read ingredient') && $user->can('read supplier')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to view this ingredient details.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        $allowed = false;

        if ($user->can('create ingredient')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to create ingredients.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Ingredient $ingredient): Response
    {
        $allowed = false;

        if ($user->can('update ingredient')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to update ingredients.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Ingredient $ingredient): Response
    {
        $allowed = false;

        if ($user->can('delete ingredient')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to delete ingredients.');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Ingredient $ingredient): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Ingredient $ingredient): bool
    {
        return false;
    }
}
