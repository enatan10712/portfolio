"use client";

import React from "react";
import Link from "next/link";
import { Mail, Globe, Cpu } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter mb-6 block">
              PORTFOLIO<span className="text-neutral-500">.</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              A modern, production-grade portfolio template designed for
              high-performance digital experiences.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="#faq" className="hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Connect</h4>
            <div className="flex gap-4">
              <Link href="#" className="p-2 rounded-full border border-border hover:bg-muted transition-colors">
                <Mail size={20} />
              </Link>
              <Link href="#" className="p-2 rounded-full border border-border hover:bg-muted transition-colors">
                <Globe size={20} />
              </Link>
              <Link href="#" className="p-2 rounded-full border border-border hover:bg-muted transition-colors">
                <Cpu size={20} />
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Modern Portfolio. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
