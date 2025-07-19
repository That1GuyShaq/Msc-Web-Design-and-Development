<?php

namespace App\Policies\Inventory;

use App\Models\Role;
use App\Models\User;
use App\Models\Inventory\Supplier;
use Illuminate\Auth\Access\Response;

class SupplierPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        $allowed = false;
        
        if ($user->can('read supplier')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to access this page.');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Supplier $supplier): Response
    {
        $allowed = false;

        if ($user->can('read supplier') && $supplier->trashed() == false) {
            $allowed = true;
        }else if ($user->can('read supplier') && $supplier->trashed() == true && $user->hasRole('administrator')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to view this suppliers details.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        $allowed = false;

        if ($user->can('create supplier')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to create suppliers.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Supplier $supplier): Response
    {
        $allowed = false;

        if ($user->can('update supplier')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to update suppliers.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Supplier $supplier): Response
    {
        $allowed = false;
        $message = 'You do not have permission to delete suppliers.';

        if ($user->can('delete supplier')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny($message);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Supplier $supplier): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Supplier $supplier): bool
    {
        return false;
    }
}
