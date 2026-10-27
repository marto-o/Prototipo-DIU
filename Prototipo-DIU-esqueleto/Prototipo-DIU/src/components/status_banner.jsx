import React from 'react'

import { useAppState } from '../state/app_state'

// Resumen global visible en todas las páginas (sigue el prototipo de Lovable).
export const StatusBanner = () => {
  const { materialesBajos, maquinasFueraDeServicio } = useAppState()
  const hayAlertas = materialesBajos.length > 0 || maquinasFueraDeServicio.length > 0

  return (
    <div className={`status-banner ${hayAlertas ? 'status-banner--alerta' : ''}`}>
      {hayAlertas
        ? `${materialesBajos.length} material(es) con stock bajo · ${maquinasFueraDeServicio.length} máquina(s) fuera de servicio`
        : 'Todo operativo: sin alertas de stock ni máquinas fuera de servicio'}
    </div>
  )
}

export default StatusBanner
