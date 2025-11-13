export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <button
              onClick={() => scrollToSection('iphones')}
              className="px-12 py-4 rounded-full text-2xl font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-all min-w-[190px]"
            >
              Compra
            </button>
            <button
              id="hero-sell-button"
              onClick={() => scrollToSection('contact')}
              className="px-12 py-4 rounded-full text-2xl font-semibold bg-[#00D563] text-white hover:bg-[#00c056] transition-all min-w-[190px]"
            >
              Vende
            </button>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-gray-900">
            Seguro.
          </p>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto mt-8">
            No te arriesgues en Marketplace.
            <span className="block mt-2 font-medium">Desde el iPhone 11 y MacBooks desde 2020.</span>
          </p>
          <button
            onClick={() => scrollToSection('iphones')}
            className="bg-[#00D563] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#00c056] transition-all transform hover:scale-105 shadow-lg"
          >
            Ver Productos
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#00D563] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Proceso Seguro</h3>
            <p className="text-gray-600">
              Transacciones verificadas y protegidas en cada paso
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#00D563] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Precios Justos</h3>
            <p className="text-gray-600">
              Cotizaciones transparentes al instante
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
