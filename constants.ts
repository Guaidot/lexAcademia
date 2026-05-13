
import { Course, Achievement } from './types';

export const COURSES: Course[] = [
  {
    id: 'civil-1',
    titulo: 'Derecho Civil I: Personas',
    descripcion: 'Análisis de la personalidad jurídica, capacidad, estado civil y domicilio.',
    icono: 'fa-users',
    color: 'bg-blue-600',
    progreso: 0,
    isPremium: false,
    modules: [
      {
        id: 'civil-1-m1',
        titulo: 'Personalidad y Capacidad',
        tema: 'Persona y capacidad jurídica',
        lectura: 'La personalidad juridica se reconoce con el nacimiento con vida. El concebido goza de proteccion para efectos favorables (nasciturus), pero la personalidad plena exige nacimiento. La capacidad de goce es general; la capacidad de ejercicio se adquiere a los 18 anos, con limites por interdicion o minoridad. El domicilio tiene efectos en competencia y notificaciones y se determina por residencia habitual.',
        caso: {
          titulo: 'Acta tardia y capacidad',
          descripcion: 'Una persona nacida en zona rural nunca fue inscrita y ahora requiere firmar un contrato de arrendamiento.',
          documento: 'El interesado solicita inscripcion extemporanea. El registro exige procedimiento judicial. La contraparte duda de su capacidad por falta de acta.',
          pregunta: 'Cual es el criterio juridico correcto?',
          opciones: [
            { id: 'a', texto: 'Sin acta no existe personalidad juridica.', isCorrect: false, feedback: 'La personalidad no depende del acta; la inscripcion prueba el estado civil.' },
            { id: 'b', texto: 'Existe personalidad, pero debe regularizar el estado civil para acreditar identidad.', isCorrect: true, feedback: 'La personalidad surge con el nacimiento con vida, pero el acta es medio de prueba de identidad y estado civil.' },
            { id: 'c', texto: 'La capacidad de ejercicio depende solo de la declaracion jurada.', isCorrect: false, feedback: 'La capacidad depende de la edad y de las restricciones legales.' },
            { id: 'd', texto: 'No puede contratar hasta cumplir 21 anos.', isCorrect: false, feedback: 'La mayoria de edad se alcanza a los 18 anos.' }
          ]
        },
        questionIds: [1, 2, 4, 6, 12, 13]
      },
      {
        id: 'civil-1-m2',
        titulo: 'Estado civil y familia',
        tema: 'Estado civil, familia y tutela',
        lectura: 'El estado civil determina derechos y deberes en materia de familia: matrimonio, divorcio, filiacion y tutela. Las sentencias extranjeras requieren exequatur para producir efectos en Venezuela. La tutela protege a menores o incapaces y exige control judicial y rendicion de cuentas. La emancipacion concede capacidad limitada, con restricciones para actos de disposicion sobre inmuebles.',
        caso: {
          titulo: 'Exequatur y estado civil',
          descripcion: 'Una persona presenta sentencia de divorcio extranjera para contraer nuevo matrimonio.',
          documento: 'El registro exige reconocimiento judicial. El solicitante alega que la apostilla es suficiente.',
          pregunta: 'Que requisito debe cumplir para que la sentencia produzca efectos en Venezuela?',
          opciones: [
            { id: 'a', texto: 'Solo apostillar la sentencia.', isCorrect: false, feedback: 'La apostilla no sustituye el exequatur.' },
            { id: 'b', texto: 'Solicitar exequatur ante el TSJ.', isCorrect: true, feedback: 'La sentencia extranjera requiere pase legal para producir efectos.' },
            { id: 'c', texto: 'Registrar la sentencia en el municipio.', isCorrect: false, feedback: 'No basta el registro local sin reconocimiento judicial.' },
            { id: 'd', texto: 'No puede casarse nunca.', isCorrect: false, feedback: 'Puede casarse si regulariza su estado civil.' }
          ]
        },
        questionIds: [3, 5, 7, 8, 9, 10, 11, 14, 15]
      },
      {
        id: 'civil-1-m3',
        titulo: 'Domicilio y ausencia',
        tema: 'Domicilio, residencia y ausencia presunta',
        lectura: 'El domicilio fija la sede juridica de la persona y tiene efectos en competencia y notificaciones. La residencia es un hecho; el domicilio puede ser legal o voluntario. La ausencia presunta exige lapsos y formalidades para proteger bienes y relaciones juridicas.',
        caso: {
          titulo: 'Residencia vs domicilio legal',
          descripcion: 'Un menor estudia en otra ciudad y se discute su domicilio legal para una citacion judicial.',
          documento: 'La parte demandante notifica en la ciudad donde estudia el menor. La defensa alega nulidad por domicilio equivocado.',
          pregunta: 'Cual es el criterio correcto sobre el domicilio del menor?',
          opciones: [
            { id: 'a', texto: 'Es el lugar donde estudia.', isCorrect: false, feedback: 'La residencia no cambia el domicilio legal de los menores.' },
            { id: 'b', texto: 'Es el de sus padres o representantes legales.', isCorrect: true, feedback: 'El domicilio legal del menor es el de sus representantes.' },
            { id: 'c', texto: 'Puede escoger libremente.', isCorrect: false, feedback: 'El menor no elige domicilio por si solo.' },
            { id: 'd', texto: 'No tiene domicilio.', isCorrect: false, feedback: 'Toda persona tiene domicilio legal.' }
          ]
        },
        questionIds: [1, 4, 16, 17]
      },
      {
        id: 'civil-1-m4',
        titulo: 'Tutela y emancipacion avanzada',
        tema: 'Control judicial y actos de disposicion',
        lectura: 'La tutela protege a personas que no pueden ejercer plenamente sus derechos. El tutor administra bienes bajo control judicial y debe rendir cuentas. La emancipacion otorga capacidad limitada: ciertos actos como enajenar inmuebles requieren autorizacion judicial para proteger el patrimonio del menor.',
        caso: {
          titulo: 'Venta de inmueble por menor emancipado',
          descripcion: 'Un menor emancipado quiere vender un inmueble heredado para financiar estudios.',
          documento: 'El comprador insiste en que la emancipacion permite vender sin autorizacion. El juez debe decidir sobre la validez del acto.',
          pregunta: 'Cual es el requisito legal para la venta del inmueble?',
          opciones: [
            { id: 'a', texto: 'Es suficiente la emancipacion.', isCorrect: false, feedback: 'La emancipacion no elimina el control judicial para actos de disposicion.' },
            { id: 'b', texto: 'Se requiere autorizacion judicial previa.', isCorrect: true, feedback: 'La venta de inmuebles por menores emancipados exige autorizacion judicial.' },
            { id: 'c', texto: 'Solo la autorizacion del tutor.', isCorrect: false, feedback: 'El tutor no sustituye la autorizacion judicial.' },
            { id: 'd', texto: 'No puede vender en ningun caso.', isCorrect: false, feedback: 'Puede vender con autorizacion judicial.' }
          ]
        },
        questionIds: [9, 10, 18, 19]
      }
    ],
    preguntas: [
      { id: 1, dificultad: 'Media', tema: 'Ausencia', enunciado: '¿Cuál es el lapso para declarar la ausencia presunta si el deudor no dejó apoderado?', opciones: [{ id: 'a', texto: '6 meses' }, { id: 'b', texto: '2 años' }, { id: 'c', texto: '1 año' }, { id: 'd', texto: '5 años' }], respuestaCorrecta: 'b', feedback: 'Art. 421 C.C.: Dos años de no tener noticias faculta la presunción.' },
      { id: 2, dificultad: 'Fácil', tema: 'Personalidad', enunciado: '¿Qué teoría de la personalidad adopta el Código Civil venezolano?', opciones: [{ id: 'a', texto: 'Teoría de la Concepción.' }, { id: 'b', texto: 'Teoría de la Vitalidad.' }, { id: 'c', texto: 'Teoría de la Viabilidad.' }, { id: 'd', texto: 'Teoría Ecléctica.' }], respuestaCorrecta: 'b', feedback: 'Art. 17 C.C.: Basta con nacer vivo para ser reputado persona.' },
      { id: 3, dificultad: 'Alta', tema: 'Estado Civil', enunciado: 'Un ciudadano con sentencia de divorcio en el extranjero desea contraer nupcias en Venezuela. Debe:', opciones: [{ id: 'a', texto: 'Casarse directamente.' }, { id: 'b', texto: 'Solicitar el Exequátur ante el TSJ.' }, { id: 'c', texto: 'Registrar la sentencia en la Prefectura.' }, { id: 'd', texto: 'No puede casarse.' }], respuestaCorrecta: 'b', feedback: 'Las sentencias extranjeras requieren pase legal (Exequátur) para tener efectos en territorio nacional.' },
      { id: 4, dificultad: 'Media', tema: 'Domicilio', enunciado: '¿Cuál es el domicilio legal de los menores no emancipados?', opciones: [{ id: 'a', texto: 'Donde estudian.' }, { id: 'b', texto: 'El de sus padres que ejercen la patria potestad.' }, { id: 'c', texto: 'Cualquier residencia.' }, { id: 'd', texto: 'No tienen domicilio.' }], respuestaCorrecta: 'b', feedback: 'Art. 33 C.C.: El domicilio de los menores es el de sus representantes legales.' },
      { id: 5, dificultad: 'Media', tema: 'Commorientes', enunciado: 'En un accidente fallecen padre e hijo sin determinarse el orden. El C.C. presume:', opciones: [{ id: 'a', texto: 'Murió primero el padre.' }, { id: 'b', texto: 'Murió primero el hijo.' }, { id: 'c', texto: 'Muerte simultánea (sin transmisión hereditaria).' }, { id: 'd', texto: 'Transmisión parcial.' }], respuestaCorrecta: 'c', feedback: 'Art. 34 C.C.: Presunción de commoriencia a falta de prueba en contrario.' },
      { id: 6, dificultad: 'Alta', tema: 'Capacidad', enunciado: '¿A qué edad se adquiere la plena capacidad de ejercicio en Venezuela?', opciones: [{ id: 'a', texto: '16 años' }, { id: 'b', texto: '18 años' }, { id: 'c', texto: '21 años' }, { id: 'd', texto: '14 años' }], respuestaCorrecta: 'b', feedback: 'Art. 18 C.C.: La mayoridad se alcanza a los 18 años.' },
      { id: 7, dificultad: 'Media', tema: 'Matrimonio', enunciado: '¿Cuál es la edad mínima para contraer matrimonio con dispensa judicial?', opciones: [{ id: 'a', texto: '14 años' }, { id: 'b', texto: '16 años' }, { id: 'c', texto: 'No hay edad mínima' }, { id: 'd', texto: '12 años' }], respuestaCorrecta: 'b', feedback: 'Art. 46 C.C.: El varón menor de 16 años y la hembra menor de 14 no pueden casarse.' },
      { id: 8, dificultad: 'Alta', tema: 'Divorcio', enunciado: '¿Cuál es el lapso de separación de cuerpos necesario para solicitar la conversión a divorcio?', opciones: [{ id: 'a', texto: '6 meses' }, { id: 'b', texto: '1 año' }, { id: 'c', texto: '2 años' }, { id: 'd', texto: '3 meses' }], respuestaCorrecta: 'b', feedback: 'Art. 185-A C.C.: Transcurrido más de un año tras la separación de cuerpos sin reconciliación.' },
      { id: 9, dificultad: 'Media', tema: 'Tutela', enunciado: 'El tutor debe rendir cuentas de su administración:', opciones: [{ id: 'a', texto: 'Cada 5 años' }, { id: 'b', texto: 'Al finalizar la tutela únicamente' }, { id: 'c', texto: 'Anualmente ante el Juez' }, { id: 'd', texto: 'Nunca' }], respuestaCorrecta: 'c', feedback: 'Art. 367 C.C.: El tutor presentará anualmente un estado de su administración.' },
      { id: 10, dificultad: 'Alta', tema: 'Emancipación', enunciado: '¿Qué acto NO puede realizar un menor emancipado por sí solo?', opciones: [{ id: 'a', texto: 'Casarse' }, { id: 'b', texto: 'Vender sus bienes inmuebles' }, { id: 'c', texto: 'Trabajar' }, { id: 'd', texto: 'Votar' }], respuestaCorrecta: 'b', feedback: 'Art. 383 C.C.: Requiere autorización judicial para enajenar o hipotecar bienes raíces.' },
      { id: 11, dificultad: 'Media', tema: 'Nombre', enunciado: '¿Se puede cambiar el nombre propio en Venezuela por simple voluntad?', opciones: [{ id: 'a', texto: 'Sí, en el registro' }, { id: 'b', texto: 'No, salvo autorización judicial por causa justa' }, { id: 'c', texto: 'Cada 10 años' }, { id: 'd', texto: 'Sólo al casarse' }], respuestaCorrecta: 'b', feedback: 'El nombre es indisponible e inmutable, salvo procedimientos excepcionales previstos en la LOPNNA o C.C.' }
      ,
      { id: 12, dificultad: 'Media', tema: 'Capacidad', enunciado: 'La capacidad de ejercicio en Venezuela se adquiere normalmente a:', opciones: [{ id: 'a', texto: '16 anos' }, { id: 'b', texto: '18 anos' }, { id: 'c', texto: '21 anos' }, { id: 'd', texto: 'Depende del domicilio' }], respuestaCorrecta: 'b', feedback: 'La mayoria de edad se alcanza a los 18 anos, salvo restricciones legales.' },
      { id: 13, dificultad: 'Alta', tema: 'Nasciturus', enunciado: 'El concebido es protegido juridicamente para:', opciones: [{ id: 'a', texto: 'Efectos favorables como herencias' }, { id: 'b', texto: 'Ejercer plena capacidad' }, { id: 'c', texto: 'Contraer obligaciones' }, { id: 'd', texto: 'Demandar sin representante' }], respuestaCorrecta: 'a', feedback: 'El nasciturus se tiene como nacido para efectos que le sean favorables, pero la personalidad plena requiere nacimiento con vida.' },
      { id: 14, dificultad: 'Media', tema: 'Tutela', enunciado: 'La tutela exige que el tutor rinda cuentas:', opciones: [{ id: 'a', texto: 'Solo al finalizar la tutela' }, { id: 'b', texto: 'Anualmente ante el juez' }, { id: 'c', texto: 'Cada cinco anos' }, { id: 'd', texto: 'No rinde cuentas' }], respuestaCorrecta: 'b', feedback: 'El tutor debe rendir cuentas de forma anual ante el juez competente.' },
      { id: 15, dificultad: 'Alta', tema: 'Emancipacion', enunciado: 'Un menor emancipado desea vender un inmueble. Para hacerlo necesita:', opciones: [{ id: 'a', texto: 'Nada, puede hacerlo libremente' }, { id: 'b', texto: 'Autorizacion judicial' }, { id: 'c', texto: 'Solo permiso de un amigo' }, { id: 'd', texto: 'Registro simple' }], respuestaCorrecta: 'b', feedback: 'La emancipacion no elimina los limites para disponer de bienes inmuebles; requiere autorizacion judicial.' }
      ,
      { id: 16, dificultad: 'Media', tema: 'Domicilio', enunciado: 'El domicilio legal del menor no emancipado es:', opciones: [{ id: 'a', texto: 'El lugar de estudio' }, { id: 'b', texto: 'El de sus padres o representantes' }, { id: 'c', texto: 'Donde trabaja' }, { id: 'd', texto: 'Cualquiera que elija' }], respuestaCorrecta: 'b', feedback: 'El domicilio legal del menor es el de sus representantes legales.' },
      { id: 17, dificultad: 'Alta', tema: 'Ausencia', enunciado: 'Para declarar la ausencia presunta se requiere:', opciones: [{ id: 'a', texto: 'Un mes sin noticias' }, { id: 'b', texto: 'Dos anos sin noticias y sin apoderado' }, { id: 'c', texto: 'Seis meses sin domicilio' }, { id: 'd', texto: 'Cualquier lapso' }], respuestaCorrecta: 'b', feedback: 'El Codigo Civil exige dos anos sin noticias cuando no hay apoderado.' },
      { id: 18, dificultad: 'Media', tema: 'Tutela', enunciado: 'El tutor esta obligado a rendir cuentas:', opciones: [{ id: 'a', texto: 'Solo si hay queja' }, { id: 'b', texto: 'Anualmente ante el juez' }, { id: 'c', texto: 'Cada 5 anos' }, { id: 'd', texto: 'Nunca' }], respuestaCorrecta: 'b', feedback: 'La rendicion de cuentas es anual y bajo control judicial.' },
      { id: 19, dificultad: 'Alta', tema: 'Emancipacion', enunciado: 'La emancipacion permite al menor:', opciones: [{ id: 'a', texto: 'Ejercer todos los actos sin limites' }, { id: 'b', texto: 'Ejercer actos con limites legales' }, { id: 'c', texto: 'No ejercer ningun acto' }, { id: 'd', texto: 'Vender inmuebles sin autorizacion' }], respuestaCorrecta: 'b', feedback: 'La emancipacion otorga capacidad limitada con restricciones legales.' }
    ]
  },
  {
    id: 'constitucional',
    titulo: 'Constitucional: CRBV',
    descripcion: 'Estructura del Estado, Garantías Fundamentales y Supremacía.',
    icono: 'fa-landmark',
    color: 'bg-amber-600',
    progreso: 0,
    isPremium: false,
    modules: [
      {
        id: 'const-m1',
        titulo: 'Principios y soberania',
        tema: 'Estado y supremacia constitucional',
        lectura: 'La CRBV define a Venezuela como Estado federal descentralizado y consagra la soberania popular. La supremacia constitucional obliga a todos los poderes y se extiende a los tratados de derechos humanos con jerarquia constitucional. El control constitucional garantiza que ninguna norma inferior contradiga la Carta Magna.',
        caso: {
          titulo: 'Supremacia y control constitucional',
          descripcion: 'Una ley ordinaria limita un derecho con un estandar inferior al tratado ratificado.',
          documento: 'El juez debe decidir si aplica la ley interna o el tratado de derechos humanos con proteccion mas amplia.',
          pregunta: 'Que norma debe prevalecer en la decision judicial?',
          opciones: [
            { id: 'a', texto: 'La ley interna por ser posterior.', isCorrect: false, feedback: 'La posterioridad no supera la jerarquia constitucional del tratado.' },
            { id: 'b', texto: 'El tratado de derechos humanos con jerarquia constitucional.', isCorrect: true, feedback: 'La CRBV otorga jerarquia constitucional a estos tratados.' },
            { id: 'c', texto: 'La ley interna por ser aprobada por la Asamblea Nacional.', isCorrect: false, feedback: 'La ley no puede contrariar la Constitucion ni tratados con jerarquia constitucional.' },
            { id: 'd', texto: 'Ambas normas se aplican parcialmente.', isCorrect: false, feedback: 'Debe preferirse la norma constitucionalmente superior.' }
          ]
        },
        questionIds: [703, 704, 709, 711, 713, 714]
      },
      {
        id: 'const-m2',
        titulo: 'Poder Publico y control',
        tema: 'Organos y controles constitucionales',
        lectura: 'El Poder Publico se divide en ramas con controles mutuos. El control difuso puede ser ejercido por cualquier juez para inaplicar normas contrarias a la CRBV. El Poder Ciudadano y el Poder Electoral aseguran transparencia, moralidad administrativa y legitimidad democratica.',
        caso: {
          titulo: 'Control difuso en juicio',
          descripcion: 'Un juez de primera instancia observa una norma contraria a la CRBV en un caso concreto.',
          documento: 'La defensa alega que solo el TSJ puede decidir. La otra parte pide aplicar la Constitucion.',
          pregunta: 'Que puede hacer el juez en este caso?',
          opciones: [
            { id: 'a', texto: 'Aplicar la norma sin cuestionarla.', isCorrect: false, feedback: 'Los jueces deben asegurar la supremacia constitucional.' },
            { id: 'b', texto: 'Ejercer control difuso y dejar de aplicar la norma.', isCorrect: true, feedback: 'El control difuso corresponde a cualquier juez.' },
            { id: 'c', texto: 'Suspender el proceso hasta consulta al TSJ.', isCorrect: false, feedback: 'No es un requisito para el control difuso.' },
            { id: 'd', texto: 'Declarar la nulidad general de la norma.', isCorrect: false, feedback: 'La nulidad general corresponde a la Sala Constitucional.' }
          ]
        },
        questionIds: [701, 702, 705, 706, 707, 708, 710, 712, 715, 716]
      },
      {
        id: 'const-m3',
        titulo: 'Casos reales y control constitucional',
        tema: 'Accion de amparo y control concentrado',
        isPremium: true,
        lectura: 'El amparo constitucional protege derechos cuando no existe otra via eficaz. El control concentrado corresponde a la Sala Constitucional con efectos generales. El principio de supremacia exige que actos y normas se adecuen a la CRBV y a los tratados de derechos humanos con jerarquia constitucional.',
        caso: {
          titulo: 'Amparo por acceso a informacion publica',
          descripcion: 'Ciudadanos solicitan acceso a datos de gestion publica y reciben negativa sin motivacion.',
          documento: 'Se intenta un recurso administrativo sin respuesta. Se plantea accion de amparo alegando violacion del derecho de peticion y de acceso a informacion publica, con base en la CRBV y estandares internacionales.',
          pregunta: 'Cual es la via constitucional mas idonea para restablecer el derecho?',
          opciones: [
            { id: 'a', texto: 'Demanda civil ordinaria', isCorrect: false, feedback: 'No es la via mas rapida para proteger un derecho constitucional.' },
            { id: 'b', texto: 'Accion de amparo constitucional', isCorrect: true, feedback: 'El amparo es la via inmediata para proteger derechos constitucionales.' },
            { id: 'c', texto: 'Recurso jerarquico sin limites', isCorrect: false, feedback: 'Si no hay respuesta, procede tutela constitucional.' },
            { id: 'd', texto: 'Solo denuncia penal', isCorrect: false, feedback: 'La via penal no restituye de inmediato el derecho vulnerado.' }
          ]
        },
        questionIds: [717, 718, 719, 720]
      }
    ],
    preguntas: [
      { id: 701, dificultad: 'Media', tema: 'Poder Público', enunciado: 'El Consejo Moral Republicano es el órgano expresión de:', opciones: [{ id: 'a', texto: 'Poder Judicial.' }, { id: 'b', texto: 'Poder Ciudadano.' }, { id: 'c', texto: 'Poder Legislativo.' }, { id: 'd', texto: 'Poder Electoral.' }], respuestaCorrecta: 'b', feedback: 'Art. 273 CRBV: El Poder Ciudadano se ejerce por el Consejo Moral Republicano.' },
      { id: 702, dificultad: 'Alta', tema: 'Control', enunciado: '¿Quién ejerce el control difuso de la constitucionalidad?', opciones: [{ id: 'a', texto: 'Solo el TSJ.' }, { id: 'b', texto: 'Cualquier juez de la República.' }, { id: 'c', texto: 'La Asamblea Nacional.' }, { id: 'd', texto: 'La Fiscalía General.' }], respuestaCorrecta: 'b', feedback: 'Art. 334 CRBV: Todos los jueces están obligados a asegurar la integridad de la Constitución.' },
      { id: 703, dificultad: 'Media', tema: 'Territorio', enunciado: 'Venezuela es un Estado Federal:', opciones: [{ id: 'a', texto: 'Centralizado' }, { id: 'b', texto: 'Descentralizado en los términos de la CRBV' }, { id: 'c', texto: 'Unitario puro' }, { id: 'd', texto: 'Monárquico' }], respuestaCorrecta: 'b', feedback: 'Art. 4 CRBV: La República es un Estado federal descentralizado.' },
      { id: 704, dificultad: 'Alta', tema: 'Derechos', enunciado: 'Los tratados internacionales de derechos humanos tienen rango:', opciones: [{ id: 'a', texto: 'Legal' }, { id: 'b', texto: 'Constitucional' }, { id: 'c', texto: 'Sub-legal' }, { id: 'd', texto: 'No tienen validez' }], respuestaCorrecta: 'b', feedback: 'Art. 23 CRBV: Tienen jerarquía constitucional y prevalecen sobre el orden interno.' },
      { id: 705, dificultad: 'Media', tema: 'Asamblea', enunciado: 'El quórum mínimo para sesionar en la Asamblea Nacional es:', opciones: [{ id: 'a', texto: 'La totalidad' }, { id: 'b', texto: 'La mayoría absoluta de sus integrantes' }, { id: 'c', texto: 'Un tercio' }, { id: 'd', texto: '25 diputados' }], respuestaCorrecta: 'b', feedback: 'Art. 221 CRBV: Se requiere la mayoría absoluta de los y las integrantes.' },
      { id: 706, dificultad: 'Alta', tema: 'Estado de Excepción', enunciado: '¿Qué derecho NO puede ser restringido durante un Estado de Excepción?', opciones: [{ id: 'a', texto: 'Libre tránsito' }, { id: 'b', texto: 'Derecho a la vida y debido proceso' }, { id: 'c', texto: 'Reunión' }, { id: 'd', texto: 'Información' }], respuestaCorrecta: 'b', feedback: 'Art. 337 CRBV: No pueden restringirse las garantías de vida, debido proceso e integridad física.' },
      { id: 707, dificultad: 'Media', tema: 'Electoral', enunciado: 'El Poder Electoral se ejerce por:', opciones: [{ id: 'a', texto: 'La Asamblea' }, { id: 'b', texto: 'El Consejo Nacional Electoral' }, { id: 'c', texto: 'Los partidos' }, { id: 'd', texto: 'El TSJ' }], respuestaCorrecta: 'b', feedback: 'Art. 292 CRBV: El CNE es el ente rector del Poder Electoral.' },
      { id: 708, dificultad: 'Alta', tema: 'Hacienda', enunciado: 'La creación de impuestos nacionales es competencia de:', opciones: [{ id: 'a', texto: 'Los Alcaldes' }, { id: 'b', texto: 'El Poder Público Nacional' }, { id: 'c', texto: 'Los Gobernadores' }, { id: 'd', texto: 'Las Juntas Comunales' }], respuestaCorrecta: 'b', feedback: 'Art. 156 CRBV: Es competencia del Poder Público Nacional la creación de tributos.' },
      { id: 709, dificultad: 'Media', tema: 'Soberanía', enunciado: 'La soberanía reside intransferiblemente en:', opciones: [{ id: 'a', texto: 'El Presidente' }, { id: 'b', texto: 'El Pueblo' }, { id: 'c', texto: 'El Ejército' }, { id: 'd', texto: 'Los Partidos' }], respuestaCorrecta: 'b', feedback: 'Art. 5 CRBV: La soberanía reside intransferiblemente en el pueblo.' },
      { id: 710, dificultad: 'Alta', tema: 'Municipios', enunciado: 'La unidad política primaria de la organización nacional es:', opciones: [{ id: 'a', texto: 'El Estado' }, { id: 'b', texto: 'El Municipio' }, { id: 'c', texto: 'La Parroquia' }, { id: 'd', texto: 'El Barrio' }], respuestaCorrecta: 'b', feedback: 'Art. 168 CRBV: Los Municipios constituyen la unidad política primaria.' },
      { id: 711, dificultad: 'Media', tema: 'Supremacia', enunciado: 'La supremacia constitucional implica que:', opciones: [{ id: 'a', texto: 'La ley ordinaria puede contradecir la Constitucion.' }, { id: 'b', texto: 'Toda norma inferior debe ajustarse a la CRBV.' }, { id: 'c', texto: 'Los tratados no tienen valor interno.' }, { id: 'd', texto: 'El Ejecutivo decide sin control.' }], respuestaCorrecta: 'b', feedback: 'La CRBV es la norma suprema y las normas inferiores deben ajustarse a ella.' },
      { id: 712, dificultad: 'Alta', tema: 'Control', enunciado: 'El control difuso se caracteriza por:', opciones: [{ id: 'a', texto: 'Ser exclusivo de la Sala Constitucional.' }, { id: 'b', texto: 'Aplicarse por cualquier juez en casos concretos.' }, { id: 'c', texto: 'Anular normas con efecto general.' }, { id: 'd', texto: 'No poder ejercerse nunca.' }], respuestaCorrecta: 'b', feedback: 'El control difuso es incidental y lo ejerce cualquier juez en el caso concreto.' }
      ,
      { id: 713, dificultad: 'Media', tema: 'Ciudadania', enunciado: 'La ciudadania se ejerce plenamente a partir de:', opciones: [{ id: 'a', texto: '16 anos' }, { id: 'b', texto: '18 anos' }, { id: 'c', texto: '21 anos' }, { id: 'd', texto: 'Depende del municipio' }], respuestaCorrecta: 'b', feedback: 'La ciudadania se ejerce a partir de los 18 anos, conforme a la CRBV.' },
      { id: 714, dificultad: 'Alta', tema: 'Derechos', enunciado: 'El principio de progresividad de los derechos humanos implica:', opciones: [{ id: 'a', texto: 'Retroceder en proteccion cuando convenga' }, { id: 'b', texto: 'No retroceder en niveles de proteccion alcanzados' }, { id: 'c', texto: 'Suspender derechos sin control' }, { id: 'd', texto: 'Aplicar derechos solo si hay presupuesto' }], respuestaCorrecta: 'b', feedback: 'Una vez alcanzado un nivel de proteccion, el Estado no debe retroceder.' },
      { id: 715, dificultad: 'Media', tema: 'Poder Ciudadano', enunciado: 'El Poder Ciudadano esta integrado por:', opciones: [{ id: 'a', texto: 'Fiscalia, Defensoria y Contraloria' }, { id: 'b', texto: 'TSJ, CNE y Asamblea' }, { id: 'c', texto: 'Gobernaciones y alcaldias' }, { id: 'd', texto: 'Ministerios del Ejecutivo' }], respuestaCorrecta: 'a', feedback: 'El Poder Ciudadano lo integran el Ministerio Publico, Defensoria y Contraloria.' },
      { id: 716, dificultad: 'Alta', tema: 'Control', enunciado: 'El control concentrado de constitucionalidad corresponde a:', opciones: [{ id: 'a', texto: 'Cualquier juez' }, { id: 'b', texto: 'La Sala Constitucional del TSJ' }, { id: 'c', texto: 'El Poder Electoral' }, { id: 'd', texto: 'La Defensoria del Pueblo' }], respuestaCorrecta: 'b', feedback: 'La Sala Constitucional ejerce el control concentrado con efectos generales.' }
      ,
      { id: 717, dificultad: 'Media', tema: 'Amparo', enunciado: 'El amparo constitucional procede cuando:', opciones: [{ id: 'a', texto: 'Existe una via ordinaria igual de eficaz' }, { id: 'b', texto: 'No hay via judicial idonea y se requiere proteccion inmediata' }, { id: 'c', texto: 'Solo en materia penal' }, { id: 'd', texto: 'Solo contra particulares' }], respuestaCorrecta: 'b', feedback: 'El amparo es subsidiario y protege derechos de forma inmediata cuando no hay otra via eficaz (CRBV Art. 26).' },
      { id: 718, dificultad: 'Alta', tema: 'Derechos', enunciado: 'El derecho de acceso a informacion publica se vincula directamente con:', opciones: [{ id: 'a', texto: 'La seguridad nacional exclusivamente' }, { id: 'b', texto: 'La transparencia y el control ciudadano' }, { id: 'c', texto: 'La reserva total de datos' }, { id: 'd', texto: 'La censura previa' }], respuestaCorrecta: 'b', feedback: 'La transparencia fortalece la democracia y el control ciudadano (CRBV Art. 141 y 143).' },
      { id: 719, dificultad: 'Media', tema: 'Supremacia', enunciado: 'Si una resolucion administrativa contradice la CRBV, corresponde:', opciones: [{ id: 'a', texto: 'Aplicarla por ser acto del Ejecutivo' }, { id: 'b', texto: 'Inaplicarla por supremacia constitucional' }, { id: 'c', texto: 'Esperar autorizacion politica' }, { id: 'd', texto: 'Ignorar el conflicto' }], respuestaCorrecta: 'b', feedback: 'La supremacia constitucional obliga a inaplicar actos contrarios (CRBV Art. 7).' },
      { id: 720, dificultad: 'Alta', tema: 'Control', enunciado: 'El control concentrado se caracteriza por:', opciones: [{ id: 'a', texto: 'Efectos solo para el caso concreto' }, { id: 'b', texto: 'Efectos generales y anulacion de normas' }, { id: 'c', texto: 'No tener efectos juridicos' }, { id: 'd', texto: 'Solo recomendaciones' }], respuestaCorrecta: 'b', feedback: 'El control concentrado produce efectos generales y puede anular normas (CRBV Art. 336).' }
    ]
  },
  {
    id: 'lottt',
    titulo: 'Laboral: LOTTT Vigente',
    descripcion: 'Análisis profundo de la LOTTT 2012, estabilidad, prestaciones y jornadas.',
    icono: 'fa-briefcase',
    color: 'bg-emerald-600',
    progreso: 0,
    isPremium: true,
    price: 4,
    modules: [
      {
        id: 'lottt-m1',
        titulo: 'Estabilidad y prestaciones',
        tema: 'Estabilidad, indemnizacion y retroactividad',
        lectura: 'La LOTTT protege la estabilidad y establece el calculo de prestaciones sociales con criterio de retroactividad. El despido injustificado genera indemnizacion equivalente a las prestaciones. La irrenunciabilidad de derechos impide acuerdos que reduzcan beneficios legales.',
        caso: {
          titulo: 'Despido sin causa',
          descripcion: 'Un trabajador con 3 anos de servicio es despedido sin causa.',
          documento: 'La empresa ofrece solo el pago de vacaciones pendientes. El trabajador exige prestaciones e indemnizacion.',
          pregunta: 'Que derecho adicional tiene el trabajador segun la LOTTT?',
          opciones: [
            { id: 'a', texto: 'Solo vacaciones y utilidades.', isCorrect: false, feedback: 'El despido injustificado genera indemnizacion.' },
            { id: 'b', texto: 'Indemnizacion equivalente a las prestaciones sociales.', isCorrect: true, feedback: 'Art. 92 LOTTT: indemnizacion equivalente a las prestaciones.' },
            { id: 'c', texto: 'Un bono discrecional del patrono.', isCorrect: false, feedback: 'No depende de la discrecionalidad.' },
            { id: 'd', texto: 'No tiene derecho si firmo finiquito.', isCorrect: false, feedback: 'El finiquito no puede renunciar derechos irrenunciables.' }
          ]
        },
        questionIds: [501, 503, 504, 505, 512]
      },
      {
        id: 'lottt-m2',
        titulo: 'Jornadas y beneficios',
        tema: 'Jornada, vacaciones y utilidades',
        lectura: 'La jornada nocturna va de 7:00 PM a 5:00 AM. Las vacaciones aumentan con la antiguedad y las utilidades tienen un minimo legal. Las horas extras tienen limites anuales y deben ser autorizadas conforme a la ley.',
        caso: {
          titulo: 'Horas extras continuas',
          descripcion: 'Una empresa exige 150 horas extras al ano.',
          documento: 'El trabajador denuncia que excede el limite legal.',
          pregunta: 'Cual es el limite maximo anual de horas extras?',
          opciones: [
            { id: 'a', texto: '50 horas.', isCorrect: false, feedback: 'El limite es mayor.' },
            { id: 'b', texto: '100 horas.', isCorrect: true, feedback: 'Art. 178 LOTTT: maximo 100 horas extraordinarias por ano.' },
            { id: 'c', texto: '150 horas.', isCorrect: false, feedback: 'Supera el limite legal.' },
            { id: 'd', texto: 'No hay limite.', isCorrect: false, feedback: 'La LOTTT si fija limite.' }
          ]
        },
        questionIds: [502, 506, 507, 508, 509, 510, 511, 513]
      }
    ],
    preguntas: [
      { id: 501, dificultad: 'Alta', tema: 'Indemnización', enunciado: 'Un trabajador con 5 años de servicio es despedido injustificadamente. Además de sus prestaciones, tiene derecho a:', opciones: [{ id: 'a', texto: 'Un bono de 30 días.' }, { id: 'b', texto: 'Pago doble de la garantía de prestaciones (Art. 92).' }, { id: 'c', texto: 'Solo el preaviso.' }, { id: 'd', texto: 'Un cargo mayor.' }], respuestaCorrecta: 'b', feedback: 'Art. 92 LOTTT: El despido injustificado genera el pago de una indemnización equivalente al monto de las prestaciones sociales.' },
      { id: 502, dificultad: 'Media', tema: 'Jornada', enunciado: 'Un trabajador cumple horario de 7:00 PM a 2:00 AM. Su jornada se califica como:', opciones: [{ id: 'a', texto: 'Diurna.' }, { id: 'b', texto: 'Nocturna.' }, { id: 'c', texto: 'Mixta.' }, { id: 'd', texto: 'Extraordinaria.' }], respuestaCorrecta: 'b', feedback: 'Art. 173 LOTTT: Se considera jornada nocturna la cumplida entre las 7:00 PM y las 5:00 AM.' },
      { id: 503, dificultad: 'Alta', tema: 'Retroactividad', enunciado: 'Al finalizar la relación laboral, el cálculo de las prestaciones sociales se realiza comparando:', opciones: [{ id: 'a', texto: 'Salario base vs Salario integral.' }, { id: 'b', texto: 'Garantía acumulada vs Cálculo de 30 días por año al último salario.' }, { id: 'c', texto: 'Bono vacacional vs Utilidades.' }, { id: 'd', texto: 'Solo el tiempo de servicio.' }], respuestaCorrecta: 'b', feedback: 'Art. 142 LOTTT: El patrono paga lo que sea superior entre el acumulado trimestral y el cálculo de 30 días por año.' },
      { id: 504, dificultad: 'Alta', tema: 'Inamovilidad', enunciado: '¿Quién goza de inamovilidad laboral por paternidad?', opciones: [{ id: 'a', texto: 'Hasta los 6 meses del hijo.' }, { id: 'b', texto: 'Hasta los 2 años del hijo.' }, { id: 'c', texto: 'Solo durante el embarazo.' }, { id: 'd', texto: 'No existe tal beneficio.' }], respuestaCorrecta: 'b', feedback: 'Art. 418 LOTTT: Los padres gozan de inamovilidad por dos años desde el nacimiento.' },
      { id: 505, dificultad: 'Media', tema: 'Despido Indirecto', enunciado: 'Se considera despido indirecto cuando:', opciones: [{ id: 'a', texto: 'El trabajador falta 3 días.' }, { id: 'b', texto: 'El patrono reduce el salario sin causa legal.' }, { id: 'c', texto: 'La empresa cierra por quiebra.' }, { id: 'd', texto: 'Se termina el contrato temporal.' }], respuestaCorrecta: 'b', feedback: 'Art. 80 LOTTT: Cualquier desmejoramiento en las condiciones de trabajo se considera despido indirecto.' },
      { id: 506, dificultad: 'Alta', tema: 'Vacaciones', enunciado: '¿Cuántos días de vacaciones corresponden a un trabajador con 3 años de servicio?', opciones: [{ id: 'a', texto: '15 días.' }, { id: 'b', texto: '18 días.' }, { id: 'c', texto: '17 días.' }, { id: 'd', texto: '20 días.' }], respuestaCorrecta: 'c', feedback: 'Art. 190 LOTTT: 15 días base + 1 día adicional por cada año (15+2=17).' },
      { id: 507, dificultad: 'Media', tema: 'Utilidades', enunciado: '¿Cuál es el límite mínimo de participación en los beneficios (utilidades)?', opciones: [{ id: 'a', texto: '15 días' }, { id: 'b', texto: '30 días' }, { id: 'c', texto: '60 días' }, { id: 'd', texto: '90 días' }], respuestaCorrecta: 'a', feedback: 'Art. 131 LOTTT: El límite mínimo es de 15 días de salario.' },
      { id: 508, dificultad: 'Alta', tema: 'Sindicatos', enunciado: 'Para formar un sindicato de empresa se requiere un mínimo de:', opciones: [{ id: 'a', texto: '10 trabajadores' }, { id: 'b', texto: '20 trabajadores' }, { id: 'c', texto: '40 trabajadores' }, { id: 'd', texto: '100 trabajadores' }], respuestaCorrecta: 'b', feedback: 'Art. 367 LOTTT: Se requieren 20 o más trabajadores o trabajadoras para un sindicato de empresa.' },
      { id: 509, dificultad: 'Media', tema: 'Menores', enunciado: 'La edad mínima para trabajar en Venezuela es de:', opciones: [{ id: 'a', texto: '12 años' }, { id: 'b', texto: '14 años' }, { id: 'c', texto: '16 años' }, { id: 'd', texto: '18 años' }], respuestaCorrecta: 'b', feedback: 'Art. 32 LOTTT: Se prohíbe el trabajo de niños, niñas y adolescentes que no hayan cumplido 14 años.' },
      { id: 510, dificultad: 'Alta', tema: 'Horas Extra', enunciado: 'El límite máximo de horas extras por año es de:', opciones: [{ id: 'a', texto: '50 horas' }, { id: 'b', texto: '100 horas' }, { id: 'c', texto: '150 horas' }, { id: 'd', texto: 'Sin límite' }], respuestaCorrecta: 'b', feedback: 'Art. 178 LOTTT: No se podrá trabajar más de 100 horas extraordinarias por año.' },
      { id: 511, dificultad: 'Media', tema: 'Lactancia', enunciado: 'Los descansos de lactancia son de:', opciones: [{ id: 'a', texto: '15 min c/u' }, { id: 'b', texto: '30 min c/u' }, { id: 'c', texto: '1 hora c/u' }, { id: 'd', texto: 'No existen' }], respuestaCorrecta: 'b', feedback: 'Art. 345 LOTTT: Dos descansos diarios de media hora cada uno para amamantar.' }
      ,
      { id: 512, dificultad: 'Alta', tema: 'Irrenunciabilidad', enunciado: 'Un trabajador firma un acuerdo renunciando a prestaciones sociales. Ese acuerdo es:', opciones: [{ id: 'a', texto: 'Valido si hay firma notariada' }, { id: 'b', texto: 'Nulo por irrenunciabilidad de derechos' }, { id: 'c', texto: 'Valido si el patrono lo acepta' }, { id: 'd', texto: 'Valido si reduce el salario' }], respuestaCorrecta: 'b', feedback: 'Los derechos laborales son irrenunciables; acuerdos en contrario son nulos.' },
      { id: 513, dificultad: 'Media', tema: 'Jornada', enunciado: 'La jornada nocturna se considera entre:', opciones: [{ id: 'a', texto: '6:00 PM y 4:00 AM' }, { id: 'b', texto: '7:00 PM y 5:00 AM' }, { id: 'c', texto: '8:00 PM y 6:00 AM' }, { id: 'd', texto: '5:00 PM y 3:00 AM' }], respuestaCorrecta: 'b', feedback: 'La LOTTT considera jornada nocturna entre 7:00 PM y 5:00 AM.' }
    ]
  },
  {
    id: 'mercantil',
    titulo: 'Derecho Mercantil: Sociedades',
    descripcion: 'Constitución de Compañías Anónimas, Asambleas y obligaciones de los administradores según el Código de Comercio.',
    icono: 'fa-building',
    color: 'bg-purple-600',
    progreso: 0,
    isPremium: true,
    price: 5,
    modules: [
      {
        id: 'merc-m1',
        titulo: 'Constitucion y capital',
        tema: 'Formacion de sociedades',
        lectura: 'La compania anonima requiere suscripcion total del capital y pago minimo del 20% en numerario. La reserva legal se forma con al menos 5% de utilidades y la responsabilidad de socios es limitada al monto de sus acciones.',
        caso: {
          titulo: 'Capital no pagado',
          descripcion: 'Se constituye una compania anonima con capital suscrito pero sin pago inicial.',
          documento: 'Los socios alegan que el pago puede diferirse para despues de la inscripcion.',
          pregunta: 'Que exige el Codigo de Comercio para la constitucion definitiva?',
          opciones: [
            { id: 'a', texto: 'Suscribir 50% y pagar 50%.', isCorrect: false, feedback: 'La regla es suscripcion total y pago minimo del 20%.' },
            { id: 'b', texto: 'Suscribir 100% y pagar al menos 20%.', isCorrect: true, feedback: 'Art. 249 C.Com: suscripcion total y pago minimo del 20%.' },
            { id: 'c', texto: 'No es necesario pagar antes de operar.', isCorrect: false, feedback: 'Debe existir aporte minimo para constitucion.' },
            { id: 'd', texto: 'Solo pagar cuando haya ganancias.', isCorrect: false, feedback: 'El aporte inicial es requisito legal.' }
          ]
        },
        questionIds: [601, 603, 604]
      },
      {
        id: 'merc-m2',
        titulo: 'Asambleas y administracion',
        tema: 'Gobierno corporativo',
        lectura: 'La asamblea ordinaria se reune al menos una vez al ano. Los administradores no votan en la aprobacion de su gestion y los comisarios ejercen inspeccion y vigilancia. Las acciones son indivisibles y requieren representante comun si hay copropiedad.',
        caso: {
          titulo: 'Administrador vota su gestion',
          descripcion: 'En asamblea ordinaria, el administrador vota para aprobar su propio balance.',
          documento: 'Un accionista impugna la decision por conflicto de intereses.',
          pregunta: 'Cual es la regla aplicable?',
          opciones: [
            { id: 'a', texto: 'Puede votar si es accionista mayoritario.', isCorrect: false, feedback: 'La ley prohhibe votar en ese punto.' },
            { id: 'b', texto: 'No puede votar en la aprobacion de su gestion.', isCorrect: true, feedback: 'Art. 285 C.Com: administradores no votan sobre balance y cuentas.' },
            { id: 'c', texto: 'Solo vota si el comisario lo autoriza.', isCorrect: false, feedback: 'No hay excepcion por autorizacion.' },
            { id: 'd', texto: 'La votacion es valida siempre.', isCorrect: false, feedback: 'El voto esta limitado por la ley.' }
          ]
        },
        questionIds: [602, 605, 606, 607, 608, 609, 610]
      }
    ],
    preguntas: [
      { id: 601, dificultad: 'Media', tema: 'Constitución', enunciado: 'En la constitución de una compañía anónima, ¿cuál es el requisito indispensable respecto al capital social en numerario para su constitución definitiva?', opciones: [{ id: 'a', texto: 'Pagar el 100%.' }, { id: 'b', texto: 'Suscribir el 100% y pagar al menos el 20%.' }, { id: 'c', texto: 'Suscribir el 50%.' }, { id: 'd', texto: 'Pagar el 50%.' }], respuestaCorrecta: 'b', feedback: 'Art. 249 C.Com: Para la constitución definitiva se requiere que esté suscrita la totalidad del capital social y entregada en caja por cada accionista la quinta parte (20%) por lo menos.' },
      { id: 602, dificultad: 'Fácil', tema: 'Asamblea Ordinaria', enunciado: '¿Cuándo debe reunirse obligatoriamente la Asamblea Ordinaria de accionistas?', opciones: [{ id: 'a', texto: 'Cada 6 meses.' }, { id: 'b', texto: 'Una vez al año, en la época fijada por los estatutos.' }, { id: 'c', texto: 'Cuando el administrador quiera.' }, { id: 'd', texto: 'Cada 2 años.' }], respuestaCorrecta: 'b', feedback: 'Art. 274 C.Com: La asamblea ordinaria se reunirá una vez al año, por lo menos, en la época fijada por los estatutos.' },
      { id: 603, dificultad: 'Media', tema: 'Reserva Legal', enunciado: 'De los beneficios líquidos de la compañía, ¿qué porcentaje debe apartarse anualmente para el fondo de reserva?', opciones: [{ id: 'a', texto: '10%.' }, { id: 'b', texto: '2%.' }, { id: 'c', texto: '5%.' }, { id: 'd', texto: 'No es obligatorio.' }], respuestaCorrecta: 'c', feedback: 'Art. 262 C.Com: Anualmente se separará de los beneficios líquidos una cuota de cinco por ciento (5%) por lo menos, para formar el fondo de reserva.' },
      { id: 604, dificultad: 'Media', tema: 'Responsabilidad', enunciado: 'En una Compañía Anónima, ¿hasta dónde alcanza la responsabilidad de los socios por las deudas sociales?', opciones: [{ id: 'a', texto: 'Ilimitada y solidaria.' }, { id: 'b', texto: 'Hasta el monto de sus acciones.' }, { id: 'c', texto: 'Hasta el patrimonio personal.' }, { id: 'd', texto: 'No responden.' }], respuestaCorrecta: 'b', feedback: 'Art. 201 C.Com: En la compañía anónima, las obligaciones sociales están garantizadas por un capital determinado y los socios no están obligados sino por el monto de su acción.' },
      { id: 605, dificultad: 'Alta', tema: 'Administradores', enunciado: 'En la asamblea que delibera sobre la aprobación del balance y las cuentas de gestión, los administradores:', opciones: [{ id: 'a', texto: 'Tienen voto de calidad.' }, { id: 'b', texto: 'No pueden votar.' }, { id: 'c', texto: 'Votan si son accionistas mayoritarios.' }, { id: 'd', texto: 'Votan con permiso del Comisario.' }], respuestaCorrecta: 'b', feedback: 'Art. 285 C.Com: Los administradores no pueden votar en las deliberaciones sobre la aprobación del balance y de las cuentas de su gestión. ' },
      { id: 606, dificultad: 'Alta', tema: 'Asamblea Extraordinaria', enunciado: 'Si los estatutos no disponen otra cosa, ¿qué quórum se requiere en Asamblea Extraordinaria para la modificación de los estatutos?', opciones: [{ id: 'a', texto: '50% del capital.' }, { id: 'b', texto: 'Tres cuartas partes (75%) del capital social.' }, { id: 'c', texto: 'Unanimidad.' }, { id: 'd', texto: '20% del capital.' }], respuestaCorrecta: 'b', feedback: 'Art. 280 C.Com: Para modificaciones estatutarias se requiere la representación de las tres cuartas partes del capital social, salvo disposición estatutaria.' },
      { id: 607, dificultad: 'Media', tema: 'Comisarios', enunciado: '¿Cuál es la función principal de los comisarios según el Código de Comercio?', opciones: [{ id: 'a', texto: 'Dirigir la empresa.' }, { id: 'b', texto: 'Representar judicialmente a la sociedad.' }, { id: 'c', texto: 'La inspección y vigilancia de la gestión de los administradores.' }, { id: 'd', texto: 'Repartir dividendos.' }], respuestaCorrecta: 'c', feedback: 'Art. 309 C.Com: Los comisarios tienen un derecho ilimitado de inspección y vigilancia sobre todas las operaciones de la sociedad.' },
      { id: 608, dificultad: 'Media', tema: 'Convocatoria', enunciado: 'A falta de disposición en los estatutos, ¿con cuánta anticipación debe publicarse la convocatoria a asamblea en la prensa?', opciones: [{ id: 'a', texto: '24 horas.' }, { id: 'b', texto: '15 días.' }, { id: 'c', texto: '5 días.' }, { id: 'd', texto: '30 días.' }], respuestaCorrecta: 'c', feedback: 'Art. 277 C.Com: La convocatoria se hará por la prensa, en periódicos de la localidad, con cinco días de anticipación por lo menos.' },
      { id: 609, dificultad: 'Alta', tema: 'Acciones', enunciado: 'Si una acción pertenece a varias personas (copropiedad), ¿cómo ejercen sus derechos ante la sociedad?', opciones: [{ id: 'a', texto: 'Cada uno vota por su parte.' }, { id: 'b', texto: 'Deben nombrar un representante común.' }, { id: 'c', texto: 'La acción se anula.' }, { id: 'd', texto: 'Vota el mayoritario.' }], respuestaCorrecta: 'b', feedback: 'Art. 293 C.Com: Las acciones son indivisibles. Si una acción pertenece a varias personas, éstas deben nombrar un representante único para ejercer los derechos.' },
      { id: 610, dificultad: 'Alta', tema: 'Solidaridad', enunciado: 'Los administradores son responsables solidariamente para con los accionistas y terceros por:', opciones: [{ id: 'a', texto: 'Las pérdidas del negocio.' }, { id: 'b', texto: 'La existencia real de los dividendos pagados.' }, { id: 'c', texto: 'Las deudas personales de los socios.' }, { id: 'd', texto: 'El aumento del dólar.' }], respuestaCorrecta: 'b', feedback: 'Art. 244 C.Com: Los administradores son responsables solidariamente de la realidad de las entregas hechas por los accionistas y de la existencia de los dividendos pagados.' }
    ]
  },
  {
    id: 'penal-1',
    titulo: 'Derecho Penal I: Teoría del Delito',
    descripcion: 'Elementos del delito, formas de aparición y responsabilidad penal según el Código Penal.',
    icono: 'fa-gavel',
    color: 'bg-red-600',
    progreso: 0,
    isPremium: true,
    price: 5,
    modules: [
      {
        id: 'penal-m1',
        titulo: 'Principios y elementos',
        tema: 'Legalidad, imputacion y defensa',
        lectura: 'El principio de legalidad impide sancionar sin ley previa. La imputacion subjetiva es regla general con dolo, salvo excepciones por culpa. La legitima defensa exige agresion ilegitima, necesidad del medio y falta de provocacion suficiente.',
        caso: {
          titulo: 'Reaccion excesiva',
          descripcion: 'Una persona responde con fuerza letal ante una agresion leve.',
          documento: 'El agresor solo empujo al imputado, quien utilizo un arma de fuego.',
          pregunta: 'Que elemento de la legitima defensa falta para justificar el hecho?',
          opciones: [
            { id: 'a', texto: 'Agresion ilegitima.', isCorrect: false, feedback: 'Hubo agresion, aunque leve.' },
            { id: 'b', texto: 'Necesidad del medio empleado.', isCorrect: true, feedback: 'La respuesta debe ser proporcional y necesaria.' },
            { id: 'c', texto: 'Que sea de noche.', isCorrect: false, feedback: 'No es requisito legal.' },
            { id: 'd', texto: 'Que exista denuncia previa.', isCorrect: false, feedback: 'No es requisito.' }
          ]
        },
        questionIds: [901, 902, 903, 904]
      },
      {
        id: 'penal-m2',
        titulo: 'Formas de aparicion',
        tema: 'Tentativa, frustracion y participacion',
        lectura: 'La tentativa ocurre cuando se inicia la ejecucion y no se consuma por causas ajenas. El delito frustrado se da cuando se realiza todo lo necesario pero el resultado no ocurre. La participacion distingue autores, cooperadores e instigadores.',
        caso: {
          titulo: 'Disparo fallido',
          descripcion: 'El agente dispara con intencion de matar, pero falla por un desperfecto del arma.',
          documento: 'La defensa alega que no hay delito consumado.',
          pregunta: 'Que forma de aparicion del delito corresponde?',
          opciones: [
            { id: 'a', texto: 'Tentativa.', isCorrect: true, feedback: 'Inicio de ejecucion sin consumacion por causa ajena.' },
            { id: 'b', texto: 'Delito frustrado.', isCorrect: false, feedback: 'El frustrado exige haber hecho todo lo necesario para consumar.' },
            { id: 'c', texto: 'Actos preparatorios.', isCorrect: false, feedback: 'Ya hubo inicio de ejecucion.' },
            { id: 'd', texto: 'Desistimiento voluntario.', isCorrect: false, feedback: 'No hay desistimiento.' }
          ]
        },
        questionIds: [905, 906, 907, 908, 909, 910]
      }
    ],
    preguntas: [
      { id: 901, dificultad: 'Fácil', tema: 'Principio de Legalidad', enunciado: 'Según el Art. 1 del Código Penal, ¿cuál es el principio fundamental para imponer una pena?', opciones: [{ id: 'a', texto: 'La gravedad del hecho.' }, { id: 'b', texto: 'La peligrosidad del sujeto.' }, { id: 'c', texto: 'Nullum crimen, nulla poena sine lege (Previa previsión legal).' }, { id: 'd', texto: 'La alarma social.' }], respuestaCorrecta: 'c', feedback: 'Art. 1 C.P.: Nadie podrá ser castigado por un hecho que no estuviere expresamente previsto como punible por la ley.' },
      { id: 902, dificultad: 'Media', tema: 'Elemento Subjetivo', enunciado: '¿Cuál es la regla general de imputación subjetiva en el Código Penal venezolano?', opciones: [{ id: 'a', texto: 'La responsabilidad objetiva.' }, { id: 'b', texto: 'La culpa (negligencia).' }, { id: 'c', texto: 'La intención (Dolo).' }, { id: 'd', texto: 'El azar.' }], respuestaCorrecta: 'c', feedback: 'Art. 61 C.P.: Nadie puede ser castigado como reo de delito no habiendo tenido la intención de realizar el hecho, salvo las excepciones legales (culpa).' },
      { id: 903, dificultad: 'Alta', tema: 'Inimputabilidad', enunciado: 'Un sujeto comete un delito bajo un estado de enfermedad mental que lo priva totalmente de la conciencia. ¿Es punible?', opciones: [{ id: 'a', texto: 'Sí, con pena atenuada.' }, { id: 'b', texto: 'No es punible.' }, { id: 'c', texto: 'Sí, pero va a un psiquiátrico.' }, { id: 'd', texto: 'Depende del delito.' }], respuestaCorrecta: 'b', feedback: 'Art. 62 C.P.: No es punible el que ejecuta la acción hallándose dormido o en estado de enfermedad mental suficiente para privarlo de la conciencia.' },
      { id: 904, dificultad: 'Media', tema: 'Legítima Defensa', enunciado: 'Para que proceda la legítima defensa, se requiere agresión ilegítima, necesidad del medio empleado y:', opciones: [{ id: 'a', texto: 'Miedo insuperable.' }, { id: 'b', texto: 'Falta de provocación suficiente.' }, { id: 'c', texto: 'Que el agresor sea un extraño.' }, { id: 'd', texto: 'Que sea de noche.' }], respuestaCorrecta: 'b', feedback: 'Art. 65 Ord. 3 C.P.: Requiere falta de provocación suficiente de parte del que pretende haber obrado en defensa propia.' },
      { id: 905, dificultad: 'Alta', tema: 'Tentativa', enunciado: 'Si el agente comienza la ejecución del delito con medios apropiados pero no lo consuma por causas ajenas a su voluntad, se configura:', opciones: [{ id: 'a', texto: 'Delito Frustrado.' }, { id: 'b', texto: 'Tentativa.' }, { id: 'c', texto: 'Actos preparatorios.' }, { id: 'd', texto: 'Desistimiento voluntario.' }], respuestaCorrecta: 'b', feedback: 'Art. 80 C.P.: Hay tentativa cuando se comienza la ejecución y no se consuma por causas independientes de la voluntad.' },
      { id: 906, dificultad: 'Alta', tema: 'Delito Frustrado', enunciado: 'Cuando el agente ha realizado TODO lo necesario para consumar el delito, pero este no se produce por causas ajenas a su voluntad:', opciones: [{ id: 'a', texto: 'Es Tentativa.' }, { id: 'b', texto: 'Es Delito Frustrado.' }, { id: 'c', texto: 'Es Delito Imposible.' }, { id: 'd', texto: 'No es punible.' }], respuestaCorrecta: 'b', feedback: 'Art. 80 C.P.: Hay delito frustrado cuando alguien ha realizado todo lo necesario para consumarlo y no lo ha logrado por circunstancias independientes.' },
      { id: 907, dificultad: 'Media', tema: 'Participación', enunciado: 'Quienes cooperan en la ejecución del hecho de tal manera que sin su ayuda no se habría cometido, responden como:', opciones: [{ id: 'a', texto: 'Cómplices no necesarios.' }, { id: 'b', texto: 'Encubridores.' }, { id: 'c', texto: 'Cooperadores inmediatos (Autores).' }, { id: 'd', texto: 'Instigadores.' }], respuestaCorrecta: 'c', feedback: 'Art. 84 C.P.: Se consideran autores los que cooperan a la ejecución del hecho de tal manera que sin esta asistencia no se habría cometido.' },
      { id: 908, dificultad: 'Fácil', tema: 'Extradición', enunciado: '¿Puede Venezuela extraditar a un venezolano por un delito cometido en el extranjero?', opciones: [{ id: 'a', texto: 'Sí, si hay tratado.' }, { id: 'b', texto: 'No, nunca.' }, { id: 'c', texto: 'Solo por terrorismo.' }, { id: 'd', texto: 'Si renuncia a la nacionalidad.' }], respuestaCorrecta: 'b', feedback: 'Art. 6 C.P.: La extradición de un venezolano no podrá concederse por ningún motivo; deberá ser enjuiciado en Venezuela.' },
      { id: 909, dificultad: 'Media', tema: 'Agravantes', enunciado: 'Obrar con alevosía es una circunstancia:', opciones: [{ id: 'a', texto: 'Atenuante.' }, { id: 'b', texto: 'Eximente.' }, { id: 'c', texto: 'Agravante.' }, { id: 'd', texto: 'Indiferente.' }], respuestaCorrecta: 'c', feedback: 'Art. 77 Ord. 1 C.P.: Son circunstancias agravantes... Ejecutarlo con alevosía.' },
      { id: 910, dificultad: 'Alta', tema: 'Atenuantes', enunciado: 'No haber tenido la intención de causar un mal de tanta gravedad como el que se produjo (Preterintención) es:', opciones: [{ id: 'a', texto: 'Una agravante.' }, { id: 'b', texto: 'Una atenuante.' }, { id: 'c', texto: 'Una eximente.' }, { id: 'd', texto: 'Dolo eventual.' }], respuestaCorrecta: 'b', feedback: 'Art. 74 Ord. 4 C.P.: Es circunstancia atenuante no haber tenido la intención de causar un mal de tanta gravedad como el que produjo.' }
    ]
  }
  ,
  {
    id: 'vision-contemporanea',
    titulo: 'Vision contemporanea de Venezuela y el mundo',
    descripcion: 'Panorama social, politico y economico contemporaneo con enfoque juridico y comparado.',
    icono: 'fa-earth-americas',
    color: 'bg-sky-600',
    progreso: 0,
    isPremium: true,
    price: 4,
    modules: [
      {
        id: 'vision-m1',
        titulo: 'Estado, instituciones y democracia',
        tema: 'Institucionalidad y derechos',
        isPremium: false,
        lectura: 'La comprension de la Venezuela contemporanea exige analizar el diseno constitucional, el equilibrio de poderes y las garantias de derechos. A nivel comparado, los sistemas democraticos dependen de controles institucionales, transparencia y acceso a la justicia.',
        caso: {
          titulo: 'Control institucional en crisis',
          descripcion: 'Un organo del Estado emite una decision que limita la participacion ciudadana sin base legal clara.',
          documento: 'La medida restringe el acceso a informacion publica. Un grupo de ciudadanos solicita tutela constitucional para restablecer el derecho.',
          pregunta: 'Que criterio juridico es el mas relevante para evaluar la medida?',
          opciones: [
            { id: 'a', texto: 'El principio de legalidad y proporcionalidad.', isCorrect: true, feedback: 'Toda restriccion de derechos debe estar prevista en ley y ser proporcional.' },
            { id: 'b', texto: 'La discrecionalidad total del organo.', isCorrect: false, feedback: 'La discrecionalidad no es absoluta en materia de derechos.' },
            { id: 'c', texto: 'La oportunidad politica exclusivamente.', isCorrect: false, feedback: 'La oportunidad politica no sustituye el control constitucional.' },
            { id: 'd', texto: 'El consenso mediatico.', isCorrect: false, feedback: 'No es criterio juridico.' }
          ]
        },
        questionIds: [1001, 1002, 1003, 1004]
      },
      {
        id: 'vision-m2',
        titulo: 'Economia, migracion y derechos humanos',
        tema: 'Impacto social y proteccion de derechos',
        isPremium: true,
        lectura: 'La economia condiciona el acceso a derechos y servicios. La migracion masiva exige respuestas juridicas en materia de proteccion internacional, trabajo y no discriminacion. El enfoque contemporaneo integra derechos humanos y politicas publicas.',
        caso: {
          titulo: 'Proteccion de migrantes',
          descripcion: 'Una familia venezolana en el exterior sufre negacion de servicios basicos por su nacionalidad.',
          documento: 'La autoridad local alega que no tiene obligacion de atender a no nacionales. La familia solicita amparo ante organismos internacionales.',
          pregunta: 'Que principio debe guiar la respuesta estatal?',
          opciones: [
            { id: 'a', texto: 'No discriminacion y proteccion de derechos humanos.', isCorrect: true, feedback: 'La proteccion de derechos humanos es universal y sin discriminacion por nacionalidad.' },
            { id: 'b', texto: 'Negacion total de servicios por falta de nacionalidad.', isCorrect: false, feedback: 'Contradice el principio de no discriminacion.' },
            { id: 'c', texto: 'Prioridad exclusiva a nacionales en toda circunstancia.', isCorrect: false, feedback: 'Puede haber prioridades, pero no negacion absoluta de derechos.' },
            { id: 'd', texto: 'Resolucion solo politica sin control juridico.', isCorrect: false, feedback: 'Las decisiones deben respetar estandares juridicos.' }
          ]
        },
        questionIds: [1005, 1006, 1007, 1008, 1009]
      },
      {
        id: 'vision-m3',
        titulo: 'Geopolitica y relaciones internacionales',
        tema: 'Contexto regional y global',
        isPremium: true,
        lectura: 'La geopolitica analiza como los intereses estrategicos, el comercio, la energia y la seguridad afectan la soberania y la cooperacion internacional. En America Latina, los procesos de integracion y los cambios globales inciden en la politica interna y en el derecho internacional publico.',
        caso: {
          titulo: 'Acuerdo regional y soberania',
          descripcion: 'Un acuerdo comercial regional exige armonizar normas internas en materia ambiental.',
          documento: 'El Estado alega que la armonizacion limita su soberania legislativa. Organizaciones civiles exigen cumplimiento del acuerdo.',
          pregunta: 'Como se evalua juridicamente la tension entre soberania y compromisos internacionales?',
          opciones: [
            { id: 'a', texto: 'Los compromisos internacionales son opcionales.', isCorrect: false, feedback: 'Los tratados ratificados generan obligaciones.' },
            { id: 'b', texto: 'Debe buscarse compatibilidad constitucional y cumplimiento de buena fe.', isCorrect: true, feedback: 'La soberania convive con obligaciones internacionales asumidas.' },
            { id: 'c', texto: 'Se deben ignorar los tratados para proteger la soberania.', isCorrect: false, feedback: 'No se pueden ignorar compromisos ratificados.' },
            { id: 'd', texto: 'Solo cuenta la presion politica externa.', isCorrect: false, feedback: 'El analisis debe ser juridico y constitucional.' }
          ]
        },
        questionIds: [1010, 1011, 1012]
      }
    ],
    preguntas: [
      { id: 1001, dificultad: 'Media', tema: 'Instituciones', enunciado: 'El principio de separacion de poderes busca principalmente:', opciones: [{ id: 'a', texto: 'Concentrar decisiones en el Ejecutivo.' }, { id: 'b', texto: 'Evitar abusos mediante controles mutuos.' }, { id: 'c', texto: 'Eliminar la participacion ciudadana.' }, { id: 'd', texto: 'Reducir la independencia judicial.' }], respuestaCorrecta: 'b', feedback: 'La separacion de poderes limita el abuso y crea controles recíprocos.' },
      { id: 1002, dificultad: 'Media', tema: 'Derechos', enunciado: 'Un estado contemporaneo debe garantizar el acceso a la justicia porque:', opciones: [{ id: 'a', texto: 'Es opcional en tiempos de crisis.' }, { id: 'b', texto: 'Es un derecho humano esencial y transversal.' }, { id: 'c', texto: 'Solo aplica en materias penales.' }, { id: 'd', texto: 'Depende de la politica exterior.' }], respuestaCorrecta: 'b', feedback: 'El acceso a la justicia es un derecho habilitante para proteger otros derechos.' },
      { id: 1003, dificultad: 'Alta', tema: 'Constitucional', enunciado: 'Cuando una medida estatal restringe un derecho fundamental, el control juridico debe verificar:', opciones: [{ id: 'a', texto: 'Solo la voluntad politica del gobierno.' }, { id: 'b', texto: 'Legalidad, necesidad y proporcionalidad.' }, { id: 'c', texto: 'Exclusivamente la opinion publica.' }, { id: 'd', texto: 'Que el organo sea popular.' }], respuestaCorrecta: 'b', feedback: 'El test de proporcionalidad es la regla en restricciones de derechos.' },
      { id: 1004, dificultad: 'Media', tema: 'Democracia', enunciado: 'La participacion ciudadana en un sistema democratico contemporaneo se expresa mediante:', opciones: [{ id: 'a', texto: 'Solo el voto.' }, { id: 'b', texto: 'Voto, control social y mecanismos de incidencia.' }, { id: 'c', texto: 'Solo redes sociales.' }, { id: 'd', texto: 'Delegacion total en partidos.' }], respuestaCorrecta: 'b', feedback: 'La democracia contemporanea incluye mecanismos participativos y control ciudadano.' },
      { id: 1005, dificultad: 'Media', tema: 'Economia', enunciado: 'En contextos de crisis economica, la proteccion social debe priorizar:', opciones: [{ id: 'a', texto: 'Solo el mercado.' }, { id: 'b', texto: 'Derechos basicos y acceso a servicios esenciales.' }, { id: 'c', texto: 'La reduccion total del gasto social.' }, { id: 'd', texto: 'La privatizacion sin regulacion.' }], respuestaCorrecta: 'b', feedback: 'La proteccion social busca garantizar minimo vital y derechos basicos.' },
      { id: 1006, dificultad: 'Media', tema: 'Migracion', enunciado: 'La proteccion internacional de migrantes y refugiados se basa en:', opciones: [{ id: 'a', texto: 'El principio de no devolucion y no discriminacion.' }, { id: 'b', texto: 'La deportacion inmediata.' }, { id: 'c', texto: 'La negacion de servicios.' }, { id: 'd', texto: 'El cierre absoluto de fronteras.' }], respuestaCorrecta: 'a', feedback: 'El principio de no devolucion protege a quienes enfrentan riesgo.' },
      { id: 1007, dificultad: 'Alta', tema: 'DDHH', enunciado: 'El enfoque contemporaneo de derechos humanos implica que el Estado:', opciones: [{ id: 'a', texto: 'Solo respeta derechos civiles.' }, { id: 'b', texto: 'Garantiza derechos civiles, politicos, economicos, sociales y culturales.' }, { id: 'c', texto: 'Limita derechos en tiempos de crisis sin control.' }, { id: 'd', texto: 'Solo responde ante tribunales extranjeros.' }], respuestaCorrecta: 'b', feedback: 'Los derechos son integrales e interdependientes.' },
      { id: 1008, dificultad: 'Media', tema: 'Politicas publicas', enunciado: 'Una politica publica legitima en democracia debe:', opciones: [{ id: 'a', texto: 'Ser secreta por seguridad.' }, { id: 'b', texto: 'Ser transparente y evaluable.' }, { id: 'c', texto: 'Excluir participacion social.' }, { id: 'd', texto: 'Evitar el control judicial.' }], respuestaCorrecta: 'b', feedback: 'Transparencia y evaluacion permiten control ciudadano.' },
      { id: 1009, dificultad: 'Alta', tema: 'Comparado', enunciado: 'El analisis comparado entre Venezuela y la region sirve para:', opciones: [{ id: 'a', texto: 'Justificar cualquier politica local.' }, { id: 'b', texto: 'Identificar buenas practicas y riesgos institucionales.' }, { id: 'c', texto: 'Eliminar el contexto nacional.' }, { id: 'd', texto: 'Copiar modelos sin adaptacion.' }], respuestaCorrecta: 'b', feedback: 'El comparado permite aprender y adaptar soluciones.' }
      ,
      { id: 1010, dificultad: 'Media', tema: 'Geopolitica', enunciado: 'La geopolitica estudia principalmente:', opciones: [{ id: 'a', texto: 'Solo ideologias internas.' }, { id: 'b', texto: 'La relacion entre territorio, poder y estrategia.' }, { id: 'c', texto: 'La historia antigua.' }, { id: 'd', texto: 'Solo politicas municipales.' }], respuestaCorrecta: 'b', feedback: 'Analiza intereses estrategicos y su relacion con el territorio y el poder.' },
      { id: 1011, dificultad: 'Media', tema: 'Integracion', enunciado: 'En procesos de integracion regional, los Estados suelen:', opciones: [{ id: 'a', texto: 'Renunciar totalmente a su soberania.' }, { id: 'b', texto: 'Coordinar politicas y armonizar normas.' }, { id: 'c', texto: 'Eliminar sus constituciones.' }, { id: 'd', texto: 'Prohibir el comercio.' }], respuestaCorrecta: 'b', feedback: 'La integracion implica coordinacion y armonizacion, no renuncia total.' },
      { id: 1012, dificultad: 'Alta', tema: 'Derecho internacional', enunciado: 'El principio de buena fe en los tratados implica:', opciones: [{ id: 'a', texto: 'Cumplimiento oportunista.' }, { id: 'b', texto: 'Cumplir las obligaciones asumidas de manera leal.' }, { id: 'c', texto: 'Ignorar cambios de contexto.' }, { id: 'd', texto: 'Solo cumplir si hay beneficios inmediatos.' }], respuestaCorrecta: 'b', feedback: 'La buena fe exige ejecutar los tratados de manera leal y consistente.' }
    ]
  }
];

