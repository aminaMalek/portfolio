'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

type NavbarProps = {
  data: {
    profile: {
      name: string;
      contact: {
        email: string;
        linkedin: string;
      };
    };
  };
  scrollToSection: (sectionId: string) => void;
  activeSection: string;
};

export default function Navbar({ data, scrollToSection, activeSection }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 w-full bg-gray-800/95 backdrop-blur-sm z-50 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-400">{data?.profile.name}</h1>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-6">
            {['profile', 'competences', 'experiences', 'projets', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize transition-colors hover:text-blue-400 ${
                  activeSection === section ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {section === 'competences' ? 'Compétences' : 
                 section === 'experiences' ? 'Expériences' :
                 section === 'projets' ? 'Projets' : section}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-300">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4">
            {['profile', 'competences', 'experiences', 'projets', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => {
                  scrollToSection(section);
                  closeMenu();
                }}
                className={`capitalize text-left transition-colors hover:text-blue-400 ${
                  activeSection === section ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {section === 'competences' ? 'Compétences' : 
                 section === 'experiences' ? 'Expériences' :
                 section === 'projets' ? 'Projets' : section}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
