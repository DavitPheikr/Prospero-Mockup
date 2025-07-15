import Navbar from "@/components/layout/Navbar";
import SideNavbar from "@/components/layout/SideNavbar";
import Hero from "@/components/landing/hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <SideNavbar />
        <main style={{ flex: 1 }}>
          <Hero />
        </main>
      </div>
    </>
  );
}
