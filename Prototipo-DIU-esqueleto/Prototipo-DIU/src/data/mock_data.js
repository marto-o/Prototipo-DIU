// Datos de ejemplo compartidos por todas las páginas del MVP.
// Reutilizan los datos del prototipo de Lovable.
// No inventar datos propios en cada página: agregar aquí si hace falta.

export const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
export const HORAS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

export const AYUDANTES = [
  'Camila Rojas',
  'Ignacio Fuentes',
  'Josefa Vergara',
  'Diego Muñoz',
  'Valentina Soto',
  'Matías Herrera'
]

// estado: 'disponible' | 'ocupada' | 'fuera_de_servicio'
export const MAQUINAS_INICIALES = [
  {
    id: 'impresora-1',
    nombre: 'Impresora 3D #1',
    modelo: 'FDM — Prusa MK4',
    sala: 'Sala A',
    estado: 'ocupada',
    proyectoActual: 'Impresión prótesis de mano (4 h)',
    responsable: 'Camila Rojas',
    restante: '2 h 25 min',
    motivo: null,
    vuelta: null
  },
  {
    id: 'impresora-2',
    nombre: 'Impresora 3D #2',
    modelo: 'FDM — Ender 3 V3',
    sala: 'Sala A',
    estado: 'disponible',
    proyectoActual: null,
    responsable: null,
    restante: null,
    motivo: null,
    vuelta: null
  },
  {
    id: 'cortadora-laser',
    nombre: 'Cortadora Láser',
    modelo: 'CO2 60W',
    sala: 'Sala B',
    estado: 'ocupada',
    proyectoActual: 'Corte de maqueta Arquitectura',
    responsable: 'Ignacio Fuentes',
    restante: '40 min',
    motivo: null,
    vuelta: null
  },
  {
    id: 'router-cnc',
    nombre: 'Router CNC',
    modelo: 'CNC 3 ejes 1200x800',
    sala: 'Taller',
    estado: 'fuera_de_servicio',
    proyectoActual: null,
    responsable: null,
    restante: null,
    motivo: 'Falla en el husillo, se esperan repuestos del proveedor.',
    vuelta: '2026-11-02'
  }
]

// unidad: 'g' | 'láminas'. umbral: bajo este valor (o igual) se considera stock bajo.
export const MATERIALES_INICIALES = [
  { id: 'pla-negro', nombre: 'Filamento PLA negro', cantidad: 850, unidad: 'g', umbral: 200, maximo: 1000 },
  { id: 'pla-gris', nombre: 'Filamento PLA gris', cantidad: 120, unidad: 'g', umbral: 200, maximo: 1000 },
  { id: 'petg-blanco', nombre: 'Filamento PETG blanco', cantidad: 430, unidad: 'g', umbral: 200, maximo: 1000 },
  { id: 'acrilico-3mm', nombre: 'Acrílico 3 mm', cantidad: 5, unidad: 'láminas', umbral: 3, maximo: 10 },
  { id: 'mdf-5mm', nombre: 'MDF 5 mm', cantidad: 2, unidad: 'láminas', umbral: 3, maximo: 10 },
  { id: 'resina', nombre: 'Resina estándar', cantidad: 950, unidad: 'g', umbral: 200, maximo: 1000 }
]

// Reservas por máquina: { [maquinaId]: { [`${dia}-${hora}`]: { titulo, persona } } }
// Un horario sin entrada = Libre.
const bloque = (dia, horas, titulo, persona) =>
  horas.reduce((acc, h) => ({ ...acc, [`${dia}-${h}`]: { titulo, persona } }), {})

export const RESERVAS_INICIALES = {
  'impresora-1': {
    ...bloque('Lunes', ['09:00', '10:00', '11:00'], 'Prótesis de mano - Kinesiología', 'Camila Rojas'),
    ...bloque('Martes', ['15:00', '16:00', '17:00', '18:00'], 'Engranajes Mecánica', 'Matías Herrera'),
    ...bloque('Jueves', ['09:00', '10:00'], 'Moldes taller de diseño', 'Valentina Soto')
  },
  'impresora-2': {
    ...bloque('Martes', ['10:00', '11:00', '12:00'], 'Carcasa sensor IoT (lote de 6)', 'Valentina Soto'),
    ...bloque('Viernes', ['14:00', '15:00'], 'Soportes de cámara', 'Diego Muñoz')
  },
  'cortadora-laser': {
    ...bloque('Lunes', ['14:00', '15:00'], 'Corte de maqueta Arquitectura', 'Ignacio Fuentes'),
    ...bloque('Miércoles', ['10:00', '11:00', '12:00'], 'Grabado de trofeos Robótica', 'Josefa Vergara'),
    ...bloque('Viernes', ['16:00', '17:00'], 'Llaveros eventos USM', 'Camila Rojas')
  },
  'router-cnc': {}
}

export const PROYECTOS_INICIALES = [
  {
    id: 'p1',
    nombre: 'Impresión prótesis de mano (4 h)',
    maquinaId: 'impresora-1',
    inicio: '09:00',
    responsable: 'Camila Rojas',
    restante: '2 h 25 min',
    progreso: 40,
    historial: []
  },
  {
    id: 'p2',
    nombre: 'Corte de maqueta Arquitectura',
    maquinaId: 'cortadora-laser',
    inicio: '14:00',
    responsable: 'Ignacio Fuentes',
    restante: '40 min',
    progreso: 60,
    historial: []
  },
  {
    id: 'p3',
    nombre: 'Carcasa sensor IoT (lote de 6)',
    maquinaId: 'impresora-2',
    inicio: '10:30',
    responsable: 'Valentina Soto',
    restante: '5 h 20 min',
    progreso: 15,
    historial: [
      { cuando: 'Ayer 18:00', de: 'Diego Muñoz', a: 'Valentina Soto', nota: 'Queda purgando el extrusor, revisar primera capa.' }
    ]
  },
  {
    id: 'p4',
    nombre: 'Grabado de trofeos Robótica',
    maquinaId: 'cortadora-laser',
    inicio: '16:00',
    responsable: 'Josefa Vergara',
    restante: '1 h 15 min',
    progreso: 45,
    historial: []
  }
]

// Turnos: { semanaActual | proximaSemana: { [dia]: { manana, tarde } } }
export const TURNOS_INICIALES = {
  actual: {
    Lunes: { manana: 'Camila Rojas', tarde: 'Diego Muñoz' },
    Martes: { manana: 'Ignacio Fuentes', tarde: 'Valentina Soto' },
    Miércoles: { manana: 'Josefa Vergara', tarde: 'Matías Herrera' },
    Jueves: { manana: 'Camila Rojas', tarde: 'Josefa Vergara' },
    Viernes: { manana: 'Diego Muñoz', tarde: 'Ignacio Fuentes' }
  },
  proxima: {
    Lunes: { manana: 'Valentina Soto', tarde: 'Camila Rojas' },
    Martes: { manana: 'Matías Herrera', tarde: 'Josefa Vergara' },
    Miércoles: { manana: 'Diego Muñoz', tarde: 'Ignacio Fuentes' },
    Jueves: { manana: 'Ignacio Fuentes', tarde: 'Matías Herrera' },
    Viernes: { manana: 'Josefa Vergara', tarde: 'Valentina Soto' }
  }
}

export const BLOQUES_TURNO = {
  manana: 'Mañana · 09:00 – 13:00',
  tarde: 'Tarde · 14:00 – 19:00'
}
