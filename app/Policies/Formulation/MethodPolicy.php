<?php

namespace App\Policies\Formulation;

use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Models\Formulation\Method;
use App\Models\Formulation\Formula;
use Illuminate\Auth\Access\Response;

class MethodPolicy
{
    /**
     * Determine whether the user can create models.
     */
    public function create(User $user, Method $method, Formula $formula): Response
    {
        $allowed = false;

        if ($user->can('create method') && Arr::exists(array_flip(['draft', 'published']), $formula->status)) {
            $allowed = true;
        }
        
        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to create formula methods.');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Formula $formula): Response
    {
        $allowed = false;

        if ($user->can('update method') && Arr::exists(array_flip(['draft', 'published']), $formula->status)) {
            $allowed = true;
        }

        return $allowed
            ? Response::allow()
            : Response::deny('You do not have permission to update formula methods.');
    }
}
