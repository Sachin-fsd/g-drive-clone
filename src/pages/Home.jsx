const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative z-10">
        {/* Enhanced Navbar */}
        <header className="backdrop-blur-md bg-white/80 border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 group">
                <div className="relative">
                  <img 
                    src="/logo.jpg" 
                    alt="SkyVault Logo" 
                    className="h-10 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  SkyVault
                </h1>
              </div>
              
              <nav className="flex gap-4">
                <a 
                  href="/login" 
                  className="px-6 py-2.5 text-gray-700 font-medium rounded-xl hover:bg-white/60 hover:text-blue-600 transition-all duration-300 border border-transparent hover:border-blue-200"
                >
                  Sign In
                </a>
                <a 
                  href="/register" 
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Enhanced Hero Section */}
        <main className="relative">
          <div className="max-w-7xl mx-auto px-6 py-20 text-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Now with enhanced security features
              </div>
              
              <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                Your Files,
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                  Everywhere
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Experience the future of cloud storage with SkyVault. 
                <br className="hidden sm:block" />
                Secure, lightning-fast, and beautifully simple file management.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                <a
                  href="/register"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Today
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a
                  href="/login"
                  className="px-8 py-4 text-gray-700 font-semibold rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 backdrop-blur-sm"
                >
                  Sign In
                </a>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">10GB</div>
                  <div className="text-gray-600">Free Storage</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">256-bit</div>
                  <div className="text-gray-600">Encryption</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
                  <div className="text-gray-600">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Enhanced Features Section */}
        <section className="py-24 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose SkyVault?
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Built with modern technology and designed for the way you work today
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 1v6m8-6v6" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Smart Organization</h4>
                  <p className="text-gray-600 leading-relaxed">
                    AI-powered file organization with intelligent tagging and instant search capabilities.
                  </p>
                </div>
              </div>

              <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Security</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Military-grade encryption with advanced access controls and real-time threat monitoring.
                  </p>
                </div>
              </div>

              <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Lightning Speed</h4>
                  <p className="text-gray-600 leading-relaxed">
                    Global CDN network ensures blazing-fast uploads, downloads, and real-time synchronization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <img src="/logo.jpg" alt="SkyVault Logo" className="h-8 rounded-lg" />
                <span className="text-2xl font-bold">SkyVault</span>
              </div>
              <div className="flex gap-6 text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Support</a>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              © {new Date().getFullYear()} SkyVault. All rights reserved. Built with ❤️ for secure file management.
            </div>
          </div>
        </footer>
      </div>
      
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes gradient {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-gradient { animation: gradient 3s ease infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .bg-grid-pattern {
          background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default Home;
