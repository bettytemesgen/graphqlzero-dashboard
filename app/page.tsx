import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Growth from '@/components/landing/Growth';
// import Footer from '@/components/landing/Footer';
import CodePreview from '@/components/landing/CodePreview'; // ✅ Add this
import CTA from '@/components/landing/CTA'; // ✅ Added
import Footer from '@/components/landing/Footer'; // ✅ Added
export default function Home() {
  return (
    <main className="min-h-screen bg-white font-manrope">
      <Navbar />
      <Hero />
      
      {/* Growth Section */}
      <Growth />
      <CodePreview/>
      <CTA/>
      <Footer/>
      {/* Footer Section */}
      {/* <Footer /> */}
    </main> 
    /* Fixed: Changed </section> to </main> */
  );
}