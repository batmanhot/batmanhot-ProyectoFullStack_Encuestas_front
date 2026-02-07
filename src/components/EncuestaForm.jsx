import { useState, useContext, useEffect } from 'react';
import { EncuestasContext } from '../context/EncuestasContext';
import { toast } from 'react-toastify';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import Card from './ui/Card';

export default function EncuestaForm({ preselectedId = null, isPublic = false }) {
  const { getEncuestasActivas, registrarRespuesta } = useContext(EncuestasContext);
  const encuestasActivas = getEncuestasActivas();

  const [encuestaSeleccionada, setEncuestaSeleccionada] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [demografia, setDemografia] = useState({
    sexo: '',
    rangoEdad: '',
    nivelEducativo: '',
    ocupacion: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [fechaEnvio, setFechaEnvio] = useState('');

  useEffect(() => {
    if (preselectedId && encuestasActivas.length > 0) {
      const encuesta = encuestasActivas.find((e) => e.id === parseInt(preselectedId));
      if (encuesta) {
        setEncuestaSeleccionada(encuesta);
      } else if (isPublic) {
        // Si es público y no encuentra la encuesta, podría mostrar error, 
        // pero por ahora dejaremos que el render decida qué mostrar si no hay seleccionada
      }
    }
  }, [preselectedId, encuestasActivas, isPublic]);

  const RANGOS_EDAD = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
  const NIVELES_EDUCATIVOS = ['Primaria', 'Secundaria', 'Técnico', 'Universitario', 'Posgrado', 'Sin estudios'];
  const OCUPACIONES = ['Estudiante', 'Trabajador Independiente', 'Empleado', 'Desempleado', 'Jubilado', 'Hogar', 'Otro'];

  const handleSeleccionarEncuesta = (encuestaId) => {
    const encuesta = encuestasActivas.find((e) => e.id === parseInt(encuestaId));
    setEncuestaSeleccionada(encuesta);
    setRespuestas({});
    setDemografia({ sexo: '', rangoEdad: '', nivelEducativo: '', ocupacion: '' });
    setEnviado(false);
  };

  const handleRespuestaChange = (preguntaIndex, valor) => {
    setRespuestas((prev) => ({
      ...prev,
      [`pregunta_${preguntaIndex}`]: valor,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!encuestaSeleccionada) {
      toast.warning('⚠️ Por favor selecciona una encuesta');
      return;
    }

    // Validar demografía completa
    const missingDemografia = !demografia.sexo || !demografia.rangoEdad || !demografia.nivelEducativo || !demografia.ocupacion;
    if (missingDemografia) {
      toast.warning('⚠️ Por favor completa todos los datos del entrevistado');
      return;
    }

    // Validar que todas las preguntas tengan respuesta
    const todasResponsabilidades = encuestaSeleccionada.preguntas.every(
      (_, index) => respuestas[`pregunta_${index}`] && respuestas[`pregunta_${index}`].toString().trim()
    );

    if (!todasResponsabilidades) {
      toast.warning('⚠️ Por favor responde todas las preguntas');
      return;
    }

    const fechaActual = new Date().toLocaleString();
    const datosRespuesta = {
      encuestaId: encuestaSeleccionada.id,
      nombreEncuesta: encuestaSeleccionada.nombre,
      timestamp: fechaActual,
      demografia: demografia,
      respuestas: encuestaSeleccionada.preguntas.map((pregunta, index) => ({
        pregunta: pregunta.texto || pregunta,
        respuesta: respuestas[`pregunta_${index}`],
      })),
    };

    registrarRespuesta(datosRespuesta);
    toast.success('✅ Respuestas registradas correctamente');

    if (isPublic) {
      setFechaEnvio(fechaActual);
      setEnviado(true);
    } else {
      setEncuestaSeleccionada(null);
      setRespuestas({});
      setDemografia({ sexo: '', rangoEdad: '', nivelEducativo: '', ocupacion: '' });
    }
  };

  const OPCIONES_RAPIDAS = ['Muy Bueno', 'Bueno', 'Regular', 'Malo', 'Muy Malo', 'Sí', 'No'];

  if (enviado && isPublic) {
    return (
      <Card>
        <div className="text-center py-12 space-y-4">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">¡Gracias por tu participación!</h2>
          <p className="text-gray-600 dark:text-gray-400">Tus respuestas han sido registradas exitosamente.</p>
          <div className="inline-block bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-lg border border-blue-100 dark:border-blue-800">
            <p className="text-sm text-peruBlue dark:text-blue-300 font-medium">
              📅 Fecha de registro: {fechaEnvio}
            </p>
          </div>
          <div>
            <Button onClick={() => window.location.reload()} variant="primary" className="mt-4">
              Llenar otra vez
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Si hay un ID preseleccionado (ruta pública) pero no se encuentra la encuesta
  if (preselectedId && !encuestaSeleccionada) {
    // Podríamos mostrar un spinner si `encuestasActivas` está vacío (loading), 
    // pero asumiendo carga síncrona/rápida del contexto para este ejemplo:
    if (encuestasActivas.length > 0) {
      return (
        <Card>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p className="text-lg">❌ Encuesta no encontrada o inactiva</p>
            <p className="text-sm">El enlace podría ser incorrecto o la encuesta ha finalizado.</p>
          </div>
        </Card>
      );
    }
    // Si aún no cargan las encuestas, no mostramos nada o un loading simple
    return <div className="p-8 text-center">Cargando encuesta...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Selector de Encuesta - Solo mostrar si NO hay encuesta seleccionada Y NO es modo público con ID */}
      {!encuestaSeleccionada && !preselectedId ? (
        <Card>
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-peruBlue dark:text-blue-400">
              📋 Selecciona una Encuesta
            </h2>

            {encuestasActivas.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {encuestasActivas.map((encuesta) => (
                  <button
                    key={encuesta.id}
                    onClick={() => handleSeleccionarEncuesta(encuesta.id)}
                    className="p-4 text-left border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-peruBlue dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-400/10 transition-all"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-darkText">
                      {encuesta.nombre}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {encuesta.descripcion}
                    </p>
                    <div className="flex gap-2 mt-2 text-xs">
                      <span className="bg-success/20 text-success px-2 py-1 rounded">
                        ✅ Activa
                      </span>
                      <span className="bg-blue-100 dark:bg-blue-400/20 text-peruBlue dark:text-blue-400 px-2 py-1 rounded">
                        {encuesta.preguntas?.length || 0} preguntas
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p className="text-lg">📭 No hay encuestas disponibles en este momento</p>
                <p className="text-sm">Contacta al administrador para crear nuevas encuestas</p>
              </div>
            )}
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-peruBlue dark:text-blue-400">
                    📝 {encuestaSeleccionada?.nombre}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {encuestaSeleccionada?.descripcion}
                  </p>
                </div>
                {!isPublic && (
                  <button
                    type="button"
                    onClick={() => {
                      setEncuestaSeleccionada(null);
                      setRespuestas({});
                      setDemografia({ sexo: '', rangoEdad: '', nivelEducativo: '', ocupacion: '' });
                    }}
                    className="text-gray-500 dark:text-gray-400 hover:text-peruRed transition-colors"
                  >
                    ✕ Cambiar
                  </button>
                )}
              </div>

              {/* Datos Demográficos */}
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm uppercase tracking-wide">
                  👤 Datos del Entrevistado
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Sexo */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      a) Sexo
                    </label>
                    <div className="flex gap-4">
                      {['Masculino', 'Femenino'].map((sexo) => (
                        <label key={sexo} className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${demografia.sexo === sexo
                            ? 'border-peruBlue bg-peruBlue'
                            : 'border-gray-300 dark:border-gray-600 group-hover:border-peruBlue/50'
                            }`}>
                            {demografia.sexo === sexo && (
                              <div className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </div>
                          <input
                            type="radio"
                            name="sexo"
                            value={sexo}
                            checked={demografia.sexo === sexo}
                            onChange={(e) => setDemografia(prev => ({ ...prev, sexo: e.target.value }))}
                            className="hidden"
                          />
                          <span className={`text-sm ${demografia.sexo === sexo ? 'font-bold text-peruBlue dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                            {sexo}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rango de Edad */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      b) Rango de Edades
                    </label>
                    <select
                      value={demografia.rangoEdad}
                      onChange={(e) => setDemografia(prev => ({ ...prev, rangoEdad: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-peruBlue outline-none"
                    >
                      <option value="">Seleccione rango...</option>
                      {RANGOS_EDAD.map(rango => (
                        <option key={rango} value={rango}>{rango} años</option>
                      ))}
                    </select>
                  </div>

                  {/* Nivel Educativo */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      c) Nivel Educativo
                    </label>
                    <select
                      value={demografia.nivelEducativo}
                      onChange={(e) => setDemografia(prev => ({ ...prev, nivelEducativo: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-peruBlue outline-none"
                    >
                      <option value="">Seleccione nivel...</option>
                      {NIVELES_EDUCATIVOS.map(nivel => (
                        <option key={nivel} value={nivel}>{nivel}</option>
                      ))}
                    </select>
                  </div>

                  {/* Ocupación */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      d) Ocupación
                    </label>
                    <select
                      value={demografia.ocupacion}
                      onChange={(e) => setDemografia(prev => ({ ...prev, ocupacion: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-peruBlue outline-none"
                    >
                      <option value="">Seleccione ocupación...</option>
                      {OCUPACIONES.map(ocupacion => (
                        <option key={ocupacion} value={ocupacion}>{ocupacion}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-400/10 border border-blue-200 dark:border-blue-400/30 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-darkText">
                  💡 Por favor responde todas las preguntas de manera honesta y completa
                </p>
              </div>
            </div>
          </Card>

          {/* Preguntas */}
          <div className="space-y-4">
            {encuestaSeleccionada.preguntas.map((pregunta, index) => (
              <Card key={index} className="!p-4">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-darkText">
                    {index + 1}. {pregunta.texto || pregunta}
                  </label>

                  {pregunta.tipo === 'opciones' ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {OPCIONES_RAPIDAS.map((opcion) => (
                        <button
                          key={opcion}
                          type="button"
                          onClick={() => handleRespuestaChange(index, opcion)}
                          className={`px-4 py-2 text-sm font-medium rounded-full border-2 transition-all ${respuestas[`pregunta_${index}`] === opcion
                            ? 'bg-peruBlue border-peruBlue text-white shadow-md transform scale-105'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-peruBlue/50 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                            }`}
                        >
                          {opcion}
                        </button>
                      ))}
                    </div>
                  ) : pregunta.tipo === 'seleccion' ? (
                    <div className="space-y-2 pt-1 pl-1">
                      {(pregunta.opciones || []).map((opcion, oIndex) => (
                        <label
                          key={oIndex}
                          className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer group ${respuestas[`pregunta_${index}`] === opcion
                            ? 'border-peruBlue bg-blue-50 dark:bg-blue-900/20'
                            : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${respuestas[`pregunta_${index}`] === opcion
                            ? 'border-peruBlue bg-peruBlue'
                            : 'border-gray-300 dark:border-gray-600 group-hover:border-peruBlue/50'
                            }`}>
                            {respuestas[`pregunta_${index}`] === opcion && (
                              <div className="w-2 h-2 rounded-full bg-white shadow-sm" />
                            )}
                          </div>
                          <input
                            type="radio"
                            name={`pregunta_${index}`}
                            checked={respuestas[`pregunta_${index}`] === opcion}
                            onChange={() => handleRespuestaChange(index, opcion)}
                            className="hidden"
                          />
                          <span className={`text-sm font-medium ${respuestas[`pregunta_${index}`] === opcion
                            ? 'text-peruBlue dark:text-blue-400 font-bold'
                            : 'text-gray-700 dark:text-gray-300'
                            }`}>
                            {opcion}
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      value={respuestas[`pregunta_${index}`] || ''}
                      onChange={(e) => handleRespuestaChange(index, e.target.value)}
                      placeholder="Escribe tu respuesta aquí..."
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-peruBlue bg-white text-gray-900 dark:bg-gray-700 dark:text-white"
                      autoComplete="off"
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Botón de Sincronización (Solo visual como en la imagen) */}
          <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-full w-fit">
            <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest">Sincronizado</span>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4 pt-6">
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              ✅ Enviar Respuestas
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setEncuestaSeleccionada(null);
                setRespuestas({});
                setDemografia({ sexo: '', rangoEdad: '' });
              }}
              className="flex-1"
            >
              ✕ Cancelar
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
