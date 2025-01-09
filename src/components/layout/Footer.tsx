import React from 'react';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-purple-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Heart className="mr-2" /> COEMAV
            </h3>
            <p className="text-purple-200">
              Centro de Oportunidad de Empoderamiento para Mujeres Afectadas por la Violencia
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                <span>Av. Principal #123, Ciudad</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <span>contacto@coemav.org</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Útiles</h4>
            <ul className="space-y-2">
              <li><a href="/privacidad" className="hover:text-purple-200">Política de Privacidad</a></li>
              <li><a href="/terminos" className="hover:text-purple-200">Términos de Uso</a></li>
              <li><a href="/reglas" className="hover:text-purple-200">Reglas de Convivencia</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-purple-800 mt-8 pt-8 text-center">
          <p className="text-purple-200">
            © {new Date().getFullYear()} COEMAV. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}