
import AppLayout from "@/layouts/app-layout";
import { Head, Link } from '@inertiajs/react';
import { DataTable } from '@/components/data-table';
import { Auth, type BreadcrumbItem } from '@/types';
import { IngredientHeader } from './partials/header';
import { Formula } from "@/types/modules/formulation";
import { formulaColumns } from './partials/formula-columns';
import { supplierColumns } from './partials/supplier-columns';
import { Ingredient, IngredientSupplier } from "@/types/modules/inventory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Show({ auth, ingredient, formulas } : { auth: Auth, ingredient: Ingredient, formulas: Formula[] }) {
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Inventory',
            href: '/dashboard',
        },
        {
            title: 'Ingredients',
            href: '/inventory/ingredients',
        },
        {
            title: ingredient.name,
            href: '/inventory/ingredients/' + ingredient.slug,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={ingredient.name} />
            <IngredientHeader 
                tenant={auth.tenant} 
                ingredient={ingredient} 
                edit={auth.permissions.includes('update ingredient')} 
                destroy={auth.permissions.includes('delete ingredient')} />
            <Tabs defaultValue="used_in" className="grid grid-cols-1 gap-4 mt-2 ms-0" >
                <TabsList>
                    <TabsTrigger className='hover:cursor-pointer' value="used_in">Used In</TabsTrigger>
                    <TabsTrigger className='hover:cursor-pointer' value="suppliers">Suppliers</TabsTrigger>
                    {/* <TabsTrigger className='hover:cursor-pointer' value="hazards">Hazards</TabsTrigger> */}
                    {/* <TabsTrigger className='hover:cursor-pointer' value="composition">Composition</TabsTrigger> */}
                    {/* <TabsTrigger className='hover:cursor-pointer' value="handeling_and_storage">Handeling & Storage</TabsTrigger> */}
                    {/* <TabsTrigger className='hover:cursor-pointer' value="properties">Properties</TabsTrigger> */}
                    {/* <TabsTrigger className='hover:cursor-pointer' value="toxicology_and_ecology">Toxicology & Ecology</TabsTrigger> */}
                    {/* <TabsTrigger className='hover:cursor-pointer' value="disposal">Disposal</TabsTrigger> */}
                    {/* <TabsTrigger className='hover:cursor-pointer' value="stock" asChild>
                        <Link href={route('inventory.ingredients.index', [auth.tenant])} className="flex items-center gap-2">
                            Stock
                        </Link>
                    </TabsTrigger> */}
                </TabsList>
                <TabsContent value="used_in" className='col-span-1'>
                    <DataTable 
                        rows={10} 
                        data={formulas} 
                        columns={formulaColumns} />
                </TabsContent>
                <TabsContent value="suppliers" className='col-span-1'>
                    <DataTable 
                        rows={10} 
                        data={ingredient.suppliers as IngredientSupplier[]} 
                        columns={supplierColumns} />
                </TabsContent>
                {/* <TabsContent value="hazards">Change your password here.</TabsContent> */}
                {/* <TabsContent value="composition">Change your password here.</TabsContent> */}
                {/* <TabsContent value="handeling_and_storage">Change your password here.</TabsContent> */}
                {/* <TabsContent value="properties">Change your password here.</TabsContent> */}
                {/* <TabsContent value="toxicology_and_ecology">Change your password here.</TabsContent> */}
                {/* <TabsContent value="disposal">Change your password here.</TabsContent> */}
            </Tabs>
        </AppLayout>
    );
}