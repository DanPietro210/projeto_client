
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleCadastroClick = () => {
    navigate('/cadastro');
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="lovable-uploads/ZayaMTech.png" 
              alt="ZayaM Tech"
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              Sobre
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              Portfólio
            </button>
            <button 
              onClick={handleCadastroClick}
              className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              Cadastro
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-teal-600 to-green-500 text-white px-6 py-2 rounded-full hover:from-teal-700 hover:to-green-600 transition-all duration-300 font-medium"
            >
              Contato
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-teal-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium text-left"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium text-left"
              >
                Serviços
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium text-left"
              >
                Sobre
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium text-left"
              >
                Portfólio
              </button>
              <button 
                onClick={handleCadastroClick}
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium text-left"
              >
                Cadastro
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-teal-600 to-green-500 text-white px-6 py-2 rounded-full hover:from-teal-700 hover:to-green-600 transition-all duration-300 font-medium w-fit"
              >
                Contato
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
