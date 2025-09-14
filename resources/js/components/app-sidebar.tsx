import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Image, Star, MessageSquare, Box } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/admin/dashboard', icon: LayoutGrid },
  { title: 'Slider', href: '/admin/sliders', icon: Image },
  { title: 'Kategori Produk', href: '/admin/product-categories', icon: Folder },
  { title: 'Produk', href: '/admin/products', icon: Box },
  { title: 'Menu', href: '/admin/menu-pdfs', icon: BookOpen },
  { title: 'Testimoni', href: '/admin/testimonials', icon: MessageSquare },
  { title: 'Produk Unggulan', href: '/admin/featured-products', icon: Star },
  { title: 'Galeri', href: '/admin/galleries', icon: Image },
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
