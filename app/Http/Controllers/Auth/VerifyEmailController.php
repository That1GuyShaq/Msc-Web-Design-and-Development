<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        $tenant = Auth::user()->tenants()->first();
        
        if ($request->user()->hasVerifiedEmail()) {
            return Inertia::location(
            route('dashboard', ['tenant' => $tenant->id],true).'?verified=1'  // absolute URL back to your central / login
        );
        }

        if ($request->user()->markEmailAsVerified()) {
            /** @var \Illuminate\Contracts\Auth\MustVerifyEmail $user */
            $user = $request->user();

            event(new Verified($user));
        }
        
        // return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
        return Inertia::location(
            route('dashboard', ['tenant' => $tenant->id],true).'?verified=1'  // absolute URL back to your central / login
        );
    }
}
