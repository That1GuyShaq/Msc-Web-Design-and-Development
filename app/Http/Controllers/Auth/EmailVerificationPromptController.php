<?php

namespace App\Http\Controllers\Auth;

use Dom\Attr;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class EmailVerificationPromptController extends Controller
{
    /**
     * Show the email verification prompt page.
     */
    public function __invoke(Request $request): Response|RedirectResponse
    {
        $tenant = Auth::user()->tenants()->first();

        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(route('dashboard', ['tenant' => $tenant->id]))
                    : Inertia::render('auth/verify-email', ['status' => $request->session()->get('status')]);
    }
}
