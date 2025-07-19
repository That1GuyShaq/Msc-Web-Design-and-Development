<?php

namespace App\Policies\Formulation;

use App\Models\Formulation\Formula;
use App\Models\User;
use App\Models\Formulation\Phase;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Arr;

class PhasePolicy
{

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Formula $formula): Response
    {
        $allowed = false;

        if ($user->can('create phase') && Arr::exists(array_flip(['draft', 'published']), $formula->status)) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to create phases.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Formula $formula): Response
    {
        $allowed = false;

        if ($user->can('update phase') && Arr::exists(array_flip(['draft', 'published']), $formula->status)) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to update phases.');
    }
}
