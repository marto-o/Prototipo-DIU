
import React, { useState } from 'react'
import { useAppState } from '../state/app_state'

export const MaquinasPage = () => {
    const { maquinas, cambiarEstadoMaquina } = useAppState()

    const [maquinaSeleccionadaId, setMaquinaSeleccionadaId] = useState(null)
    const [motivo, setMotivo] = useState('')
    const [vuelta, setVuelta] = useState('')
    const [error, setError] = useState('')

    const maquinaSeleccionada = maquinas.find(
        maquina => maquina.id === maquinaSeleccionadaId
    )

    const obtenerFechaActual = () => {
        const hoy = new Date()
        return [
            hoy.getFullYear(),
            String(hoy.getMonth() + 1).padStart(2, '0'),
            String(hoy.getDate()).padStart(2, '0')
        ].join('-')
    }

    const abrirModal = (maquina) => {
        if (maquina.estado === 'ocupada') return

        setMaquinaSeleccionadaId(maquina.id)
        setMotivo('')
        setVuelta('')
        setError('')
    }

    const cerrarModal = () => {
        setMaquinaSeleccionadaId(null)
        setMotivo('')
        setVuelta('')
        setError('')
    }

    const cambiarEstado = () => {
        if (!maquinaSeleccionada) return
        if (maquinaSeleccionada.estado === 'ocupada') return

        const fueraServicio =
            maquinaSeleccionada.estado === 'fuera_de_servicio'

        if (fueraServicio) {
            cambiarEstadoMaquina(
                maquinaSeleccionada.id,
                'disponible'
            )
        } else {
            if (motivo.trim() === '') {
                setError('Debes indicar la razón para sacar la máquina de servicio.')
                return
            }

            if (!vuelta) {
                setError('Debes indicar la fecha estimada de regreso.')
                return
            }

            if (vuelta < obtenerFechaActual()) {
                setError('La fecha de regreso no puede ser anterior a hoy.')
                return
            }

            cambiarEstadoMaquina(
                maquinaSeleccionada.id,
                'fuera_de_servicio',
                motivo.trim(),
                vuelta
            )
        }

        cerrarModal()
    }

    return (
        <div className='panel-page__section'>

            <div className='panel-page__section-header'>
                <h3 className='panel-page__section-title'>
                    ESTADO DE MÁQUINAS
                </h3>
            </div>

            <div className='panel-page__grid'>
                {maquinas.map(maquina => {
                    const esDisponible = maquina.estado === 'disponible'
                    const esOcupada = maquina.estado === 'ocupada'
                    const esFueraServicio = maquina.estado === 'fuera_de_servicio'

                    return (
                        <div
                            key={maquina.id}
                            className={`panel-page__card panel-page__card--${maquina.estado}`}
                        >
                            <div className='panel-page__card-header'>
                                <div>
                                    <h4 className='panel-page__card-name'>
                                        {maquina.nombre}
                                    </h4>

                                    <p className='panel-page__card-model'>
                                        {maquina.modelo} · {maquina.sala}
                                    </p>
                                </div>

                                <span className={`panel-page__badge panel-page__badge--${maquina.estado}`}>
                                    {esDisponible && '● Disponible'}
                                    {esOcupada && '● Ocupada'}
                                    {esFueraServicio && '● Fuera de servicio'}
                                </span>
                            </div>

                            <div className='panel-page__card-body'>
                                {esDisponible && (
                                    <div className='panel-page__free-info'>
                                        <p className='panel-page__free-text'>
                                            Lista para uso inmediato.
                                        </p>
                                        <span className='panel-page__free-sub'>
                                            Sin proyectos en cola activa.
                                        </span>
                                    </div>
                                )}

                                {esOcupada && (
                                    <div className='panel-page__job-info'>
                                        <p className='panel-page__job-title'>
                                            {maquina.proyectoActual}
                                        </p>
                                        <p className='panel-page__job-meta'>
                                            Responsable: <strong>{maquina.responsable}</strong>
                                        </p>
                                        <p className='panel-page__job-time'>
                                            ⏳ Restan: <strong>{maquina.restante}</strong>
                                        </p>
                                    </div>
                                )}

                                {esFueraServicio && (
                                    <div className='panel-page__repair-info'>
                                        <p className='panel-page__repair-reason'>
                                            <strong>Motivo:</strong>{' '}
                                            {maquina.motivo || 'No especificado'}
                                        </p>

                                        {maquina.vuelta && (
                                            <p className='panel-page__repair-date'>
                                                Retorno estimado: {maquina.vuelta}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className='panel-page__card-footer'>
                                <button
                                    type='button'
                                    className='panel-page__btn-detail'
                                    onClick={() => abrirModal(maquina)}
                                    disabled={esOcupada}
                                    style={{
                                        opacity: esOcupada ? 0.5 : 1,
                                        cursor: esOcupada ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {esOcupada
                                        ? 'Máquina ocupada'
                                        : esFueraServicio
                                            ? 'Volver a disponible'
                                            : 'Sacar de servicio'}
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {maquinas.length === 0 && (
                <p>No hay máquinas registradas.</p>
            )}

            {maquinaSeleccionada && (
                <div
                    className='panel-page__modal-overlay'
                    onClick={cerrarModal}
                >
                    <div
                        className='panel-page__modal'
                        role='dialog'
                        aria-modal='true'
                        aria-labelledby='modal-maquina-titulo'
                        onClick={e => e.stopPropagation()}
                    >
                        <div className='panel-page__modal-header'>
                            <h4 id='modal-maquina-titulo'>
                                {maquinaSeleccionada.nombre}
                            </h4>

                            <button
                                type='button'
                                className='panel-page__modal-close'
                                onClick={cerrarModal}
                                aria-label='Cerrar ventana'
                            >
                                ✕
                            </button>
                        </div>

                        <div className='panel-page__modal-body'>
                            <p>
                                <strong>Modelo:</strong>{' '}
                                {maquinaSeleccionada.modelo}
                            </p>

                            <p>
                                <strong>Ubicación:</strong>{' '}
                                {maquinaSeleccionada.sala}
                            </p>

                            <p>
                                <strong>Estado actual:</strong>{' '}
                                {maquinaSeleccionada.estado.replaceAll('_', ' ')}
                            </p>

                            {maquinaSeleccionada.estado === 'fuera_de_servicio' ? (
                                <div>
                                    <p>
                                        <strong>Motivo registrado:</strong>{' '}
                                        {maquinaSeleccionada.motivo || 'No especificado'}
                                    </p>

                                    {maquinaSeleccionada.vuelta && (
                                        <p>
                                            <strong>Retorno estimado:</strong>{' '}
                                            {maquinaSeleccionada.vuelta}
                                        </p>
                                    )}

                                    <p style={{ marginTop: '16px' }}>
                                        ¿Deseas volver a poner esta máquina disponible?
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ marginTop: '16px' }}>
                                        <label
                                            htmlFor='motivo-maquina'
                                            style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Motivo de mantención:
                                        </label>

                                        <textarea
                                            id='motivo-maquina'
                                            value={motivo}
                                            onChange={e => {
                                                setMotivo(e.target.value)
                                                setError('')
                                            }}
                                            placeholder='Ejemplo: Falla en el sistema de refrigeración'
                                            rows={4}
                                            maxLength={500}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                resize: 'vertical'
                                            }}
                                        />
                                    </div>

                                    <div style={{ marginTop: '16px' }}>
                                        <label
                                            htmlFor='fecha-vuelta'
                                            style={{
                                                display: 'block',
                                                marginBottom: '8px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Fecha estimada de regreso al servicio:
                                        </label>

                                        <input
                                            id='fecha-vuelta'
                                            type='date'
                                            value={vuelta}
                                            min={obtenerFechaActual()}
                                            onChange={e => {
                                                setVuelta(e.target.value)
                                                setError('')
                                            }}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px'
                                            }}
                                        />
                                    </div>

                                    {error && (
                                        <p
                                            role='alert'
                                            style={{
                                                color: '#c62828',
                                                marginTop: '12px'
                                            }}
                                        >
                                            {error}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className='panel-page__modal-footer'>
                            <button
                                type='button'
                                className='panel-page__btn-modal-close'
                                onClick={cerrarModal}
                            >
                                Cancelar
                            </button>

                            <button
                                type='button'
                                className='panel-page__btn-detail'
                                onClick={cambiarEstado}
                            >
                                {maquinaSeleccionada.estado === 'fuera_de_servicio'
                                    ? 'Volver a disponible'
                                    : 'Confirmar fuera de servicio'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MaquinasPage
