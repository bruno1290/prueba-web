import { Instagram, Phone, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
          Contáctanos
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <a
              href="https://www.instagram.com/dropped.cl/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-2xl p-8 text-center hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <Instagram className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Instagram</h3>
              <p className="text-white opacity-90">@dropped.cl</p>
            </a>

            <a
              href="tel:+56959480660"
              className="bg-[#00D563] rounded-2xl p-8 text-center hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <Phone className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Teléfono</h3>
              <p className="text-white opacity-90">+56 9 5948 0660</p>
            </a>

            <a
              href="https://wa.me/56959480660"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 rounded-2xl p-8 text-center hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <MessageCircle className="h-12 w-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
              <p className="text-white opacity-90">Envíanos un mensaje</p>
            </a>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Dropped?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <div className="text-3xl font-bold text-[#00D563] mb-2">100%</div>
                <p className="text-gray-600">Seguro</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#00D563] mb-2">24h</div>
                <p className="text-gray-600">Respuesta rápida</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#00D563] mb-2">+100</div>
                <p className="text-gray-600">Clientes satisfechos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
