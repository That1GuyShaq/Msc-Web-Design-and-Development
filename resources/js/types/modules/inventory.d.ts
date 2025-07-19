import { Category } from "../index";

export interface Supplier {
    id?: number;
    slug: string;
    name: string;
    email?: string;
    phone?: string;
    website: string;
    status: string;
    description?: string;
    address?: string;
    city?: string;
    state_province?: string;
    country: string;
    zip_postal_code?: string;
    notes?: string;
    created_at?: string;
    updated_at?: string;
};

export interface Ingredient {
    id: number;
    slug: string;
    name: string;
    inci_name: string;
    cas_number?: string;
    ec_number?: string;
    description: string;
    unit?: string;
    cost_per_unit?: string;
    currency?: string;
    url?: string;
    state_of_matter: string;
    categories?: Category[];
    suppliers: {
        id: number,
        name: string,
        slug: string
        description: string
        url:string
    }[];
}

export interface UnlistedIngredient {
    id: number;
    name: string;
}
export interface SupplierIngredient {
    id: number;
    supplier_slug: string;
    name: string;
    inci_name: string;
    cas_number?: string;
    ec_number?: string;
    unit: string;
    symbol: string;
    cost_per_unit: string;
    currency: string;
    url: string;
    slug: string;
    state_of_matter: string;
}
export interface IngredientSupplier {
    id: number;
    name: string;
    description: string;
    slug: string;
    url: string;
}