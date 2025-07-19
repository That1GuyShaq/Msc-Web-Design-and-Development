<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use Illuminate\Http\Request;
use App\Models\Inventory\Supplier;
use App\Models\Formulation\Formula;
use App\Models\Inventory\Ingredient;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }
    
    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user   = $this->getUser($request);
        $tenant = $this->getTenant($request);
        $badges = $this->getBadges();
        $toast  = $this->getToast();
        
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'flash' => $toast,
            'auth' => [
                
                'user' => $user,
                'tenant' => $tenant,
                'roles' => Auth::user() ? Auth::user()->getRoleNames() : [],
                'permissions' => Auth::user() ? Auth::user()->getAllPermissions()->pluck('name') : [],
            ],
            'badges' => $badges,
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),

            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    /**
     * Return the current user with the tenant as a property.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private function getUser(Request $request)
    {
        $user = [];
        
        if ($request->user()) {
            $user = $request->user()->toArray();
        }
        
        return $user;
    }

    /**
     * Return the current user with the tenant as a property.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private function getTenant(Request $request)
    {
        $user = $request->user();
        $tenant = [];

        if ($user) {
            $tenant['id'] = $user->tenants()->first()->id ?? '';
            $tenant['name'] = $user->tenants()->first()->name ?? '';
            $tenant['domain'] = $user->tenants()->first()->domains()->first()->domain ?? '';
        }
        
        return $tenant;
    }

    /**
     * Get the number of badges for each of the main sections: formulas, ingredients, stocks and suppliers.
     *
     * @return array
     */
    private function getBadges()
    {
        $badges = [
            'formulas'    => 0,
            'ingredients' => 0,
            'stocks'      => 0,
            'suppliers'   => 0,
        ];
        
        if (Auth::user() && tenancy()->initialized) {
            $badges['formulas']    = Formula::count();
            $badges['ingredients'] = Ingredient::count();
            $badges['stocks']      = 0;
            $badges['suppliers']   = Supplier::count();
        }
        
        return $badges;
    }

    /**
     * Get the toast message.
     *
     * @return string
     */
    private function getToast()
    {
        return session()->get('toast') ?? '';
    }
}
