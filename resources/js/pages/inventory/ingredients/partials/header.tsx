
import { Tenant } from '@/types';
import { Edit } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { IngredientDelete } from './delete';
import { Separator } from '@/components/ui/separator';
import { Ingredient } from '@/types/modules/inventory';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
export function IngredientHeader({ tenant, ingredient, edit, destroy } : { tenant: Tenant, ingredient: Ingredient, edit: boolean, destroy: boolean }) {
    
    return (
        <div className='grid grid-cols-1 bg-accent'>
            <div className='col-span-1 flex items-center justify-between p-4'>
                <div className='flex flex-row gap-3'>
                    <Avatar className="h-20 w-20">
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            INGREDIENT
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <span className="text-muted-foreground text-sm">{ingredient.categories?.map((category) => category.name).join(', ')}</span>
                        <div className="flex flex-row items-center gap-3 justify-between">
                            <h3 className="text-2xl font-semibold">{ingredient.inci_name}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm w-100 flex flex-row items-center gap-3 ">
                            <small>{ingredient.description}</small>
                        </p>
                        <div className="text-sm flex flex-row items-center gap-3 h-4">
                            {ingredient.cas_number && <span>CAS#: {ingredient.cas_number}</span>}
                            <Separator orientation="vertical" className='dark:bg-neutral-700' />
                            {ingredient.ec_number && <span>EC#: {ingredient.ec_number}</span>}
                            <Separator orientation="vertical" className='dark:bg-neutral-700' />
                            <span>State of Matter: {ingredient.state_of_matter.charAt(0).toUpperCase() + ingredient.state_of_matter.slice(1)}</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-3 self-end justify-between h-6 items-center">
                        
                        <Separator orientation="vertical" className='dark:bg-neutral-700' />

                        {edit && <Link href={ route('inventory.ingredients.edit', [tenant.id, ingredient.slug]) }>
                            <Edit className="h-4 w-4 text-neutral-500 hover:text-amber-400" />
                        </Link>}

                        {destroy && (
                            <IngredientDelete slug={ingredient.slug} name={ingredient.name} icon={true} tenant={tenant}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}