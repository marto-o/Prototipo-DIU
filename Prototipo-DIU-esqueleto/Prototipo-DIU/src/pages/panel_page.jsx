import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../state/app_state'

export const PanelPage = () => {
  const navigate = useNavigate()
  const { maquinas, materiales, materialesBajos } = useAppState()

  // Estado para modal "Ver detalle" (para que todo botón sea interactivo)
  const [maquinaSeleccionada, setMaquinaSeleccionada] = useState(null)

  // Filtro de máquinas
  const [filtroTipo, setFiltroTipo] = useState('todos') // 'todos' | '3d' | 'laser' | 'cnc'

  // Simulación de "Tiempo real / Actualizado automáticamente"
  const [segundosTranscurridos, setSegundosTranscurridos] = useState(0)
  const [estaActualizando, setEstaActualizando] = useState(false)

  useEffect(() => {
    const intervalo = setInterval(() => {
      setSegundosTranscurridos(prev => prev + 1)
    }, 1000)
    return () => clearInterval(intervalo)
  }, [])

  const handleRefrescar = () => {
    setEstaActualizando(true)
    setTimeout(() => {
      setSegundosTranscurridos(0)
      setEstaActualizando(false)
    }, 400)
  }

  // Filtrado de máquinas
  const maquinasFiltradas = maquinas.filter(m => {
    if (filtroTipo === '3d') return m.id.includes('impresora')
    if (filtroTipo === 'laser') return m.id.includes('laser')
    if (filtroTipo === 'cnc') return m.id.includes('cnc')
    return true
  })

  return (
    <section className='panel-page'>
      {/* Encabezado y Barra de Tiempo Real */}
      <header className='panel-page__header'>
        <div>
          <h2 className='panel-page__title'>Panel de disponibilidad</h2>
          <p className='panel-page__subtitle'>
            Vista rápida del estado de máquinas y materiales en tiempo real.
          </p>
        </div>

        {/* Indicador de actualización automática */}
        <div className='panel-page__realtime-box'>
          <div className='panel-page__live-badge'>
            <span className='panel-page__live-dot' />
            EN TIEMPO REAL
          </div>
          <span className='panel-page__sync-text'>
            {estaActualizando ? 'Actualizando datos...' : `Sincronizado hace ${segundosTranscurridos}s`}
          </span>
          <button
            type='button'
            className='panel-page__btn-refresh'
            onClick={handleRefrescar}
            title='Forzar sincronización'
          >
            ↻
          </button>
        </div>
      </header>

      {/* Banner de alerta de stock bajo */}
      {materialesBajos.length > 0 && (
        <div className='panel-page__alert-banner'>
          <div className='panel-page__alert-content'>
            <strong>⚠ Alerta de stock bajo:</strong>{' '}
            {materialesBajos.map(m => `${m.nombre} (${m.cantidad} ${m.unidad})`).join(', ')}.
          </div>
          <button
            type='button'
            className='panel-page__alert-btn'
            onClick={() => navigate('/materiales')}
          >
            Actualizar stock
          </button>
        </div>
      )}

      {/* SECCIÓN 1: ESTADO DE MÁQUINAS */}
      <div className='panel-page__section'>
        <div className='panel-page__section-header'>
          <h3 className='panel-page__section-title'>MÁQUINAS</h3>
          {/* Filtros interactivos */}
          <div className='panel-page__filters'>
            <button
              type='button'
              className={`panel-page__filter-btn ${filtroTipo === 'todos' ? 'panel-page__filter-btn--active' : ''}`}
              onClick={() => setFiltroTipo('todos')}
            >
              Todas ({maquinas.length})
            </button>
            <button
              type='button'
              className={`panel-page__filter-btn ${filtroTipo === '3d' ? 'panel-page__filter-btn--active' : ''}`}
              onClick={() => setFiltroTipo('3d')}
            >
              Impresoras 3D
            </button>
            <button
              type='button'
              className={`panel-page__filter-btn ${filtroTipo === 'laser' ? 'panel-page__filter-btn--active' : ''}`}
              onClick={() => setFiltroTipo('laser')}
            >
              Láser
            </button>
            <button
              type='button'
              className={`panel-page__filter-btn ${filtroTipo === 'cnc' ? 'panel-page__filter-btn--active' : ''}`}
              onClick={() => setFiltroTipo('cnc')}
            >
              Router CNC
            </button>
          </div>
        </div>

        <div className='panel-page__grid'>
          {maquinasFiltradas.map(maquina => {
            const esDisponible = maquina.estado === 'disponible'
            const esOcupada = maquina.estado === 'ocupada'
            const esFueraServicio = maquina.estado === 'fuera_de_servicio'

            return (
              <div key={maquina.id} className={`panel-page__card panel-page__card--${maquina.estado}`}>
                <div className='panel-page__card-header'>
                  <div>
                    <h4 className='panel-page__card-name'>{maquina.nombre}</h4>
                    <p className='panel-page__card-model'>{maquina.modelo} · {maquina.sala}</p>
                  </div>
                  <span className={`panel-page__badge panel-page__badge--${maquina.estado}`}>
                    {esDisponible && '● Disponible'}
                    {esOcupada && '● Ocupada'}
                    {esFueraServicio && '● Fuera de servicio'}
                  </span>
                </div>

                <div className='panel-page__card-body'>
                  {esOcupada && (
                    <div className='panel-page__job-info'>
                      <p className='panel-page__job-title'>{maquina.proyectoActual}</p>
                      <p className='panel-page__job-meta'>Responsable: <strong>{maquina.responsable}</strong></p>
                      <p className='panel-page__job-time'>⏳ Restan: <strong>{maquina.restante}</strong></p>
                    </div>
                  )}

                  {esDisponible && (
                    <div className='panel-page__free-info'>
                      <p className='panel-page__free-text'>Lista para uso inmediato.</p>
                      <span className='panel-page__free-sub'>Sin proyectos en cola activa.</span>
                    </div>
                  )}

                  {esFueraServicio && (
                    <div className='panel-page__repair-info'>
                      <p className='panel-page__repair-reason'><strong>Motivo:</strong> {maquina.motivo}</p>
                      {maquina.vuelta && (
                        <p className='panel-page__repair-date'>Retorno estimado: {maquina.vuelta}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className='panel-page__card-footer'>
                  <button
                    type='button'
                    className='panel-page__btn-detail'
                    onClick={() => setMaquinaSeleccionada(maquina)}
                  >
                    Ver detalle
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* SECCIÓN 2: STOCK DE MATERIALES */}
      <div className='panel-page__section'>
        <div className='panel-page__section-header'>
          <h3 className='panel-page__section-title'>STOCK DE MATERIALES</h3>
          <span className='panel-page__section-help'>
            Monitoreo en tiempo real del filamento y planchas
          </span>
        </div>

        <div className='panel-page__materials-grid'>
          {materiales.map(material => {
            const porcentaje = Math.min(100, Math.round((material.cantidad / material.maximo) * 100))
            const esBajo = material.cantidad <= material.umbral

            return (
              <div
                key={material.id}
                className={`panel-page__mat-card ${esBajo ? 'panel-page__mat-card--low' : ''}`}
              >
                <div className='panel-page__mat-header'>
                  <span className='panel-page__mat-name'>{material.nombre}</span>
                  {esBajo && <span className='panel-page__mat-alert-badge'>Stock bajo</span>}
                </div>

                <div className='panel-page__mat-amount'>
                  <span className='panel-page__mat-value'>{material.cantidad}</span>
                  <span className='panel-page__mat-unit'>{material.unidad}</span>
                </div>

                {/* Barra de progreso visual */}
                <div className='panel-page__progress-bg'>
                  <div
                    className={`panel-page__progress-bar ${esBajo ? 'panel-page__progress-bar--alert' : ''}`}
                    style={{ width: `${porcentaje}%` }}
                  />
                </div>

                <div className='panel-page__mat-footer'>
                  <span className='panel-page__mat-threshold'>
                    Umbral alerta: {material.umbral} {material.unidad}
                  </span>
                  <span className='panel-page__mat-capacity'>
                    Máx: {material.maximo} {material.unidad}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* MODAL: VER DETALLE DE MÁQUINA */}
      {maquinaSeleccionada && (
        <div className='panel-page__modal-overlay' onClick={() => setMaquinaSeleccionada(null)}>
          <div className='panel-page__modal' onClick={e => e.stopPropagation()}>
            <div className='panel-page__modal-header'>
              <h4>{maquinaSeleccionada.nombre}</h4>
              <button
                type='button'
                className='panel-page__modal-close'
                onClick={() => setMaquinaSeleccionada(null)}
              >
                ✕
              </button>
            </div>

            <div className='panel-page__modal-body'>
              <p><strong>Modelo:</strong> {maquinaSeleccionada.modelo}</p>
              <p><strong>Ubicación:</strong> {maquinaSeleccionada.sala}</p>
              <p><strong>Estado operativo:</strong> {maquinaSeleccionada.estado.replace('_', ' ')}</p>

              {maquinaSeleccionada.proyectoActual && (
                <div className='panel-page__modal-highlight'>
                  <p><strong>Proyecto en proceso:</strong> {maquinaSeleccionada.proyectoActual}</p>
                  <p><strong>Responsable:</strong> {maquinaSeleccionada.responsable}</p>
                  <p><strong>Tiempo estimado restante:</strong> {maquinaSeleccionada.restante}</p>
                </div>
              )}

              {maquinaSeleccionada.motivo && (
                <div className='panel-page__modal-highlight panel-page__modal-highlight--error'>
                  <p><strong>Detalle de la falla:</strong> {maquinaSeleccionada.motivo}</p>
                  <p><strong>Fecha estimada de habilitación:</strong> {maquinaSeleccionada.vuelta || 'Por confirmar'}</p>
                </div>
              )}
            </div>

            <div className='panel-page__modal-footer'>
              <button
                type='button'
                className='panel-page__btn-modal-close'
                onClick={() => setMaquinaSeleccionada(null)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default PanelPage

