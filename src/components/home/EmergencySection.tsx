import { Phone, AlertTriangle } from 'lucide-react';
import { emergencyContacts } from '../../data/emergencyContacts';
import { Button } from '../ui/Button';

export function EmergencySection() {
  return (
    <section className="bg-red-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-8">
          <AlertTriangle className="w-8 h-8 text-red-600" />
          <h2 className="text-2xl font-bold text-red-600">Ayuda de Emergencia</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Líneas de Ayuda</h3>
            <div className="space-y-4">
              {emergencyContacts.hotlines.map((hotline) => (
                <div key={hotline.number} className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium">{hotline.name}</p>
                    <p className="text-red-600 font-bold">{hotline.number}</p>
                    <p className="text-sm text-gray-600">Disponible {hotline.hours}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Centros de Atención</h3>
            <div className="space-y-6">
              {emergencyContacts.centers.map((center) => (
                <div key={center.name} className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium text-gray-900">{center.name}</h4>
                  <p className="text-gray-600">{center.address}</p>
                  <p className="text-gray-600">{center.phone}</p>
                  <p className="text-gray-600">{center.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button 
            variant="danger"
            className="text-lg px-8 py-3"
            onClick={() => window.location.href = 'tel:911'}
          >
            Llamar al 911
          </Button>
        </div>
      </div>
    </section>
  );
}