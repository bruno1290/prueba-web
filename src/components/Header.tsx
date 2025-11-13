import { Menu, Instagram, Phone } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onAdminClick: () => void;
}

export default function Header({ onAdminClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1f1f1d] shadow-sm text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/logo-header.png" alt="Dropped Logo" className="h-12 w-auto" />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('iphones')}
              className="text-white hover:text-[#00D563] transition-colors font-medium"
            >
              iPhones
            </button>
            <button
              onClick={() => scrollToSection('macbooks')}
              className="text-white hover:text-[#00D563] transition-colors font-medium"
            >
              MacBooks
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-[#00D563] transition-colors font-medium"
            >
              Contacto
            </button>
            <button
              onClick={onAdminClick}
              className="text-white hover:text-[#00D563] transition-colors font-medium"
            >
              Admin
            </button>
            <a
              href="https://www.instagram.com/dropped.cl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#00D563] transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="tel:+56959480660"
              className="text-white hover:text-[#00D563] transition-colors"
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <button
              onClick={() => scrollToSection('iphones')}
              className="block w-full text-left text-white hover:text-[#00D563] transition-colors font-medium"
            >
              iPhones
            </button>
            <button
              onClick={() => scrollToSection('macbooks')}
              className="block w-full text-left text-white hover:text-[#00D563] transition-colors font-medium"
            >
              MacBooks
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-white hover:text-[#00D563] transition-colors font-medium"
            >
              Contacto
            </button>
            <button
              onClick={onAdminClick}
              className="block w-full text-left text-white hover:text-[#00D563] transition-colors font-medium"
            >
              Admin
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
