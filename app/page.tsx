"use client";

import { NavBar } from "@/components/Blocks/Navbar";
import { Hero, products } from "@/components/Blocks/Hero";
import { PartnerServices } from "@/components/Blocks/PartnerServices";
import { Footer } from "@/components/Blocks/Footer";

export { products };

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden">
      <NavBar />
      <Hero />
      <PartnerServices />
      <Footer />
    </main>
  );
}