export const CRIME_SCENARIOS = [
  {
    id: 'cs-001',
    title: 'Cadena de Custodia: El Callejón',
    description: 'Se hallan casquillos percutidos en vía pública. El primer oficial los recolectó con la mano y los guardó en su bolsillo.',
    imagePrompt: 'crime scene alleyway night, chalk outline, bullet casings on ground, police tape, photorealistic 8k, cinematic lighting',
    question: 'Desde el punto de vista procesal (COPP), ¿cuál es la consecuencia inmediata de la acción del oficial?',
    options: [
      { id: 'a', text: 'Ninguna, si los entrega al CICPC.', isCorrect: false, feedback: 'La entrega posterior no subsana el vicio de origen.' },
      { id: 'b', text: 'Ruptura de la cadena de custodia y posible nulidad de la evidencia.', isCorrect: true, feedback: 'Correcto. La manipulación inadecuada sin fijación ni embalaje contamina la prueba (Art. 187 COPP).' },
      { id: 'c', text: 'Solo una sanción administrativa.', isCorrect: false, feedback: 'Afecta la validez probatoria en el juicio.' },
      { id: 'd', text: 'Es el procedimiento estándar de urgencia.', isCorrect: false, feedback: 'La urgencia no exime de la protección del sitio del suceso.' }
    ]
  },
  {
    id: 'cs-002',
    title: 'Documentología: El Testamento',
    description: 'Se disputa la autenticidad de una firma en un testamento ológrafo. A simple vista parece idéntica.',
    imagePrompt: 'antique wooden desk, legal documents, fountain pen, magnifying glass, old paper, photorealistic, detailed texture',
    question: '¿Qué principio criminalístico permite determinar si la firma es forjada a pesar de la similitud visual?',
    options: [
      { id: 'a', text: 'El análisis del papel.', isCorrect: false, feedback: 'El soporte no determina la autoría de la grafía.' },
      { id: 'b', text: 'La Grafotecnia y el análisis de los gestos tipo.', isCorrect: true, feedback: 'Correcto. La experticia grafotécnica analiza la presión, velocidad y "gestos tipo" inconscientes que son imposibles de imitar perfectamente.' },
      { id: 'c', text: 'La prueba de testigos.', isCorrect: false, feedback: 'Es una prueba testimonial, no técnica-científica.' },
      { id: 'd', text: 'La dactiloscopia.', isCorrect: false, feedback: 'Analiza huellas, no escritura.' }
    ]
  },
  {
    id: 'cs-003',
    title: 'Balística: Trayectoria',
    description: 'La víctima presenta orificio de entrada en la espalda y salida en el pecho. El tirador alega legítima defensa frontal.',
    imagePrompt: 'forensic silhouette target, bullet holes, measuring tape, ballistics lab, laser trajectory, 8k',
    question: '¿Qué elemento técnico refuta la versión de la legítima defensa en este caso?',
    options: [
      { id: 'a', text: 'El calibre del arma.', isCorrect: false, feedback: 'El calibre no determina la posición.' },
      { id: 'b', text: 'La ubicación de los orificios (Entrada posterior).', isCorrect: true, feedback: 'Correcto. Si la entrada es por la espalda, la víctima no estaba atacando de frente, lo que desvirtúa la inminencia de agresión frontal.' },
      { id: 'c', text: 'La distancia del disparo.', isCorrect: false, feedback: 'La distancia es secundaria ante la ubicación del impacto.' },
      { id: 'd', text: 'La hora del suceso.', isCorrect: false, feedback: 'Irrelevante para la trayectoria.' }
    ]
  }
];

