import React, { createContext, useContext, useState } from 'react'

import {
  MAQUINAS_INICIALES,
  MATERIALES_INICIALES,
  RESERVAS_INICIALES,
  PROYECTOS_INICIALES,
  TURNOS_INICIALES,
  ESTADO_PUBLICACION_INICIAL
} from '../data/mock_data'

// Estado global del MVP (solo frontend, sin backend).
// Se comparte entre páginas para que un cambio en una se refleje en las otras:
//   - Marcar una máquina "fuera de servicio" (/maquinas) -> se ve en el Panel (/) y en el banner.
//   - Cambiar stock (/materiales) -> se ve en el Panel (/) y en el banner.

const AppStateContext = createContext(null)

export const AppStateProvider = ({ children }) => {
  const [maquinas, setMaquinas] = useState(MAQUINAS_INICIALES)
  const [materiales, setMateriales] = useState(MATERIALES_INICIALES)
  const [reservas] = useState(RESERVAS_INICIALES)
  const [proyectos, setProyectos] = useState(PROYECTOS_INICIALES)
  const [turnos, setTurnos] = useState(TURNOS_INICIALES)
  const [estadoPublicacion, setEstadoPublicacion] = useState(ESTADO_PUBLICACION_INICIAL)

  // ---- Hipótesis 4: /maquinas ----
  // estado: 'disponible' | 'ocupada' | 'fuera_de_servicio'
  // Si es 'fuera_de_servicio', pasar motivo y vuelta (fecha estimada, 'AAAA-MM-DD').
  const cambiarEstadoMaquina = (id, estado, motivo = null, vuelta = null) => {
    setMaquinas(prev => prev.map(m => (
      m.id === id
        ? {
            ...m,
            estado,
            motivo: estado === 'fuera_de_servicio' ? motivo : null,
            vuelta: estado === 'fuera_de_servicio' ? vuelta : null
          }
        : m
    )))
  }

  // ---- Hipótesis 6: /materiales ----
  const actualizarStock = (id, cantidad) => {
    setMateriales(prev => prev.map(m => (m.id === id ? { ...m, cantidad } : m)))
  }

  // ---- Hipótesis 3: /proyectos ----
  // Traspasa el proyecto a otro ayudante y registra el traspaso en su historial.
  const traspasarProyecto = (id, nuevoResponsable, nota) => {
    setProyectos(prev => prev.map(p => (
      p.id === id
        ? {
            ...p,
            responsable: nuevoResponsable,
            historial: [
              { cuando: 'Ahora', de: p.responsable, a: nuevoResponsable, nota },
              ...p.historial
            ]
          }
        : p
    )))
  }

  // ---- Hipótesis 5: /turnos ----
  // semana: 'actual' | 'proxima'; dia: 'Lunes'...; bloque: 'manana' | 'tarde'
  const asignarTurno = (semana, dia, bloque, ayudante) => {
    setTurnos(prev => ({
      ...prev,
      [semana]: {
        ...prev[semana],
        [dia]: { ...prev[semana][dia], [bloque]: ayudante }
      }
    }))
    setEstadoPublicacion(prev => ({
      ...prev,
      [semana]: {
        ...prev[semana],
        cambiosSinPublicar: true
      }
    }))
  }

  const publicarTurnos = (semana, publicadoPor = 'Christian Carvajal') => {
    const hoy = new Date()
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ]
    const diaNum = hoy.getDate()
    const mesNom = meses[hoy.getMonth()]
    const hora = String(hoy.getHours()).padStart(2, '0')
    const min = String(hoy.getMinutes()).padStart(2, '0')
    const fechaFormateada = `${diaNum} de ${mesNom}, ${hora}:${min} hrs`

    setEstadoPublicacion(prev => ({
      ...prev,
      [semana]: {
        publicado: true,
        fechaPublicacion: fechaFormateada,
        publicadoPor,
        cambiosSinPublicar: false
      }
    }))
  }

  // ---- Derivados compartidos (los usa el banner del layout y el Panel) ----
  const materialesBajos = materiales.filter(m => m.cantidad <= m.umbral)
  const maquinasFueraDeServicio = maquinas.filter(m => m.estado === 'fuera_de_servicio')

  const value = {
    maquinas,
    materiales,
    reservas,
    proyectos,
    turnos,
    estadoPublicacion,
    materialesBajos,
    maquinasFueraDeServicio,
    cambiarEstadoMaquina,
    actualizarStock,
    traspasarProyecto,
    asignarTurno,
    publicarTurnos
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export const useAppState = () => {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState debe usarse dentro de <AppStateProvider>')
  return ctx
}
