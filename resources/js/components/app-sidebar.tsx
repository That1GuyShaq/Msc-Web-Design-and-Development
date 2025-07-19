
import AppLogo from './app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Link, usePage } from '@inertiajs/react';
import { NavFooter } from '@/components/nav-footer';
import { type NavItem, type SharedData } from '@/types';
import { BookOpen, Folder, LayoutGrid, FlaskConical, ShoppingBasket, Warehouse, Store } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';


const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    
    const { badges } = usePage<SharedData>().props;

    const navigation = {
        Platform: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutGrid,
            },
        ] as NavItem[],
        Formulation: [
            {
                title: 'Formulas',
                href: '/formulation/formulas',
                icon: FlaskConical,
                badge: badges.formulas
            },
        ] as NavItem[],
        Inventory: [
            {
                title: 'Ingredients',
                href: '/inventory/ingredients',
                icon: ShoppingBasket,
                badge: badges.ingredients
            },
            {
                title: 'Stock',
                href: '/inventory/stock',
                icon: Warehouse,
                badge: badges.stocks
            },
            {
                title: 'Suppliers',
                href: '/inventory/suppliers',
                icon: Store,
                badge: badges.suppliers
            },
        ] as NavItem[],
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {Object.entries(navigation).map(([label, items]) => (
                    <NavMain key={label} items={items} label={label} />
                ))}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
