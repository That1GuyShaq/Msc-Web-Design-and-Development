<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectTenantIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
            if ($request->expectsJson()) {
                return new Response('', 204);
            }
            if (Auth::check()) {
                if (Auth::guard('tenant')->check()) {
                    if ($request->routeIs('login') || $request->routeIs('register')) {
                        $tenant = Auth::user()->tenants()->first();
                        return Inertia::location(route('dashboard', ['tenant' => $tenant->id],true));
                    }
                }
            }
            
        return $next($request);
    }
}
