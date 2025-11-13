import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <ProductSection
        category="iphone"
        title="iPhones Disponibles"
        sectionId="iphones"
      />
      <ProductSection
        category="macbook"
        title="MacBooks Disponibles"
        sectionId="macbooks"
      />
      <Contact />
      <Footer />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}

export default App;
