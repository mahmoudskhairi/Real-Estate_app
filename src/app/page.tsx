"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  BarChart3,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Building2,
    title: "Property Management",
    description:
      "Manage your entire real estate portfolio with advanced tracking and analytics.",
  },
  {
    icon: Users,
    title: "Client Portal",
    description:
      "Give clients 24/7 access to their properties, documents, and support tickets.",
  },
  {
    icon: BarChart3,
    title: "Pipeline Tracking",
    description:
      "Visual Kanban boards to track leads from first contact to closed deals.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Role-based access control with JWT authentication and encrypted data.",
  },
];

const benefits = [
  "Streamline operations with automated workflows",
  "Increase conversion rates with visual pipeline management",
  "Reduce support overhead with self-service client portal",
  "Make data-driven decisions with real-time analytics",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black" />
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Header */}
      <header className="relative z-10 border-b border-slate-800/50 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-indigo-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              NEXUS ERP
            </span>
          </div>
          <Link href="/login">
            <Button
              variant="outline"
              className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent">
            The Future of Real Estate Management
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-8 max-w-2xl mx-auto">
            A next-generation ERP platform designed for modern real estate
            agencies. Streamline operations, delight clients, and close more
            deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-8"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800/50 text-lg px-8"
            >
              Watch Demo
            </Button>
          </div>
        </motion.div>

        {/* Hero Image/Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 relative"
        >
          <div className="relative rounded-lg border border-slate-800 bg-slate-950/50 backdrop-blur-xl p-2 shadow-2xl shadow-indigo-500/20">
            <div className="aspect-video rounded-md bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8">
                <BarChart3 className="h-24 w-24 text-indigo-400 mx-auto mb-4 opacity-50" />
                <p className="text-slate-500">Dashboard Preview</p>
              </div>
            </div>
          </div>
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 blur-3xl -z-10" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need to Scale
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Built for the modern real estate professional with cutting-edge
            technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="h-full p-6 rounded-lg border border-slate-800 bg-slate-950/50 backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-300">
                <feature.icon className="h-12 w-12 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Leading Agencies Choose NEXUS
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-lg text-slate-300">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-lg border border-slate-800 bg-gradient-to-br from-indigo-950/50 to-slate-950/50 backdrop-blur-xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                  10x
                </div>
                <p className="text-xl text-slate-400">Faster Deal Closure</p>
              </div>
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-950/50 to-slate-950/50 backdrop-blur-xl p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-cyan-500/5" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of agencies already using NEXUS to streamline their
              operations
            </p>
            <Link href="/login">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg px-12"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 bg-black/50 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-indigo-400" />
              <span className="font-semibold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                NEXUS ERP
              </span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2025 NEXUS ERP. Built with Next.js, Hono, and Prisma.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
