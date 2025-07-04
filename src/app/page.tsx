'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Linkedin, Mail, Phone, ExternalLink, Calendar, Award, Code, Copy } from 'lucide-react';
import portfolioData from './data/data.json';
import Navbar from './navbar';

type PortfolioData = typeof portfolioData;

const Portfolio = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeSection, setActiveSection] = useState('profile');
  const [loading, setLoading] = useState(true);

  const [copied, setCopied] = useState(false);
  const phone = data?.profile.contact.phone;

  const copyToClipboard = () => {
    if (!phone) return;
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(portfolioData);
      setLoading(false);
    };
    
    fetchData();
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement du portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Navigation */}
      {data && (
        <Navbar
          data={data}
          scrollToSection={scrollToSection}
          activeSection={activeSection}
        />
      )}
      {/* Hero Section - Profile */}
      <section id="profile" className="pt-20 min-h-screen flex items-center bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {data?.profile.name}
                </h1>
                <h2 className="text-xl text-gray-300 font-light">{data?.profile.title}</h2>
              </div>
              <p className="text-lg text-gray-400 leading-relaxed">{data?.profile.description}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`mailto:${data?.profile.contact.email}`}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Mail size={18} />
                  <span>Me contacter</span>
                </a>
                <a
                  href={`https://${data?.profile.contact.linkedin}`}
                  className="border border-gray-600 hover:border-blue-400 px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="/CV_Amina_MALEK.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 text-white"
                >
                  <span>Mon CV</span>
                </a>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <Image
                src="/amina.jpg"
                alt="Photo de profil"
                className="w-64 h-64 rounded-full object-cover border-4 border-blue-500 shadow-lg transition-transform duration-500 hover:scale-105"
                width={256}
                height={256}
              />
            </div>
          </div>
        </div>
      </section>


      {/* Compétences */}
      <section id="competences" className="py-20 bg-gray-800/50 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Compétences
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.competences.map((comp, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center">
                  <Code className="mr-2" size={20} />
                  {comp.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {comp.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-blue-600 hover:text-white transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expériences */}
      <section id="experiences" className="py-20 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Expériences
          </h2>
          <div className="space-y-8">
            {data?.experiences.map((exp) => (
              <div key={exp.id} className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-2xl font-semibold text-white">{exp.title}</h3>
                      {exp.award && (
                        <div className="ml-4 flex items-center text-yellow-400">
                          <Award size={20} className="mr-1" />
                          <span className="text-sm">{exp.award}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-blue-400 font-medium mb-2"><a href={exp.link} target="_blank" rel="noopener noreferrer">{exp.company}</a></p>
                    <p className="text-gray-400 mb-4">{exp.role}</p>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar size={16} className="mr-1" />
                    {exp.period}
                  </div>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-600/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projets */}
      <section id="projets" className="py-20 bg-gray-800/50 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Projets Académiques
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data?.projets.map((projet) => (
              <div key={projet.id} className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg group">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {projet.title}
                  </h3>
                  <ExternalLink size={20} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                </div>
                <div className="mb-4">
                  <p className="text-blue-400 text-sm font-medium mb-1"> <a href={projet.link} target="_blank" rel="noopener noreferrer">{projet.institution}</a></p>
                  <div className="flex items-center text-gray-400 text-sm mb-2">
                    <Calendar size={14} className="mr-1" />
                    {projet.period}
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{projet.description}</p>
                <div className="flex flex-wrap gap-2">
                  {projet.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm border border-purple-600/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Contact
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
              Intéressé par mon profil ? N&apos;hésitez pas à me contacter !
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors relative">
              <Phone className="mx-auto mb-4 text-blue-400" size={32} />
              <h3 className="text-lg font-semibold mb-2 text-center">Téléphone</h3>
              <div className="flex items-center justify-center space-x-2">
                <p className="text-gray-400">{phone}</p>
                <button onClick={copyToClipboard} className="text-gray-500 hover:text-blue-400 transition-colors">
                  <Copy size={18} />
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-400 text-center mt-2">Copié !</p>
              )}
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <Mail className="mx-auto mb-4 text-blue-400" size={32} />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-400 text-sm"> <a href={`mailto:${data?.profile.contact.email}`} className="text-blue-400 hover:text-blue-300 transition-colors">{data?.profile.contact.email}</a></p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors">
              <Linkedin className="mx-auto mb-4 text-blue-400" size={32} />
              <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
              <a href={`https://${data?.profile.contact.linkedin}`} 
                 className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                {data?.profile.contact.linkedin}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 {data?.profile.name}. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;