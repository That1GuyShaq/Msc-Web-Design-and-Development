<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Events\Registered;
use Inertia\Response as InertiaResponse;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    public function store(Request $request)
    {
        $central_domain = config('app.domain');
       
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'tenant_name' => 'required|string|max:255',
            'tenant_domain' => 'required|string|lowercase|max:255|unique:tenants,id',
        ]);

        $user = User::create([
            'name' => "$request->first_name $request->last_name",
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole('formulator');

        $tenant = Tenant::create([
            'id' => $request->tenant_domain,
            'name' => $request->tenant_name,
        ]);

        $tenant->domains()->create([
            'domain' => "$request->tenant_domain.$central_domain",
        ]);

        $user->tenants()->attach($tenant->id);

        activity()
            ->causedBy($user)
            ->performedOn($user)
            ->log('Tenant Created: ' . $tenant->name . ' (' . $tenant->id . ')');

        event(new Registered($user));

        tenancy()->initialize($tenant);

        Auth::login($user);

        return Inertia::location(
            route('dashboard', ['tenant' => $tenant->id], true) // true makes it an absolute URL
        );
    }
}
