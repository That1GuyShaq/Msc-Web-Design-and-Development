

import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { AppShell } from '@/components/app-shell';
import { AppContent } from '@/components/app-content';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { useEffect } from 'react';

import { toast } from "sonner";

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { flash } = usePage<SharedData>().props;

    useEffect(() => {
        if (flash.message) {
            const indevidual = (() => {
                switch (flash.type) {
                    case 'success':
                        return toast.success(flash.message, {
                            description: flash.description,
                            closeButton: true,
                            duration: 50000,
                            action: {
                                label: "close",
                                onClick: () => indevidual !== null && toast.dismiss(indevidual)
                            },
                        });
                    case 'error':
                        return toast.error(flash.message, {
                            description: flash.description,
                            closeButton: true,
                            duration: 50000,
                            action: {
                                label: "close",
                                onClick: () => indevidual !== null && toast.dismiss(indevidual)
                            },
                        });
                    case 'warning':
                        return toast.warning(flash.message, {
                            description: flash.description,
                            closeButton: true,
                            duration: 50000,
                            action: {
                                label: "close",
                                onClick: () => indevidual !== null && toast.dismiss(indevidual)
                            },
                        });
                    case 'info':
                        return toast.info(flash.message, {
                            description: flash.description,
                            closeButton: true,
                            duration: 50000,
                            action: {
                                label: "close",
                                onClick: () => indevidual !== null && toast.dismiss(indevidual)
                            },
                        });
                    default:
                        return null;
                }
            })();
        }
    }, [flash]);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}

            </AppContent>
        </AppShell>
    );
}
