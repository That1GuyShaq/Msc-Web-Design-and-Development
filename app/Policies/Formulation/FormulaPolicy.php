<?php

namespace App\Policies\Formulation;

use App\Models\User;
use Illuminate\Support\Arr;
use App\Models\Formulation\Formula;
use Illuminate\Auth\Access\Response;

class formulaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        $allowed = false;
        
        if ($user->can('read formula')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to access this page.');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Formula $formula): Response
    {
        $allowed = false;

        if ($user->can('read formula')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to view this formulas details.');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        $allowed = false;

        if ($user->can('create formula')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to create formulas.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Formula $formula): Response
    {
        $allowed = false;

        if ($user->can('update formula') && Arr::exists(array_flip(['draft', 'published']), $formula->status)) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to update formulas.');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Formula $formula): Response
    {
        $allowed = false;

        if ($user->can('delete formula')) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to delete formulas.');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Formula $formula): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Formula $formula): bool
    {
        return false;
    }

    public function updateNotes(User $user, Formula $formula): Response
    {
        $allowed = false;

        if ($user->can('update formula') && Arr::exists(array_flip(['draft', 'published']), $formula->status)) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to update the notes for this formula.');
    }

    public function archive(User $user, Formula $formula): Response
    {
        $allowed = false;
        $message = 'You do not have permission to archive this formula.';
        
        if ($user->can('update formula')) {
            $allowed = true;
        }

        if ($formula->status != 'published') {
            $allowed = false;
            $message = 'You can only archive a published formula.';
        }
        
        return $allowed
            ? Response::allow()
            : Response::deny($message);
    }

    public function version(User $user, Formula $formula): Response
    {
        $allowed = false;
        $message = 'You do not have permission to version this formula.';
        
        if ($user->can('update formula')) {
            $allowed = true;
        }

        if ($formula->status != 'published') {
            $allowed = false;
            $message = 'You can only version a published formula.';
        }


        return $allowed
            ? Response::allow()
            : Response::deny($message);
    }
}
