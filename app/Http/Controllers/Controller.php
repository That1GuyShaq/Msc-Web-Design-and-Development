<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

abstract class Controller extends BaseController
{
    use AuthorizesRequests;
    
     public static function countries()
    {
        $base = request()->getSchemeAndHttpHost();

        $response = Http::get("{$base}/api/countries", [
            'fields' => 'name,iso2,id,subregion,region',
        ]);

        if (! $response->successful()) {
            abort(500, 'Could not fetch country data.');
        }
        
        $countries = $response->json('data') ?? [];

        return $countries;
    }

    /**
     * Get all states with the given country code.
     *
     * @param string|null $country_code
     * @return array
     */
    public static function states($country_code = null)
    {
        $base  = request()->getSchemeAndHttpHost();
        $parts = [ 'fields=name,id,country_id', ];
        $code  = Str::upper($country_code);

        $parts[] = "filters[country_code]={$code}";
        
        $url = "{$base}/api/states?" . implode('&', $parts);

        $response = Http::get($url);

        if (! $response->successful()) {
            abort(500, 'Could not fetch state data.');
        }

        return $response->json('data') ?? [];
    }


    public static function cities($state_id = null)
    {
        $base  = request()->getSchemeAndHttpHost();
        $parts = [ 'fields=name,id,state_id,country_id', ];
        $id    = Str::upper($state_id);
        
        $parts[] = "filters[state_id]={$id}";
        
        $url = "{$base}/api/cities?" . implode('&', $parts);

        $response = Http::get($url);

        if (! $response->successful()) {
            abort(500, 'Could not fetch city data.');
        }

        return $response->json('data') ?? [];
    }

    protected function toast(string $message, string $type = 'success'): void
    {
        session()->flash('toast', [
            'type' => $type,
            'message' => $message,
            'description' => now()->format('l, F d, Y \\a\\t h:i A')
        ]);
    }
}
