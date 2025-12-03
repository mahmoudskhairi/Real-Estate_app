"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  metadata?: any;
}

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", price: "", type: "Real Estate", location: "" });

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        // Validate that data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Invalid data format:', data);
          setProducts([]);
          toast.error('Invalid data format received');
        }
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Failed to load properties' }));
        console.error('API error:', errorData);
        setProducts([]);
        toast.error(errorData.message || 'Failed to load properties');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      toast.error('Error loading properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: `Located in ${formData.location}`,
          price: parseFloat(formData.price.replace(/[$,]/g, '')),
          category: formData.type,
          metadata: { location: formData.location },
        }),
      });

      if (response.ok) {
        toast.success(`Property "${formData.name}" added successfully!`);
        setOpen(false);
        setFormData({ name: "", price: "", type: "Real Estate", location: "" });
        fetchProducts(); // Refresh the list
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to add property');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Error adding property');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent dark:text-white dark:bg-none">
          Properties
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-emerald-200 dark:bg-slate-950 dark:border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-emerald-900 dark:text-white">Add New Property</DialogTitle>
              <DialogDescription className="text-emerald-700 dark:text-slate-400">
                Create a new property listing. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-emerald-900 font-semibold dark:text-slate-200 dark:font-normal">Property Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-emerald-300 bg-white text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="Luxury Villa in Malibu"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location" className="text-teal-900 font-semibold dark:text-slate-200 dark:font-normal">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="border-teal-300 bg-white text-teal-900 placeholder:text-teal-400 focus:border-teal-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="Malibu, California"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price" className="text-cyan-900 font-semibold dark:text-slate-200 dark:font-normal">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="border-cyan-300 bg-white text-cyan-900 placeholder:text-cyan-400 focus:border-cyan-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="$12,500,000"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type" className="text-emerald-900 font-semibold dark:text-slate-200 dark:font-normal">Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="border-emerald-300 bg-white text-emerald-900 placeholder:text-emerald-400 focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500"
                    placeholder="Real Estate"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                  Cancel
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:from-transparent dark:to-transparent">
                  Add Property
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-lg border-2 border-emerald-200 bg-white shadow-lg overflow-hidden dark:border-slate-800 dark:bg-slate-950/50 dark:backdrop-blur-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-emerald-100 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:border-slate-800 dark:bg-transparent dark:hover:bg-slate-900/50">
              <TableHead className="text-emerald-900 font-bold dark:text-slate-400 dark:font-medium">Name</TableHead>
              <TableHead className="text-teal-900 font-bold dark:text-slate-400 dark:font-medium">Type</TableHead>
              <TableHead className="text-cyan-900 font-bold text-right dark:text-slate-400 dark:font-medium">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-teal-600 py-8 dark:text-slate-400">
                  Loading properties...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-teal-600 py-8 dark:text-slate-400">
                  No properties found. Add your first property!
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow
                  key={product.id}
                  className="border-emerald-50 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 transition-all dark:border-slate-800 dark:hover:bg-slate-900/50 dark:hover:from-transparent dark:hover:to-transparent"
                >
                  <TableCell className="font-semibold text-emerald-700 dark:text-slate-200">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-teal-600 dark:text-slate-400">{product.category}</TableCell>
                  <TableCell className="text-right font-bold text-cyan-700 dark:text-slate-200">
                    ${product.price.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