export const CASE_STUDIES = [
  {
    id: 'case-001',
    title: 'Expediente N° 459-23: Vicio en Citación',
    difficulty: 'Basico',
    documentText: `REPÚBLICA BOLIVARIANA DE VENEZUELA
PODER JUDICIAL
TRIBUNAL PRIMERO DE MUNICIPIO ORDINARIO Y EJECUTOR DE MEDIDAS DEL ESTADO MIRANDA

ASUNTO: AP-1234-2023
MOTIVO: DIVORCIO (ART. 185-A C.C.)

ACTA DE CITACIÓN

En Los Teques, a los quince (15) días del mes de marzo de dos mil veinticuatro.
Siendo las 10:00 AM, constituido este Tribunal en la dirección indicada en el libelo de demanda, a los fines de practicar la citación personal de la ciudadana MARÍA PÉREZ.

SE HACE CONSTAR:
Que al no encontrar a la demandada en su residencia, se procedió a entregar la compulsa de la demanda y la boleta de citación al ciudadano JOSÉ GONZÁLEZ, quien manifestó ser vecino del apartamento contiguo y se comprometió a entregársela a la demandada cuando llegara de trabajar.

Se deja constancia y se firma.
El Alguacil.`,
    question: 'Analice el acta de citación anterior. ¿Cuál es el vicio procesal que acarrea la nulidad de este acto según el Código de Procedimiento Civil?',
    legalBasis: 'CPC Art. 218 (citación personal) y reglas de notificación válida.',
    consequence: 'Nulidad de la citación y reposición del acto procesal con citación válida.',
    takeaways: [
      'La citación personal es regla general y no puede sustituirse sin base legal.',
      'La entrega a un tercero sin agotamiento del procedimiento es vicio grave.',
      'La nulidad afecta la validez del acto y puede reponer la causa.'
    ],
    options: [
      { id: 'a', text: 'La hora de la citación no es hábil.', isCorrect: false, feedback: 'Las 10:00 AM es hora hábil de despacho.' },
      { id: 'b', text: 'La entrega a un tercero (vecino) sin haber agotado la búsqueda personal.', isCorrect: true, feedback: 'Correcto. La citación personal (Art. 218 CPC) debe ser entregada al demandado. La entrega a terceros solo procede bajo supuestos específicos de citación por correo o carteles tras no lograrse la personal.' },
      { id: 'c', text: 'Falta la firma del Juez en el acta.', isCorrect: false, feedback: 'El Alguacil es el funcionario competente para practicar la citación.' },
      { id: 'd', text: 'No se indica la cédula del vecino.', isCorrect: false, feedback: 'Aunque es un defecto formal, el vicio grave es la entrega a un no legitimado.' }
    ]
  },
  {
    id: 'case-002',
    title: 'Expediente N° 990-24: Medida Cautelar',
    difficulty: 'Intermedio',
    documentText: `LIBELO DE DEMANDA

CIUDADANO
JUEZ DE PRIMERA INSTANCIA EN LO CIVIL...

Yo, PEDRO RODRÍGUEZ, abogado en ejercicio... actuando como apoderado de INVERSIONES X, C.A...

DEMANDO:
A la empresa COMERCIAL Y, C.A., por la cantidad de CINCO MIL DÓLARES DE LOS ESTADOS UNIDOS DE AMÉRICA ($5.000,00 USD), derivados de una factura cambiaria vencida...

PETITORIO:
Solicito se decrete MEDIDA DE EMBARGO PREVENTIVO sobre bienes de la demandada por el doble de la cantidad demandada, fundamentado en el "periculum in mora" ya que la empresa está vendiendo sus activos.

Es justicia.`,
    question: 'En la solicitud de medida cautelar, ¿qué requisito concurrente del Art. 585 del CPC se ha omitido para la procedencia del embargo?',
    legalBasis: 'CPC Art. 585 (fumus boni iuris y periculum in mora).',
    consequence: 'Improcedencia de la medida cautelar por falta de presupuesto concurrente.',
    takeaways: [
      'Las medidas cautelares exigen riesgo y presunción grave del derecho.',
      'Omitir el fumus hace improcedente el embargo preventivo.',
      'La solicitud debe justificar ambos requisitos de forma expresa.'
    ],
    options: [
      { id: 'a', text: 'No se estimó la demanda en Bolívares.', isCorrect: false, feedback: 'Se puede demandar en moneda extranjera según criterios del TSJ.' },
      { id: 'b', text: 'No se argumentó ni probó el "Fumus Boni Iuris" (Humo de buen derecho).', isCorrect: true, feedback: 'Correcto. Para decretar medidas cautelares se requiere probar tanto el riesgo (periculum) como la presunción grave del derecho que se reclama (fumus).' },
      { id: 'c', text: 'El embargo no puede ser por el doble.', isCorrect: false, feedback: 'La ley permite cautelar hasta por el doble para cubrir costas.' },
      { id: 'd', text: 'Falta el RIF de la empresa demandante.', isCorrect: false, feedback: 'Es un requisito de forma subsanable.' }
    ]
  },
  {
    id: 'case-003',
    title: 'Expediente N° 112-25: Notificacion Electronica',
    difficulty: 'Intermedio',
    documentText: `TRIBUNAL DE PRIMERA INSTANCIA EN LO CIVIL
ASUNTO: CUMPLIMIENTO DE CONTRATO

ACTA DE NOTIFICACION

Se deja constancia que se realizo la notificacion via correo electronico a la parte demandada, sin constancia de recepcion ni firma digital. Se anexa captura de pantalla de envio.

El Alguacil.`,
    question: 'Que vicio procesal afecta la validez de la notificacion en este caso?',
    legalBasis: 'CPC reglas de notificacion y requisitos de constancia fehaciente.',
    consequence: 'Invalidez de la notificacion por falta de constancia de recepcion y orden judicial expresa.',
    takeaways: [
      'Las notificaciones deben ser fehacientes y verificables.',
      'La via electronica requiere reglas y constancias claras.',
      'La falta de constancia afecta la validez del acto.'
    ],
    options: [
      { id: 'a', text: 'Ningun vicio, basta con enviar el correo.', isCorrect: false, feedback: 'Se exige constancia fehaciente de recepcion.' },
      { id: 'b', text: 'Falta de constancia de recepcion valida.', isCorrect: true, feedback: 'La notificacion exige evidencia de recepcion; sin ella es invalida.' },
      { id: 'c', text: 'Solo se requiere que el correo tenga asunto.', isCorrect: false, feedback: 'El asunto no suple la constancia procesal.' },
      { id: 'd', text: 'El acto es valido si se imprime el correo.', isCorrect: false, feedback: 'La impresion no prueba recepcion por el destinatario.' }
    ]
  },
  {
    id: 'case-004',
    title: 'Expediente N° 208-25: Nulidad por Citacion Incorrecta',
    difficulty: 'Basico',
    documentText: `JUZGADO DE MUNICIPIO ORDINARIO
ASUNTO: COBRO DE BOLIVARES

ACTA DE CITACION

Se practicó citación en el domicilio laboral del demandado, entregando la boleta al supervisor de la empresa, sin dejar constancia de busqueda en el domicilio personal.

El Alguacil.`,
    question: 'Cual es el defecto principal que afecta la citacion?',
    legalBasis: 'CPC Art. 218 (citación personal) y orden de diligencias.',
    consequence: 'Nulidad de la citacion y reposicion del acto con citacion personal valida.',
    takeaways: [
      'La citacion debe ser personal salvo supuestos excepcionales.',
      'Debe agotarse la busqueda en el domicilio personal.',
      'La entrega a terceros en el trabajo no suple la citacion.'
    ],
    options: [
      { id: 'a', text: 'La citacion en el trabajo siempre es valida.', isCorrect: false, feedback: 'No sustituye la citacion personal sin agotar el procedimiento.' },
      { id: 'b', text: 'Se omitio la busqueda en el domicilio personal.', isCorrect: true, feedback: 'Debe agotarse la citacion personal en domicilio.' },
      { id: 'c', text: 'Falta la firma del supervisor.', isCorrect: false, feedback: 'El defecto principal es el procedimiento de citacion.' },
      { id: 'd', text: 'La citacion puede ser verbal.', isCorrect: false, feedback: 'La citacion exige formalidades.' }
    ]
  },
  {
    id: 'case-005',
    title: 'Expediente N° 315-25: Medida Preventiva y Garantia',
    difficulty: 'Intermedio',
    documentText: `JUZGADO DE PRIMERA INSTANCIA EN LO CIVIL
ASUNTO: CUMPLIMIENTO DE OBLIGACION

SOLICITUD DE EMBARGO PREVENTIVO

El actor solicita embargo preventivo sobre bienes del demandado, pero no ofrece caucion ni garantia para responder por danos en caso de improcedencia.

Es justicia.`,
    question: 'Que requisito puede exigir el tribunal antes de acordar la medida?',
    legalBasis: 'CPC Art. 585 y reglas de caucion en medidas cautelares.',
    consequence: 'El tribunal puede negar o condicionar la medida hasta que se otorgue garantia suficiente.',
    takeaways: [
      'Las medidas cautelares pueden exigir caucion.',
      'La garantia protege frente a danos por medidas improcedentes.',
      'El juez debe ponderar riesgo y garantias.'
    ],
    options: [
      { id: 'a', text: 'Ninguno, siempre se acuerda la medida.', isCorrect: false, feedback: 'El juez puede exigir caucion o negar si no hay garantia.' },
      { id: 'b', text: 'Garantia o caucion suficiente.', isCorrect: true, feedback: 'La caucion puede ser requisito para acordar la medida.' },
      { id: 'c', text: 'Solo el pago de tasas judiciales.', isCorrect: false, feedback: 'No sustituye la caucion.' },
      { id: 'd', text: 'Firmar un acta simple.', isCorrect: false, feedback: 'No suple la garantia requerida.' }
    ]
  },
  {
    id: 'case-006',
    title: 'Expediente N° 402-25: Prueba Ilícita',
    difficulty: 'Avanzado',
    documentText: `TRIBUNAL DE CONTROL
ASUNTO: INVESTIGACION PENAL

ACTA DE EVIDENCIA

La defensa alega que la evidencia fue obtenida sin orden judicial de allanamiento. El MP pretende incorporarla en audiencia.

Acta suscrita por funcionarios actuantes.`,
    question: 'Cual es el efecto procesal de la obtencion de la evidencia sin orden judicial?',
    legalBasis: 'CRBV Art. 49 (debido proceso) y COPP sobre prueba ilícita.',
    consequence: 'Exclusion de la evidencia por ilicitud y nulidad del acto de incorporacion.',
    takeaways: [
      'La prueba obtenida con violacion de derechos fundamentales es ilicita.',
      'El juez debe excluir la evidencia contaminada.',
      'El debido proceso protege la legalidad de la prueba.'
    ],
    options: [
      { id: 'a', text: 'Se admite si el hecho es grave.', isCorrect: false, feedback: 'La gravedad no valida una prueba ilícita.' },
      { id: 'b', text: 'Debe excluirse por ilicitud.', isCorrect: true, feedback: 'La prueba ilícita se excluye por violación de garantías.' },
      { id: 'c', text: 'Se admite con advertencia.', isCorrect: false, feedback: 'La ilicitud impide su incorporación.' },
      { id: 'd', text: 'Se admite si el imputado guarda silencio.', isCorrect: false, feedback: 'No es criterio para validar la prueba.' }
    ]
  },
  {
    id: 'case-007',
    title: 'Expediente N° 517-25: Litisconsorcio Pasivo',
    difficulty: 'Intermedio',
    documentText: `TRIBUNAL CIVIL
ASUNTO: RESPONSABILIDAD CONTRACTUAL

Se demanda a una empresa por incumplimiento. En el contrato figuran dos codeudores solidarios, pero solo se demanda a uno.

La parte demandada alega falta de litisconsorcio necesario.`,
    question: 'Que ocurre si no se integra el litisconsorcio pasivo necesario?',
    legalBasis: 'CPC sobre litisconsorcio necesario y validez del proceso.',
    consequence: 'Reposicion de la causa para integrar a todos los sujetos necesarios.',
    takeaways: [
      'El litisconsorcio necesario exige la presencia de todos los sujetos.',
      'La omision puede generar nulidad y reposicion.',
      'Garantiza el derecho a la defensa de todos los interesados.'
    ],
    options: [
      { id: 'a', text: 'El juicio puede continuar sin problema.', isCorrect: false, feedback: 'La ausencia de partes necesarias afecta la validez del proceso.' },
      { id: 'b', text: 'Debe reponerse para integrar a todos los sujetos.', isCorrect: true, feedback: 'La omision del litisconsorcio necesario genera reposicion.' },
      { id: 'c', text: 'Solo se anula si el juez lo desea.', isCorrect: false, feedback: 'Es un vicio objetivo de integracion de partes.' },
      { id: 'd', text: 'Se admite con una multa.', isCorrect: false, feedback: 'No subsana el defecto procesal.' }
    ]
  }
];
export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first-step', titulo: 'Novato Legal', descripcion: 'Primera respuesta correcta.', icono: 'fa-seedling', unlockedAt: '' },
  { id: 'scholar', titulo: 'Jurisconsulto', descripcion: 'Desbloqueaste materias premium.', icono: 'fa-book-open-reader', unlockedAt: '' },
  { id: 'gold-gavel', titulo: 'Mazo de Oro', descripcion: 'Examen con puntaje perfecto.', icono: 'fa-gavel', unlockedAt: '' },
  { id: 'streak-3', titulo: 'Constancia 3', descripcion: 'Racha de 3 dias seguidos.', icono: 'fa-fire', unlockedAt: '' },
  { id: 'streak-7', titulo: 'Constancia 7', descripcion: 'Racha de 7 dias seguidos.', icono: 'fa-fire-flame-curved', unlockedAt: '' },
  { id: 'streak-14', titulo: 'Constancia 14', descripcion: 'Racha de 14 dias seguidos.', icono: 'fa-bolt', unlockedAt: '' }
];
