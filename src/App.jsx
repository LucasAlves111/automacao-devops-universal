import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, TrendingUp, Users, Menu, X, Check, Mail, Phone, MapPin, Send } from 'lucide-react';

const MetroLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Server might be down.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Metro</h1>
            
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>

            <div className="hidden md:flex space-x-4">
              <button className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">Sign In</button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all">Get Started</button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md">
            <div className="px-4 pt-2 pb-4 space-y-3">
              <a href="#services" className="block py-2 hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#about" className="block py-2 hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#contact" className="block py-2 hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Title, Description, Image */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green via-blue-100 to-cyan-100 bg-clip-text text-transparent">
            Banking for the Future
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Experienc financial freedom with Metro's cutting-edge digital banking platform
          </p>
          <button className="group px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all text-lg font-semibold inline-flex items-center">
            Start Your Journey <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto mt-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-800/50 p-6 rounded-xl">
                  <div className="text-cyan-400 text-sm mb-2">Total Balance</div>
                  <div className="text-3xl font-bold">$124,582</div>
                  <div className="text-green-400 text-sm mt-2">+12.5%</div>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl">
                  <div className="text-cyan-400 text-sm mb-2">Investments</div>
                  <div className="text-3xl font-bold">$89,240</div>
                  <div className="text-green-400 text-sm mt-2">+8.2% ROI</div>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl">
                  <div className="text-cyan-400 text-sm mb-2">Savings</div>
                  <div className="text-3xl font-bold">78%</div>
                  <div className="text-blue-400 text-sm mt-2">$3,200 to go</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Grid with 3 Cards */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16">Our Services</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 hover:border-blue-500/50 transition-all transform hover:scale-105">
              <Shield className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-2xl font-semibold mb-3">Secure Banking</h4>
              <p className="text-slate-300">Bank-grade security with multi-factor authentication and encrypted transactions to protect your assets.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 hover:border-blue-500/50 transition-all transform hover:scale-105">
              <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-2xl font-semibold mb-3">Investment Advisory</h4>
              <p className="text-slate-300">Expert guidance and portfolio management to help you reach your financial goals faster.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 hover:border-blue-500/50 transition-all transform hover:scale-105">
              <Users className="w-12 h-12 text-blue-400 mb-4" />
              <h4 className="text-2xl font-semibold mb-3">Personal Support</h4>
              <p className="text-slate-300">24/7 dedicated support team ready to assist you with all your financial needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - History and Mission */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">About Metro</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-white/10">
              <h4 className="text-2xl font-bold mb-4 text-cyan-400">Our History</h4>
              <p className="text-slate-300 mb-4">
                Founded in 2015, Metro Financial Services emerged from a vision to democratize access to sophisticated financial tools. What started as a small fintech startup has grown into a trusted platform serving over 1 million users worldwide.
              </p>
              <p className="text-slate-300">
                Today, Metro stands at the forefront of digital financial services, continuously innovating to provide our customers with the tools they need to achieve financial freedom.
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-white/10">
              <h4 className="text-2xl font-bold mb-4 text-cyan-400">Our Mission</h4>
              <p className="text-slate-300 mb-6">
                At Metro, our mission is to empower individuals and businesses to take control of their financial future through innovative, accessible, and secure banking solutions.
              </p>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div><h5 className="font-semibold">Innovation First</h5><p className="text-slate-400 text-sm">Cutting-edge financial solutions</p></div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div><h5 className="font-semibold">Customer Focused</h5><p className="text-slate-400 text-sm">Your needs guide our decisions</p></div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                  <div><h5 className="font-semibold">Security & Trust</h5><p className="text-slate-400 text-sm">Highest standards always</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-12">Get In Touch</h3>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl border border-white/10">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-slate-400">support@metro-financial.com</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl border border-white/10">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-slate-400">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-2xl border border-white/10">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Office</h4>
                    <p className="text-slate-400">123 Financial District, NY 10004</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-2xl border border-white/10">
              {formSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-slate-400">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                      className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-white/10 focus:border-cyan-400 focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                      className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-white/10 focus:border-cyan-400 focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required
                      className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-white/10 focus:border-cyan-400 focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-white/10 focus:border-cyan-400 focus:outline-none transition-colors resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 font-semibold flex items-center justify-center">
                    Send Message <Send className="ml-2 w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Social Links and Copyright */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Metro</h4>
              <p className="text-slate-400 mb-4">Modern banking for modern life</p>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <span className="text-xs">FB</span>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <span className="text-xs">TW</span>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <span className="text-xs">IG</span>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-xs">LI</span>
                </a>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Products</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400">Checking</a></li>
                <li><a href="#" className="hover:text-blue-400">Savings</a></li>
                <li><a href="#" className="hover:text-blue-400">Investments</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400">About</a></li>
                <li><a href="#" className="hover:text-blue-400">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400">Press</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400">Contact</a></li>
                <li><a href="#" className="hover:text-blue-400">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2026 Metro Financial Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MetroLanding;