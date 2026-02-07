// pages/PanelEncuestador.jsx
import EncuestaForm from '../components/EncuestaForm';
import Card from '../components/ui/Card';

export default function PanelEncuestador() {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-peruBlue dark:text-darkText mb-2">
          👤 Panel del Encuestador
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Registra las respuestas de las encuestas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="📋 Nueva Respuesta de Encuesta" className="">
            <EncuestaForm />
          </Card>
        </div>
        
        <div>
          <Card title="ℹ️ Información" className="">
            <div className="space-y-4 text-sm">
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-peruBlue p-4 rounded">
                <p className="font-semibold text-peruBlue dark:text-darkText mb-2">Instrucciones</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
                  <li>Selecciona el partido preferido</li>
                  <li>Ingresa la edad del encuestado</li>
                  <li>Haz clic en Registrar</li>
                </ul>
              </div>
              <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                <p>Encuestas 2026</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
