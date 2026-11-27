import type { Role } from '@/lib/db/types';

export const ADMIN_AREAS = [
  'overview', 'orders', 'products', 'inventory', 'customers', 'discounts',
  'analytics', 'pages', 'journal', 'navigation', 'appearance', 'media',
  'shipping', 'payments', 'couriers', 'fraud', 'reviews', 'settings', 'team', 'help',
] as const;

export type AdminArea = typeof ADMIN_AREAS[number];
export type AdminAction = 'read' | 'write' | 'delete';
export type Permission = `${AdminArea}:${AdminAction}`;

const all = ADMIN_AREAS.flatMap((area) => [`${area}:read`, `${area}:write`, `${area}:delete`] as Permission[]);
const staff = ['overview', 'orders', 'inventory', 'media'].flatMap((area) => [`${area}:read`, `${area}:write`] as Permission[]);

export const PERMISSIONS: Record<Role, readonly Permission[]> = {
  owner: all,
  admin: all.filter((permission) => !permission.startsWith('team:delete')),
  packer: staff,
  support: ['overview:read', 'orders:read', 'customers:read', 'reviews:read', 'media:read'],
  customer: [],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return PERMISSIONS[role].includes(permission);
}
