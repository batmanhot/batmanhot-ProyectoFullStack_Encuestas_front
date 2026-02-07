// context/EncuestasContext.jsx
import { createContext, useState } from 'react';
export const EncuestasContext = createContext();

export const EncuestasProvider = ({ children }) => {
  const [encuestas, setEncuestas] = useState([
    {
      id: 1,
      nombre: 'Encuesta Nacional 2026',
      descripcion: 'Preferencias electorales nacionales',
      estado: 'Activa',
      preguntas: [
        { texto: '¿Por cuál partido votaría?', tipo: 'seleccion', opciones: ['Partido A', 'Partido B', 'Partido C', 'Partido D'] },
        { texto: '¿Cuál es tu nivel de satisfacción?', tipo: 'opciones' },
        { texto: '¿Qué opina del actual gobierno?', tipo: 'libre' }
      ],
      respuestas: 245,
      fechaCreacion: '2026-01-15'
    },
    {
      id: 2,
      nombre: 'Preferencias Políticas',
      descripcion: 'Análisis de políticas públicas',
      estado: 'Activa',
      preguntas: [{ texto: 'Preguntas sobre políticas', tipo: 'libre' }],
      respuestas: 189,
      fechaCreacion: '2026-01-20'
    },
    {
      id: 3,
      nombre: 'Satisfacción Ciudadana',
      descripcion: 'Evaluación de servicios',
      estado: 'Cerrada',
      preguntas: [{ texto: 'Preguntas sobre satisfacción', tipo: 'opciones' }],
      respuestas: 456,
      fechaCreacion: '2026-01-10'
    },
  ]);

  const [respuestas, setRespuestas] = useState([]);
  const [encuestadores, setEncuestadores] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      dni: '12345678',
      zona: {
        departamento: 'Lima',
        provincia: 'Lima',
        distrito: 'Miraflores',
        centroEducativo: 'C.E. Miraflores High'
      }
    },
    {
      id: 2,
      nombre: 'María Garcia',
      dni: '87654321',
      zona: {
        departamento: 'Cusco',
        provincia: 'Cusco',
        distrito: 'Wanchaq',
        centroEducativo: 'I.E. Inca Garcilaso'
      }
    }
  ]);

  const crearEncuesta = (datosEncuesta) => {
    const nuevaEncuesta = {
      id: Date.now(),
      ...datosEncuesta,
      estado: 'Activa',
      respuestas: 0,
      fechaCreacion: new Date().toISOString().split('T')[0],
      preguntas: datosEncuesta.preguntas || []
    };
    setEncuestas((prev) => [...prev, nuevaEncuesta]);
    return nuevaEncuesta;
  };

  const cerrarEncuesta = (encuestaId) => {
    setEncuestas((prev) =>
      prev.map((enc) =>
        enc.id === encuestaId ? { ...enc, estado: 'Cerrada' } : enc
      )
    );
  };

  const eliminarEncuesta = (encuestaId) => {
    setEncuestas((prev) => prev.filter((enc) => enc.id !== encuestaId));
  };

  const registrarRespuesta = (respuesta) => {
    setRespuestas((prev) => [...prev, respuesta]);
    // Incrementar contador de respuestas
    setEncuestas((prev) =>
      prev.map((enc) =>
        enc.id === respuesta.encuestaId
          ? { ...enc, respuestas: enc.respuestas + 1 }
          : enc
      )
    );
  };

  const registrarEncuestador = (datos) => {
    const nuevo = {
      id: Date.now(),
      ...datos
    };
    setEncuestadores(prev => [...prev, nuevo]);
    return nuevo;
  };

  const eliminarEncuestador = (id) => {
    setEncuestadores(prev => prev.filter(e => e.id !== id));
  };

  const actualizarEncuestador = (id, nuevosDatos) => {
    setEncuestadores(prev => prev.map(e => (e.id === id ? { ...e, ...nuevosDatos } : e)));
  };

  const getEncuestasActivas = () => encuestas.filter((enc) => enc.estado === 'Activa');

  return (
    <EncuestasContext.Provider
      value={{
        encuestas,
        respuestas,
        crearEncuesta,
        cerrarEncuesta,
        eliminarEncuesta,
        registrarRespuesta,
        getEncuestasActivas,
        encuestadores,
        registrarEncuestador,
        actualizarEncuestador,
        eliminarEncuestador,
      }}
    >
      {children}
    </EncuestasContext.Provider>
  );
};
