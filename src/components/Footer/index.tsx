import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  InstagramOutlined,
  FacebookOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { ubuntu } from "@/app/fonts";

export default function Footer () {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 lg:px-16 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className={`${ubuntu.className} text-4xl font-bold mb-4`}>Collyn</h3>
            <p className="text-gray-400 leading-relaxed max-w-md mb-6">
              Simplificando la gestión de pedidos para empresas de todos los tamaños.
              Tu socio confiable en la transformación digital de tu negocio.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors">
                <InstagramOutlined className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors">
                <FacebookOutlined className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors">
                <LinkedinOutlined className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Inicio</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Características</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Precios</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400">
                <MailOutlined className="text-orange-500" />
                <span>raymondnegronvalqui@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <PhoneOutlined className="text-orange-500" />
                <span>+51 950 160 458</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <EnvironmentOutlined className="text-orange-500 mt-1" />
                <span>Arequipa, Perú</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Collyn. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Términos de Servicio</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
