// pages/PanelAnalista.jsx
import { useContext, useState, useMemo } from 'react';
import { EncuestasContext } from '../context/EncuestasContext';
import ResultadosGrafico from '../components/ResultadosGrafico';
import Card from '../components/ui/Card';

export default function PanelAnalista() {
  const { encuestas, respuestas } = useContext(EncuestasContext);
  const [selectedEncuestaId, setSelectedEncuestaId] = useState(encuestas.length > 0 ? encuestas[0].id : null);

  const selectedEncuesta = encuestas.find(e => e.id === parseInt(selectedEncuestaId));

  // Filtrar respuestas por encuesta seleccionada
  const respuestasFiltradas = useMemo(() => {
    if (!selectedEncuestaId) return [];
    return respuestas.filter(r => r.encuestaId === parseInt(selectedEncuestaId));
  }, [respuestas, selectedEncuestaId]);

  // Procesar datos demográficos
  const demographicsData = useMemo(() => {
    if (respuestasFiltradas.length === 0) return null;

    const processField = (field) => {
      const counts = respuestasFiltradas.reduce((acc, r) => {
        const val = r.demografia[field] || 'No especificado';
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});
      return Object.entries(counts).map(([name, value]) => ({ name, value }));
    };

    return {
      sexo: processField('sexo'),
      edad: processField('rangoEdad'),
      educacion: processField('nivelEducativo'),
      ocupacion: processField('ocupacion')
    };
  }, [respuestasFiltradas]);

  // Procesar respuestas por pregunta
  const questionsData = useMemo(() => {
    if (!selectedEncuesta || respuestasFiltradas.length === 0) return [];

    return selectedEncuesta.preguntas.map((pregunta, index) => {
      // Ignorar preguntas abiertas por ahora para gráficos
      if (pregunta.tipo === 'libre') return null;

      const counts = respuestasFiltradas.reduce((acc, r) => {
        // Encontrar la respuesta correspondiente a esta pregunta
        const respObj = r.respuestas.find(res => res.pregunta === (pregunta.texto || pregunta));
        const val = respObj ? respObj.respuesta : 'Sin respuesta';
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});

      return {
        pregunta: pregunta.texto || pregunta,
        data: Object.entries(counts).map(([name, value]) => ({ name, value }))
      };
    }).filter(Boolean);
  }, [selectedEncuesta, respuestasFiltradas]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-heading font-bold text-peruBlue dark:text-darkText mb-2">
            📊 Panel del Analista
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Análisis y visualización de encuestas</p>
        </div>

        {/* Selector de Encuesta */}
        <div className="w-full md:w-64">
          <select
            value={selectedEncuestaId || ''}
            onChange={(e) => setSelectedEncuestaId(e.target.value)}
            className="w-full px-4 py-2 border border-peruBlue rounded-lg bg-white dark:bg-darkCard dark:text-white font-semibold"
          >
            {encuestas.map(e => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="text-center">
          <div className="text-4xl font-bold text-peruBlue dark:text-success">{respuestasFiltradas.length}</div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Respuestas Totales</p>
        </Card>
      </div>

      {respuestasFiltradas.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">👥 Demografía</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Género">
              <ResultadosGrafico data={demographicsData.sexo} xKey="name" yKey="value" color="#1565C0" />
            </Card>
            <Card title="Rango de Edad">
              <ResultadosGrafico data={demographicsData.edad} xKey="name" yKey="value" color="#2E7D32" />
            </Card>
            <Card title="Nivel Educativo">
              <ResultadosGrafico data={demographicsData.educacion} xKey="name" yKey="value" color="#ED6C02" />
            </Card>
            <Card title="Ocupación">
              <ResultadosGrafico data={demographicsData.ocupacion} xKey="name" yKey="value" color="#D32F2F" />
            </Card>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">📝 Resultados por Pregunta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questionsData.map((q, idx) => (
              <Card key={idx} title={q.pregunta}>
                <ResultadosGrafico data={q.data} xKey="name" yKey="value" color="#1E1E2F" />
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card>
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">No hay respuestas registradas para esta encuesta.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
