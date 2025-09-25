import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutDashboard, Images, FolderTree, Package, FileText, MessageSquareQuote, Star, Clock, CalendarDays } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Manajemen Slider',
        href: '/admin/sliders',
        icon: Images,
    },
    {
        title: 'Manajemen Category Products',
        href: '/admin/product-categories',
        icon: FolderTree,
    },
    {
        title: 'Manajemen Produk',
        href: '/admin/products',
        icon: Package,
    },
    {
        title: 'Manajemen Menu',
        href: '/admin/menu-pdfs',
        icon: FileText,
    },
    {
        title: 'Manajemen Testimonials',
        href: '/admin/testimonials',
        icon: MessageSquareQuote,
    },
    {
        title: 'Manajemen Menu Unggulan',
        href: '/admin/featured-products',
        icon: Star,
    },
    {
        title: 'Manajemen Gallery',
        href: '/admin/galleries',
        icon: Images,
    },
    {
        title: 'Manajemen Jam Oprasional',
        href: '/admin/operational-hours',
        icon: Clock,
    },
    {
        title: 'Manajemen Reservasi',
        href: '/admin/reservation-settings',
        icon: CalendarDays,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/tamzidan/paddies-cafe.git',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://github.com/tamzidan/paddies-cafe/documentation',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
