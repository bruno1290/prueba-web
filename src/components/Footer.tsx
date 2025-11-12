export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src="/5.png" alt="Dropped" className="h-8 w-auto mb-2" />
            <p className="text-gray-400 text-sm">
              Compramos y vendemos Apple de forma segura
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © 2024 Dropped. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}