"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, UserPlus, Loader2, Mail, Shield, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { hasPermission, canCreateUserRole } from "@/lib/auth";
import { toast } from "@/lib/toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "ADMIN" | "SUPERVISOR" | "OPERATOR" | "CLIENT";
  createdAt: string;
}

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [supervisors, setSupervisors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "" as "SUPERVISOR" | "OPERATOR" | "CLIENT" | "",
    supervisorId: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const { user } = useAuth();

  const canManageUsers = user ? hasPermission(user.role, 'canManageUsers') : false;
  const canDeleteUsers = user ? hasPermission(user.role, 'canDeleteUsers') : false;

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Invalid data format:', data);
          setUsers([]);
          toast.error('Invalid data format received');
        }
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to load users' }));
        console.error('API error:', errorData);
        setUsers([]);
        toast.error(errorData.message || 'Failed to load users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
      toast.error('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const fetchSupervisors = async () => {
    try {
      const response = await fetch('/api/users?role=SUPERVISOR');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setSupervisors(data);
        } else {
          console.error('Invalid data format for supervisors:', data);
          setSupervisors([]);
        }
      } else {
        console.error('Failed to load supervisors');
        setSupervisors([]);
      }
    } catch (error) {
      console.error('Error fetching supervisors:', error);
      setSupervisors([]);
    }
  };

  useEffect(() => {
    fetchUsers();
    if (user && hasPermission(user.role, 'canAssignSupervisor')) {
        fetchSupervisors();
    }
  }, [user]);

  const validatePhone = (phone: string): boolean => {
    if (!phone.trim()) return true;
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim() || !formData.role) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setPhoneError('Invalid phone number format. Please use a valid format like: +1 (555) 000-0000');
      toast.error('Invalid phone number format');
      return;
    }

    if (!canCreateUserRole(user.role, formData.role)) {
      toast.error(`You don't have permission to create ${formData.role} users`);
      return;
    }

    setPhoneError("");

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          password: formData.password.trim(),
          role: formData.role,
          supervisorId: formData.supervisorId || undefined,
        }),
      });

      if (response.ok) {
        const newUser = await response.json();
        toast.success(`${formData.role} user "${formData.name}" created successfully!`);
        setOpen(false);
        setFormData({ name: "", email: "", phone: "", password: "", role: "", supervisorId: "" });
        fetchUsers();
      } else {
        const error = await response.json();
        console.error('Server error:', error);
        toast.error(error.message || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Error creating user');
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!canDeleteUsers) {
      toast.error("You don't have permission to delete users");
      return;
    }

    if (!confirm(`Are you sure you want to delete user \"${userName}\"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success(`User \"${userName}\" deleted successfully`);
        fetchUsers();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      case 'SUPERVISOR': return 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400';
      case 'OPERATOR': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
      case 'CLIENT': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getAvailableRoles = () => {
    if (!user) return [];
    
    const roles: Array<{value: "SUPERVISOR" | "OPERATOR" | "CLIENT", label: string}> = [];
    
    if (canCreateUserRole(user.role, 'SUPERVISOR')) {
      roles.push({ value: 'SUPERVISOR', label: 'Supervisor' });
    }
    if (canCreateUserRole(user.role, 'OPERATOR')) {
      roles.push({ value: 'OPERATOR', label: 'Operator' });
    }
    if (canCreateUserRole(user.role, 'CLIENT')) {
      roles.push({ value: 'CLIENT', label: 'Client' });
    }
    
    return roles;
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:text-white dark:bg-none">
            User Management
          </h2>
          <p className="text-indigo-700 font-medium dark:text-slate-400 dark:font-normal mt-2">
            Manage system users and their access levels
          </p>
        </div>
        {canManageUsers && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:from-transparent dark:to-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-indigo-200 dark:bg-slate-950 dark:border-slate-800 max-w-md">
              <DialogHeader>
                <DialogTitle className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:text-white dark:bg-none">Create New User</DialogTitle>
                <DialogDescription className="text-indigo-700 dark:text-slate-400">
                  Add a new user to the system with appropriate access level.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name" className="text-indigo-900 font-semibold dark:text-slate-200 dark:font-normal">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="border-indigo-300 bg-white text-indigo-900 placeholder:text-indigo-400 focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-purple-900 font-semibold dark:text-slate-200 dark:font-normal">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="border-purple-300 bg-white text-purple-900 placeholder:text-purple-400 focus:border-purple-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone" className="text-pink-900 font-semibold dark:text-slate-200 dark:font-normal">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9+\-() ]/g, '');
                        setFormData({...formData, phone: value});
                        if (phoneError) setPhoneError("");
                      }}
                      pattern="[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}"
                      className={`border-pink-300 bg-white text-pink-900 placeholder:text-pink-400 focus:border-pink-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500 ${phoneError ? 'border-red-500 dark:border-red-500' : ''}`}
                      placeholder="+1 (555) 000-0000"
                    />
                    {phoneError && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                        {phoneError}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-indigo-900 font-semibold dark:text-slate-200 dark:font-normal">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="border-indigo-300 bg-white text-indigo-900 placeholder:text-indigo-400 focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role" className="text-purple-900 font-semibold dark:text-slate-200 dark:font-normal">Role *</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => setFormData({
                        ...formData,
                        role: value as "SUPERVISOR" | "OPERATOR" | "CLIENT",
                        supervisorId: value !== 'OPERATOR' ? '' : formData.supervisorId
                      })}
                    >
                      <SelectTrigger className="border-purple-300 bg-white text-purple-900 focus:border-purple-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-purple-200 dark:bg-slate-950 dark:border-slate-800">
                        {getAvailableRoles().map(role => (
                          <SelectItem key={role.value} value={role.value} className="text-purple-900 dark:text-white">{role.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {user && hasPermission(user.role, 'canAssignSupervisor') && formData.role === 'OPERATOR' && (
                    <div className="grid gap-2">
                      <Label htmlFor="supervisor" className="text-pink-900 font-semibold dark:text-slate-200 dark:font-normal">Supervisor</Label>
                      <Select
                        value={formData.supervisorId}
                        onValueChange={(value) => setFormData({...formData, supervisorId: value})}
                      >
                        <SelectTrigger className="border-pink-300 bg-white text-pink-900 focus:border-pink-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white">
                          <SelectValue placeholder="Assign a supervisor" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-pink-200 dark:bg-slate-950 dark:border-slate-800">
                          {supervisors.map(supervisor => (
                            <SelectItem key={supervisor.id} value={supervisor.id} className="text-pink-900 dark:text-white">{supervisor.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:from-transparent dark:to-transparent">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create User
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="border border-indigo-200 dark:border-slate-800 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-indigo-50/50 dark:bg-slate-900/50">
              <TableHead className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider dark:text-slate-300">User</TableHead>
              <TableHead className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider dark:text-slate-300 hidden md:table-cell">Role</TableHead>
              <TableHead className="px-6 py-4 text-left text-xs font-semibold text-indigo-800 uppercase tracking-wider dark:text-slate-300 hidden lg:table-cell">Created At</TableHead>
              <TableHead className="px-6 py-4 text-right text-xs font-semibold text-indigo-800 uppercase tracking-wider dark:text-slate-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id} className="border-t border-indigo-200 hover:bg-indigo-50/30 dark:border-slate-800 dark:hover:bg-slate-900/20">
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full">
                        <span className="text-indigo-700 font-bold">{user.name?.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-indigo-900 dark:text-white">{user.name}</div>
                        <div className="text-sm text-indigo-600 dark:text-slate-400 flex items-center mt-1">
                          <Mail className="h-3 w-3 mr-1.5" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      <Shield className="h-3 w-3 mr-1.5" />
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-indigo-700 dark:text-slate-400 hidden lg:table-cell">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {canDeleteUsers && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400"
                        onClick={() => handleDeleteUser(user.id, user.name || 'Unnamed User')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="px-6 py-10 text-center text-indigo-600 dark:text-slate-400">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}