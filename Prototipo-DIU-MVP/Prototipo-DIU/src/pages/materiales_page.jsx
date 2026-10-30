import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../state/app_state'

// Hipótesis 6: ruta /materiales
// Meta: saber cuándo un material está por agotarse antes de que un usuario lo pida y no quede.

const paso = (material) => (material.unidad === 'g' ? 50 : 1)

const MaterialCard = ({ material, onGuardar }) => {
  const [borrador, setBorrador] = useState(String(material.cantidad))
  const [mensaje, setMensaje] = useState(null)

  // Si el stock cambia desde otra sección, el campo se sincroniza con el valor guardado.
  useEffect(() => { setBorrador(String(material.cantidad)) }, [material.cantidad])

  const valor = borrador === '' ? NaN : Number(borrador)
  const valido = Number.isInteger(valor) && valor >= 0
  const sinCambios = valido && valor === material.cantidad
  const bajo = material.cantidad <= material.umbral
  const porcentaje = Math.min(100, Math.round((material.cantidad / material.maximo) * 100))

  const ajustar = (delta) => {
    const base = valido ? valor : material.cantidad
    setBorrador(String(Math.max(0, base + delta)))
    setMensaje(null)
  }

  const guardar = () => {
    if (!valido || sinCambios) return
    onGuardar(material.id, valor)
    const quedaBajo = valor <= material.umbral
    setMensaje(quedaBajo
      ? { tipo: 'alerta', texto: `Guardado. Se generó una alerta: ${material.nombre} quedó en stock bajo.` }
      : { tipo: 'ok', texto: 'Cantidad guardada.' })
  }

  const clases = ['materiales-page__card']
  if (bajo) clases.push('materiales-page__card--bajo')

  return (
    <article className={clases.join(' ')}>
      <header className='materiales-page__card-header'>
        <div>
          <h3 className='materiales-page__nombre'>{material.nombre}</h3>
          <p className='materiales-page__umbral'>Umbral de alerta: {material.umbral} {material.unidad}</p>
        </div>
        {bajo && <span className='materiales-page__tag'>Stock bajo</span>}
      </header>

      <p className='materiales-page__cantidad'>
        {material.cantidad} <span className='materiales-page__unidad'>{material.unidad}</span>
      </p>

      <div
        className='materiales-page__barra'
        role='progressbar'
        aria-valuenow={material.cantidad}
        aria-valuemin={0}
        aria-valuemax={material.maximo}
        aria-label={`Stock de ${material.nombre}`}
      >
        <div className='materiales-page__barra-relleno' style={{ width: `${porcentaje}%` }} />
      </div>

      <p className='materiales-page__ayuda'>
        La alerta aparecerá cuando el stock baje de {material.umbral} {material.unidad}.
      </p>

      <div className='materiales-page__control'>
        <button
          type='button'
          className='materiales-page__paso'
          onClick={() => ajustar(-paso(material))}
          aria-label={`Restar ${paso(material)} ${material.unidad}`}
        >
          −
        </button>
        <input
          className='materiales-page__input'
          type='number'
          min='0'
          step='1'
          value={borrador}
          onChange={(e) => { setBorrador(e.target.value); setMensaje(null) }}
          aria-label={`Nueva cantidad de ${material.nombre}`}
        />
        <button
          type='button'
          className='materiales-page__paso'
          onClick={() => ajustar(paso(material))}
          aria-label={`Sumar ${paso(material)} ${material.unidad}`}
        >
          +
        </button>
      </div>

      {!valido && (
        <p className='materiales-page__error'>Ingresa una cantidad válida (número entero, 0 o más).</p>
      )}

      <button
        type='button'
        className='materiales-page__guardar'
        onClick={guardar}
        disabled={!valido || sinCambios}
      >
        Guardar cantidad
      </button>

      {mensaje && (
        <p className={`materiales-page__mensaje materiales-page__mensaje--${mensaje.tipo}`} role='status'>
          {mensaje.texto}
        </p>
      )}
    </article>
  )
}

export const MaterialesPage = () => {
  const { materiales, materialesBajos, actualizarStock } = useAppState()
  const navigate = useNavigate()

  return (
    <section className='materiales-page'>
      <h2 className='materiales-page__titulo'>Materiales y stock</h2>
      <p className='materiales-page__subtitulo'>
        Actualiza las cantidades tras cada uso; la alerta se activa sola.
      </p>

      {materialesBajos.length > 0 && (
        <div className='materiales-page__alerta' role='alert'>
          <strong>
            {materialesBajos.length} material(es) bajo el umbral — reponer pronto
          </strong>
          <p>
            {materialesBajos.map(m => `${m.nombre} (${m.cantidad} ${m.unidad})`).join(' · ')}
          </p>
          <button
            type='button'
            className='materiales-page__link'
            onClick={() => navigate('/')}
          >
            Ver en el panel de disponibilidad
          </button>
        </div>
      )}

      <div className='materiales-page__grid'>
        {materiales.map(m => (
          <MaterialCard key={m.id} material={m} onGuardar={actualizarStock} />
        ))}
      </div>
    </section>
  )
}

export default MaterialesPage
