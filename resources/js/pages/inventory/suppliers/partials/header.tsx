
import { Tenant } from '@/types';
import { Link } from '@inertiajs/react';
import { Supplier } from '@/types/modules/inventory';
import { Separator } from '@/components/ui/separator';
import { Edit, Mail, Phone, Globe } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SupplierDelete } from '@/pages/inventory/suppliers/partials/delete';
export function SupplierHeader({ tenant, supplier, edit, destroy }: { tenant: Tenant, supplier: Supplier, edit: boolean, destroy: boolean }) {
    return (
        <div className='grid grid-cols-1 bg-accent'>
            <div className='col-span-1 flex items-center justify-between p-4'>
                <div className='flex flex-row gap-3 '>
                    <Avatar className="h-20 w-20">
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            SUPPLIER
                        </AvatarFallback>
                    </Avatar>

                    <div>
                        <div className="flex flex-row items-center gap-3 justify-between">
                            <h3 className="text-2xl font-semibold">{supplier.name}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm w-100 flex flex-row items-center gap-3 ">
                            <small>{supplier.description}</small>
                        </p>
                        <small className=" flex flex-row items-center gap-3">
                            {supplier.address && (supplier.address)}
                            {supplier.city && ', ' + (supplier.city)}
                            {supplier.state_province && ', ' + (supplier.state_province)}
                            {supplier.country && ', ' + (supplier.country)}
                            {supplier.zip_postal_code && ' - ' + (supplier.zip_postal_code)}
                        </small>
                    </div>
                </div>
                
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-3 self-end justify-between h-6 items-center">
                        <a href={"mailto:" + supplier.email + ""}>
                            <Mail className="h-4 w-4 text-neutral-500 hover:text-accent-foreground" />
                        </a>
                        <a href={"tel:" + supplier.phone + ""} className='flex items-center'>
                            <Phone className="h-4 w-4 text-neutral-500 hover:text-accent-foreground" />
                        </a>
                        <a href={supplier.website} target="_blank" className='flex items-center'>
                            <Globe className="h-4 w-4 text-neutral-500 hover:text-accent-foreground" />
                        </a>

                        <Separator orientation="vertical" className='dark:bg-neutral-700'/>
                        
                        {edit && 
                        <Link href={ route('inventory.suppliers.edit', [tenant.id, supplier.slug]) }>
                            <Edit className="h-4 w-4 text-neutral-500 hover:text-amber-400" />
                        </Link>}

                        {destroy && <SupplierDelete slug={supplier.slug} name={supplier.name} icon={true} tenant={tenant}/> }
                    </div>
                </div>
            </div>
        </div>
    )
}