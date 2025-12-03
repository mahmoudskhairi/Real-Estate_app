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
        setProducts(data);
      } else {
        toast.error('Failed to load properties');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
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
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Properties
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
              <DialogDescription>
                Create a new property listing. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-slate-200">Property Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-slate-800 bg-slate-900/50 text-white"
                    placeholder="Luxury Villa in Malibu"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location" className="text-slate-200">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="border-slate-800 bg-slate-900/50 text-white"
                    placeholder="Malibu, California"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price" className="text-slate-200">Price</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="border-slate-800 bg-slate-900/50 text-white"
                    placeholder="$12,500,000"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type" className="text-slate-200">Type</Label>
                  <Input
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="border-slate-800 bg-slate-900/50 text-white"
                    placeholder="Real Estate"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-slate-700 text-slate-300">
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  Add Property
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-md border border-slate-800 bg-slate-950/50 backdrop-blur-xl">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-800 hover:bg-slate-900/50">
              <TableHead className="text-slate-400">Name</TableHead>
              <TableHead className="text-slate-400">Type</TableHead>
              <TableHead className="text-slate-400 text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400 py-8">
                  Loading properties...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-slate-400 py-8">
                  No properties found. Add your first property!
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow
                  key={product.id}
                  className="border-slate-800 hover:bg-slate-900/50"
                >
                  <TableCell className="font-medium text-slate-200">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-slate-400">{product.category}</TableCell>
                  <TableCell className="text-right text-slate-200">
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
