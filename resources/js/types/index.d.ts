import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
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
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
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

export interface Slider {
    id: number;
    title: string;
    image_path: string;
    order?: number;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    product_category_id: number;
    description: string;
    price: number;
    image_path?: string | null;
    delivery_link_1?: string | null;
    delivery_link_2?: string | null;
    delivery_link_3?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface Category {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
}
