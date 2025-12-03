export type UserRole = 'ADMIN' | 'SUPERVISOR' | 'OPERATOR' | 'CLIENT';

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role: UserRole;
  theme?: string;
}

// Define permissions for each role
export const rolePermissions = {
  ADMIN: {
    canAccessDashboard: true,
    canAccessLeads: true,
    canAccessClients: true,
    canAccessProperties: true,
    canAccessClaims: true,
    canAccessAnalytics: true,
    canAccessSettings: true,
    canManageUsers: true,
    canDeleteUsers: true,
    canEditAllClaims: true,
  },
  SUPERVISOR: {
    canAccessDashboard: true,
    canAccessLeads: true,
    canAccessClients: true,
    canAccessProperties: true,
    canAccessClaims: true,
    canAccessAnalytics: true,
    canAccessSettings: true,
    canManageUsers: true,
    canDeleteUsers: false,
    canEditAllClaims: true,
  },
  OPERATOR: {
    canAccessDashboard: true,
    canAccessLeads: true,
    canAccessClients: true,
    canAccessProperties: true,
    canAccessClaims: true,
    canAccessAnalytics: false,
    canAccessSettings: true,
    canManageUsers: true,
    canDeleteUsers: false,
    canEditAllClaims: false,
  },
  CLIENT: {
    canAccessDashboard: false,
    canAccessLeads: false,
    canAccessClients: false,
    canAccessProperties: false,
    canAccessClaims: true,
    canAccessAnalytics: false,
    canAccessSettings: true,
    canManageUsers: false,
    canDeleteUsers: false,
    canEditAllClaims: false,
  },
};

export function hasPermission(role: UserRole, permission: keyof typeof rolePermissions.ADMIN): boolean {
  return rolePermissions[role]?.[permission] ?? false;
}

export function canAccessRoute(role: UserRole, route: string): boolean {
  const routePermissions: Record<string, keyof typeof rolePermissions.ADMIN> = {
    '/dashboard': 'canAccessDashboard',
    '/leads': 'canAccessLeads',
    '/clients': 'canAccessClients',
    '/products': 'canAccessProperties',
    '/claims': 'canAccessClaims',
    '/analytics': 'canAccessAnalytics',
    '/settings': 'canAccessSettings',
    '/users': 'canManageUsers',
  };

  const permission = routePermissions[route];
  if (!permission) return false;

  return hasPermission(role, permission);
}

export function getDefaultRoute(role: UserRole): string {
  // CLIENT users go to claims page by default
  if (role === 'CLIENT') {
    return '/claims';
  }
  // All other roles go to dashboard
  return '/dashboard';
}

// Helper function to check if user can create specific role
export function canCreateUserRole(currentUserRole: UserRole, targetRole: UserRole): boolean {
  switch (currentUserRole) {
    case 'ADMIN':
      return ['SUPERVISOR', 'OPERATOR', 'CLIENT'].includes(targetRole);
    case 'SUPERVISOR':
      return ['OPERATOR', 'CLIENT'].includes(targetRole);
    case 'OPERATOR':
      return ['CLIENT'].includes(targetRole);
    case 'CLIENT':
      return false;
    default:
      return false;
  }
}
