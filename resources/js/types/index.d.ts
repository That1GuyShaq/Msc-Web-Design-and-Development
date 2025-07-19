import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    tenant: Tenant;
    roles: string[];
    permissions: string[];
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    badge?: number;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    badges: {
        formulas: number;
        ingredients: number;
        stocks: number;
        suppliers: number;
    };
    flash: Flash;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Tenant {
    id: string;
    name: string;
    domain: string;
}

export interface Module {
    status: string;
    name: string;
    priority: number;
}

export interface Category {
    id: number;
    name: string;
    description: string;
}

export interface Tag {
    id: number;
    name: string;
    description: string;
}

export interface Country {
    id: number;
    name: string;
    iso2: string;
    region: string;
    subregion: string;
}

export interface StateProvince {
    id: number;
    name: string;
    country_id: number;
}

export interface City {
    id: number;
    name: string;
    state_id: number;
    country_id: number;
}

export interface Flash {
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    description: string;
}

export interface Category {
    id: number;
    name: string;
    slug?: string;
    description?: string;
}