
import { Tenant } from '@/types';
import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { FormulaDelete } from './formula-delete';
import { Edit, CircleSmall, Plus, Split } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Formula } from '@/types/modules/formulation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FormulaVersion } from './formula-version';
import { FormulaArchive } from './formula-archive';
export function FormulaHeader({ tenant, formula, edit, destroy } : { tenant: Tenant, formula: Formula, edit: boolean, destroy: boolean }) {

    const [color, text] = formula.status === 'draft' ? ['text-amber-500 animate-pulse', 'Draft'] : formula.status === 'published' ? ['text-green-500', 'Published'] : ['text-red-500', 'Archived'];
    
    return (
        <div className='grid grid-cols-1 bg-accent'>
            <div className='col-span-1 flex items-center justify-between p-4'>
                <div className='flex flex-row gap-3 '>
                    <Avatar className="h-20 w-20">
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {formula.category?.name}
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <div className="flex flex-row items-center gap-3 justify-between">
                            <h3 className="text-2xl font-semibold">{formula.name}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm w-100 flex flex-row items-center gap-3 ">
                            <small>{formula.description}</small>
                        </p>
                        <small className=" flex flex-row items-center gap-3 h-4">
                            <span>Created At: {formula.created_at}</span> 
                        </small>
                    </div>
                </div>
                
                <div className="flex flex-col">
                    <div className="flex flex-row gap-2 self-end justify-between h-6 items-center">
                        <Badge variant="outline" className='h-12'>
                            <CircleSmall className={`h-4 w-4 ${color} fill-current`} />{text}
                            <span className='text-muted-foreground'>| v{formula.version}</span>
                        </Badge>

                        {(edit && ['draft', 'published'].includes(formula.status)) && <Link href={ route('formulation.formulas.edit', [tenant.id, formula.slug]) }>
                            {(formula.primary_formula) &&
                                <Edit className="h-4 w-4 text-neutral-500 hover:text-amber-400" />}
                        </Link>}
                        <Separator orientation="vertical" className='dark:bg-neutral-700' />
                        
                        {(edit && ['draft', 'published'].includes(formula.status)) && 
                            <FormulaArchive slug={formula.slug} tenant={tenant}/>}

                        {(edit && ['draft', 'published'].includes(formula.status)) && 
                            <FormulaVersion slug={formula.slug} tenant={tenant}/>}

                        {(destroy && ['draft', 'archived'].includes(formula.status)) && 
                            <FormulaDelete slug={formula.slug} name={formula.name} icon={true} tenant={tenant} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}