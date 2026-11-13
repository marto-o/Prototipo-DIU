import React, { useEffect, useMemo, useState } from 'react'

// Página independiente: utiliza almacenamiento local del navegador.
// Para compartir los cambios entre usuarios, conectar estas operaciones a app_state / API.
const STORAGE_KEY = 'herramientas_adicionales_v1'
const TIPOS = ['Mouse', 'Computador', 'Calculadora', 'Otro']
const FORMULARIO_VACIO = {
  nombre: '',
  tipo: 'Mouse',
  ubicacion: '',
  total: '1',
  disponibles: '1'
}

const cargarHerramientas = () => {
  try {
    if (typeof window === 'undefined') return []
    const guardadas = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(guardadas)) return []

    return guardadas.filter(item => (
      item && typeof item.id === 'string' &&
      typeof item.nombre === 'string' &&
      TIPOS.includes(item.tipo) &&
      Number.isInteger(item.total) && item.total > 0 &&
      Number.isInteger(item.disponibles) &&
      item.disponibles >= 0 && item.disponibles <= item.total
    ))
  } catch {
    return []
  }
}

const crearId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `herramienta-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

const estadoHerramienta = (herramienta) => {
  if (herramienta.disponibles === 0) {
    return { texto: 'Sin disponibilidad', clase: 'agotada' }
  }
  if (herramienta.disponibles < herramienta.total) {
    return { texto: 'Disponibilidad parcial', clase: 'parcial' }
  }
  return { texto: 'Disponible', clase: 'disponible' }
}

export const HerramientasAdicionalesPage = () => {
  const [herramientas, setHerramientas] = useState(cargarHerramientas)
  const [busqueda, setBusqueda] = useState('')
  const [tipoFiltro, setTipoFiltro] = useState('Todos')
  const [modal, setModal] = useState(null) // null | 'crear' | 'editar' | 'eliminar'
  const [idSeleccionado, setIdSeleccionado] = useState(null)
  const [formulario, setFormulario] = useState({ ...FORMULARIO_VACIO })
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [errorGuardado, setErrorGuardado] = useState(false)

  useEffect(() => {
    try {
      const nuevoValor = JSON.stringify(herramientas)
      // Evita escrituras repetidas y ciclos de sincronización entre pestañas.
      if (window.localStorage.getItem(STORAGE_KEY) !== nuevoValor) {
        window.localStorage.setItem(STORAGE_KEY, nuevoValor)
        // El evento "storage" no se dispara en la pestaña que hace el cambio.
        window.dispatchEvent(new Event('herramientas-adicionales-actualizadas'))
      }
      setErrorGuardado(false)
    } catch {
      setErrorGuardado(true)
    }
  }, [herramientas])

  // Mantiene sincronizadas varias pestañas del mismo navegador.
  useEffect(() => {
    const sincronizar = (event) => {
      if (event.key === STORAGE_KEY) setHerramientas(cargarHerramientas())
    }
    window.addEventListener('storage', sincronizar)
    return () => window.removeEventListener('storage', sincronizar)
  }, [])

  const herramientaSeleccionada = herramientas.find(h => h.id === idSeleccionado)

  const herramientasVisibles = useMemo(() => {
    const texto = busqueda.trim().toLocaleLowerCase('es')
    return herramientas.filter(herramienta => {
      const coincideTipo = tipoFiltro === 'Todos' || herramienta.tipo === tipoFiltro
      const coincideBusqueda = !texto || [
        herramienta.nombre, herramienta.tipo, herramienta.ubicacion || ''
      ].some(valor => valor.toLocaleLowerCase('es').includes(texto))
      return coincideTipo && coincideBusqueda
    })
  }, [herramientas, busqueda, tipoFiltro])

  const cerrarModal = () => {
    setModal(null)
    setIdSeleccionado(null)
    setError('')
  }

  const abrirCrear = () => {
    setFormulario({ ...FORMULARIO_VACIO })
    setIdSeleccionado(null)
    setError('')
    setMensaje('')
    setModal('crear')
  }

  const abrirEditar = (herramienta) => {
    setFormulario({
      nombre: herramienta.nombre,
      tipo: herramienta.tipo,
      ubicacion: herramienta.ubicacion || '',
      total: String(herramienta.total),
      disponibles: String(herramienta.disponibles)
    })
    setIdSeleccionado(herramienta.id)
    setError('')
    setMensaje('')
    setModal('editar')
  }

  const abrirEliminar = (herramienta) => {
    setIdSeleccionado(herramienta.id)
    setError('')
    setMensaje('')
    setModal('eliminar')
  }

  const actualizarCampo = (campo, valor) => {
    setFormulario(anterior => ({ ...anterior, [campo]: valor }))
    setError('')
  }

  const guardarHerramienta = (event) => {
    event.preventDefault()

    const nombre = formulario.nombre.trim()
    const ubicacion = formulario.ubicacion.trim()
    const total = Number(formulario.total)
    const disponibles = Number(formulario.disponibles)

    if (!nombre) {
      setError('Ingresa el nombre de la herramienta.')
      return
    }
    if (!TIPOS.includes(formulario.tipo)) {
      setError('Selecciona un tipo de herramienta válido.')
      return
    }
    if (formulario.total.trim() === '' || !Number.isSafeInteger(total) || total < 1) {
      setError('La cantidad total debe ser un número entero mayor que cero.')
      return
    }
    if (formulario.disponibles.trim() === '' || !Number.isSafeInteger(disponibles) || disponibles < 0) {
      setError('La cantidad disponible debe ser un número entero igual o mayor que cero.')
      return
    }
    if (disponibles > total) {
      setError('La cantidad disponible no puede superar la cantidad total.')
      return
    }

    const datos = { nombre, tipo: formulario.tipo, ubicacion, total, disponibles }
    if (modal === 'editar' && herramientaSeleccionada) {
      setHerramientas(anterior => anterior.map(h =>
        h.id === idSeleccionado ? { ...h, ...datos } : h
      ))
      setMensaje(`Se actualizó la disponibilidad de ${nombre}.`)
    } else if (modal === 'crear') {
      setHerramientas(anterior => [...anterior, { id: crearId(), ...datos }])
      setMensaje(`Se agregó ${nombre} al inventario.`)
    } else {
      return
    }
    cerrarModal()
  }

  const ajustarDisponibilidad = (herramienta, diferencia) => {
    const nuevaCantidad = herramienta.disponibles + diferencia
    if (nuevaCantidad < 0 || nuevaCantidad > herramienta.total) return
    setHerramientas(anterior => anterior.map(h =>
      h.id === herramienta.id ? { ...h, disponibles: nuevaCantidad } : h
    ))
    setMensaje(`Disponibilidad de ${herramienta.nombre}: ${nuevaCantidad} de ${herramienta.total}.`)
  }

  const eliminarHerramienta = () => {
    if (!herramientaSeleccionada) return
    const nombre = herramientaSeleccionada.nombre
    setHerramientas(anterior => anterior.filter(h => h.id !== idSeleccionado))
    cerrarModal()
    setMensaje(`Se eliminó ${nombre} del inventario.`)
  }

  return (
    <section className='materiales-page herramientas-page'>
      <style>{ESTILOS}</style>

      <header className='herramientas-page__header'>
        <div>
          <h2 className='materiales-page__titulo'>Herramientas adicionales</h2>
          <p className='materiales-page__subtitulo'>
            Consulta y administra la disponibilidad de mouse, computadores, calculadoras y otras herramientas.
          </p>
        </div>
        <button type='button' className='herramientas-page__btn herramientas-page__btn--primario' onClick={abrirCrear}>
          <span aria-hidden='true'>＋</span> Agregar herramienta
        </button>
      </header>

      {mensaje && (
        <div className='herramientas-page__notificacion' role='status'>
          <span>{mensaje}</span>
          <button type='button' aria-label='Cerrar aviso' onClick={() => setMensaje('')}>×</button>
        </div>
      )}
      {errorGuardado && (
        <p className='herramientas-page__error' role='alert'>
          No se pudieron guardar los cambios en este navegador. Verifica que el almacenamiento local esté habilitado.
        </p>
      )}

      <div className='herramientas-page__filtros'>
        <label className='herramientas-page__buscador'>
          <span>Buscar herramienta</span>
          <input
            type='search'
            placeholder='Buscar por nombre o ubicación...'
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </label>
        <label className='herramientas-page__selector'>
          <span>Tipo</span>
          <select value={tipoFiltro} onChange={e => setTipoFiltro(e.target.value)}>
            <option value='Todos'>Todos</option>
            {TIPOS.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
          </select>
        </label>
      </div>

      {herramientasVisibles.length > 0 ? (
        <div className='materiales-page__grid herramientas-page__grid'>
          {herramientasVisibles.map(herramienta => {
            const estado = estadoHerramienta(herramienta)
            const porcentaje = Math.round((herramienta.disponibles / herramienta.total) * 100)
            return (
              <article className='materiales-page__card herramientas-page__card' key={herramienta.id}>
                <div className='herramientas-page__card-encabezado'>
                  <div>
                    <span className='herramientas-page__categoria'>{herramienta.tipo}</span>
                    <h3 className='materiales-page__nombre herramientas-page__nombre'>{herramienta.nombre}</h3>
                    <p className='herramientas-page__ubicacion'>
                      {herramienta.ubicacion || 'Ubicación no especificada'}
                    </p>
                  </div>
                  <span className={`herramientas-page__estado herramientas-page__estado--${estado.clase}`}>
                    {estado.texto}
                  </span>
                </div>

                <div className='herramientas-page__cantidad'>
                  <strong>{herramienta.disponibles}</strong>
                  <span>de {herramienta.total} unidades disponibles</span>
                </div>
                <div
                  className='herramientas-page__barra'
                  role='progressbar'
                  aria-valuenow={herramienta.disponibles}
                  aria-valuemin={0}
                  aria-valuemax={herramienta.total}
                  aria-label={`Disponibilidad de ${herramienta.nombre}`}
                >
                  <span
                    className={`herramientas-page__barra-relleno herramientas-page__barra-relleno--${estado.clase}`}
                    style={{ width: `${porcentaje}%` }}
                  />
                </div>
                <div className='herramientas-page__detalle-cantidad'>
                  <span>{herramienta.total - herramienta.disponibles} no disponibles</span>
                  <span>{porcentaje}% disponible</span>
                </div>
                <div className='herramientas-page__ajuste'>
                  <span>Actualizar disponibles</span>
                  <div className='herramientas-page__ajuste-botones'>
                    <button
                      type='button'
                      onClick={() => ajustarDisponibilidad(herramienta, -1)}
                      disabled={herramienta.disponibles === 0}
                      aria-label={`Restar una unidad disponible de ${herramienta.nombre}`}
                    >−</button>
                    <strong>{herramienta.disponibles}</strong>
                    <button
                      type='button'
                      onClick={() => ajustarDisponibilidad(herramienta, 1)}
                      disabled={herramienta.disponibles === herramienta.total}
                      aria-label={`Sumar una unidad disponible a ${herramienta.nombre}`}
                    >+</button>
                  </div>
                </div>
                <div className='herramientas-page__acciones'>
                  <button
                    type='button'
                    className='herramientas-page__btn herramientas-page__btn--secundario'
                    onClick={() => abrirEditar(herramienta)}
                  >
                    Editar disponibilidad
                  </button>
                  <button
                    type='button'
                    className='herramientas-page__btn herramientas-page__btn--peligro'
                    onClick={() => abrirEliminar(herramienta)}
                    aria-label={`Eliminar ${herramienta.nombre}`}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className='herramientas-page__vacio'>
          {herramientas.length === 0 ? (
            <>
              <h3>Aún no hay herramientas registradas</h3>
              <p>Agrega un mouse, computador, calculadora u otra herramienta e indica cuántas unidades hay disponibles.</p>
              <button type='button' className='herramientas-page__btn herramientas-page__btn--primario' onClick={abrirCrear}>
                Agregar primera herramienta
              </button>
            </>
          ) : (
            <>
              <h3>No hay resultados</h3>
              <p>Modifica los filtros para ver las herramientas registradas.</p>
              <button type='button' className='herramientas-page__btn herramientas-page__btn--secundario' onClick={() => { setBusqueda(''); setTipoFiltro('Todos') }}>
                Limpiar filtros
              </button>
            </>
          )}
        </div>
      )}

      {modal && (
        <div className='herramientas-page__overlay' onMouseDown={e => {
          if (e.target === e.currentTarget) cerrarModal()
        }}>
          <div
            className='herramientas-page__modal'
            role='dialog'
            aria-modal='true'
            aria-labelledby='herramientas-modal-titulo'
          >
            <header className='herramientas-page__modal-header'>
              <h3 id='herramientas-modal-titulo'>
                {modal === 'crear' ? 'Agregar herramienta' :
                  modal === 'editar' ? 'Editar herramienta y disponibilidad' : 'Eliminar herramienta'}
              </h3>
              <button type='button' className='herramientas-page__cerrar' aria-label='Cerrar ventana' onClick={cerrarModal}>×</button>
            </header>

            {modal === 'eliminar' ? (
              <div className='herramientas-page__modal-cuerpo'>
                <p>
                  ¿Seguro que deseas eliminar <strong>{herramientaSeleccionada?.nombre}</strong>?
                  Esta acción quitará la herramienta y sus cantidades registradas.
                </p>
                <div className='herramientas-page__modal-acciones'>
                  <button type='button' className='herramientas-page__btn herramientas-page__btn--secundario' onClick={cerrarModal}>
                    Cancelar
                  </button>
                  <button type='button' className='herramientas-page__btn herramientas-page__btn--peligro-solido' onClick={eliminarHerramienta}>
                    Sí, eliminar
                  </button>
                </div>
              </div>
            ) : (
              <form className='herramientas-page__modal-cuerpo' onSubmit={guardarHerramienta}>
                <label className='herramientas-page__campo'>
                  <span>Nombre de la herramienta *</span>
                  <input
                    type='text'
                    maxLength={100}
                    placeholder='Ej.: Mouse inalámbrico'
                    value={formulario.nombre}
                    onChange={e => actualizarCampo('nombre', e.target.value)}
                    required
                    autoFocus
                  />
                </label>

                <div className='herramientas-page__campos-dos'>
                  <label className='herramientas-page__campo'>
                    <span>Tipo *</span>
                    <select value={formulario.tipo} onChange={e => actualizarCampo('tipo', e.target.value)}>
                      {TIPOS.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
                    </select>
                  </label>
                  <label className='herramientas-page__campo'>
                    <span>Ubicación (opcional)</span>
                    <input
                      type='text'
                      maxLength={100}
                      placeholder='Ej.: Sala de préstamo'
                      value={formulario.ubicacion}
                      onChange={e => actualizarCampo('ubicacion', e.target.value)}
                    />
                  </label>
                </div>

                <div className='herramientas-page__campos-dos'>
                  <label className='herramientas-page__campo'>
                    <span>Cantidad total *</span>
                    <input
                      type='number'
                      min='1'
                      step='1'
                      value={formulario.total}
                      onChange={e => actualizarCampo('total', e.target.value)}
                      required
                    />
                  </label>
                  <label className='herramientas-page__campo'>
                    <span>Unidades disponibles *</span>
                    <input
                      type='number'
                      min='0'
                      step='1'
                      max={formulario.total || undefined}
                      value={formulario.disponibles}
                      onChange={e => actualizarCampo('disponibles', e.target.value)}
                      required
                    />
                  </label>
                </div>
                <p className='herramientas-page__explicacion'>
                  Las unidades no disponibles se calculan automáticamente como total menos disponibles.
                </p>
                {error && <p className='herramientas-page__error' role='alert'>{error}</p>}
                <div className='herramientas-page__modal-acciones'>
                  <button type='button' className='herramientas-page__btn herramientas-page__btn--secundario' onClick={cerrarModal}>
                    Cancelar
                  </button>
                  <button type='submit' className='herramientas-page__btn herramientas-page__btn--primario'>
                    {modal === 'crear' ? 'Agregar herramienta' : 'Guardar cambios'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default HerramientasAdicionalesPage

// CSS encapsulado para que el archivo JSX funcione sin crear otra hoja de estilos.
// Se reutilizan también las clases materiales-page del diseño actual.
const ESTILOS = `
  .herramientas-page { width: 100%; }
  .herramientas-page * { box-sizing: border-box; }
  .herramientas-page__header { display:flex; align-items:center; justify-content:space-between; gap:20px; margin-bottom:24px; }
  .herramientas-page__header .materiales-page__subtitulo { margin-bottom:0; }
  .herramientas-page__btn { display:inline-flex; align-items:center; justify-content:center; gap:7px; border-radius:8px; border:1px solid transparent; padding:11px 15px; font:inherit; font-weight:650; font-size:13px; cursor:pointer; transition:background-color .15s ease, border-color .15s ease; white-space:nowrap; }
  .herramientas-page__btn:focus-visible, .herramientas-page button:focus-visible, .herramientas-page input:focus-visible, .herramientas-page select:focus-visible { outline:3px solid #a5c8fa; outline-offset:2px; }
  .herramientas-page__btn--primario { background:#205fb3; color:white; }
  .herramientas-page__btn--primario:hover { background:#174b94; }
  .herramientas-page__btn--secundario { background:#fff; color:#294767; border-color:#cbd5e1; }
  .herramientas-page__btn--secundario:hover { background:#f1f5f9; }
  .herramientas-page__btn--peligro { background:#fff; color:#b42318; border-color:#fecaca; }
  .herramientas-page__btn--peligro:hover { background:#fff1f2; }
  .herramientas-page__btn--peligro-solido { background:#b42318; color:#fff; }
  .herramientas-page__btn--peligro-solido:hover { background:#8f1c13; }
  .herramientas-page__filtros { display:flex; gap:14px; align-items:end; justify-content:space-between; margin-bottom:20px; }
  .herramientas-page__buscador, .herramientas-page__selector { display:flex; flex-direction:column; gap:6px; font-size:12px; font-weight:650; color:#475569; }
  .herramientas-page__buscador { flex:1; max-width:530px; }
  .herramientas-page__selector { width:190px; }
  .herramientas-page__filtros input, .herramientas-page__filtros select, .herramientas-page__campo input, .herramientas-page__campo select { width:100%; min-height:42px; padding:10px 12px; border:1px solid #cbd5e1; border-radius:7px; background:#fff; color:#1e293b; font:inherit; font-weight:400; font-size:13px; }
  .herramientas-page__grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:18px; align-items:stretch; }
  .herramientas-page__card { display:flex; flex-direction:column; gap:0; min-width:0; }
  .herramientas-page__card-encabezado { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; }
  .herramientas-page__categoria { display:block; color:#64748b; font-size:11px; font-weight:750; text-transform:uppercase; letter-spacing:.04em; margin-bottom:5px; }
  .herramientas-page__nombre { margin:0 0 4px; overflow-wrap:anywhere; }
  .herramientas-page__ubicacion { font-size:12px; color:#64748b; margin:0; overflow-wrap:anywhere; }
  .herramientas-page__estado { display:inline-flex; padding:5px 9px; border-radius:999px; font-size:11px; font-weight:750; line-height:1.3; text-align:center; flex-shrink:0; }
  .herramientas-page__estado--disponible { background:#dcfce7; color:#166534; }
  .herramientas-page__estado--parcial { background:#fef3c7; color:#92400e; }
  .herramientas-page__estado--agotada { background:#fee2e2; color:#991b1b; }
  .herramientas-page__cantidad { display:flex; align-items:baseline; gap:9px; padding-top:26px; padding-bottom:14px; }
  .herramientas-page__cantidad strong { font-size:34px; line-height:1; color:#0f172a; }
  .herramientas-page__cantidad span { color:#64748b; font-size:12px; }
  .herramientas-page__barra { width:100%; height:9px; background:#e2e8f0; border-radius:999px; overflow:hidden; }
  .herramientas-page__barra-relleno { display:block; height:100%; border-radius:999px; transition:width .15s ease; }
  .herramientas-page__barra-relleno--disponible { background:#22a663; }
  .herramientas-page__barra-relleno--parcial { background:#e6a23c; }
  .herramientas-page__barra-relleno--agotada { background:#df4b4b; }
  .herramientas-page__detalle-cantidad { display:flex; justify-content:space-between; gap:10px; font-size:11px; color:#64748b; margin-top:9px; }
  .herramientas-page__ajuste { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:18px 0; }
  .herramientas-page__ajuste > span { font-size:12px; color:#475569; font-weight:650; }
  .herramientas-page__ajuste-botones { display:inline-flex; gap:0; align-items:center; border:1px solid #cbd5e1; border-radius:7px; overflow:hidden; background:#fff; }
  .herramientas-page__ajuste-botones button { width:34px; height:34px; border:0; background:#f8fafc; color:#205fb3; font-size:19px; font-weight:750; cursor:pointer; }
  .herramientas-page__ajuste-botones button:hover:not(:disabled) { background:#e2e8f0; }
  .herramientas-page__ajuste-botones button:disabled { opacity:.35; cursor:not-allowed; }
  .herramientas-page__ajuste-botones strong { min-width:36px; text-align:center; font-size:13px; color:#1e293b; }
  .herramientas-page__acciones { display:flex; flex-wrap:wrap; gap:9px; border-top:1px solid #e2e8f0; margin-top:auto; padding-top:18px; }
  .herramientas-page__acciones .herramientas-page__btn--secundario { flex:1; }
  .herramientas-page__vacio { border:1px dashed #cbd5e1; border-radius:12px; padding:48px 20px; text-align:center; background:#fff; }
  .herramientas-page__vacio h3 { margin:0 0 9px; font-size:18px; color:#1e293b; }
  .herramientas-page__vacio p { color:#64748b; max-width:490px; margin:0 auto 20px; font-size:13px; }
  .herramientas-page__notificacion { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px 16px; margin-bottom:16px; border:1px solid #a7f3d0; background:#ecfdf5; color:#065f46; border-radius:8px; font-size:13px; }
  .herramientas-page__notificacion button { border:0; background:transparent; cursor:pointer; font-size:22px; color:inherit; }
  .herramientas-page__error { color:#b42318; font-size:12px; line-height:1.5; margin:0 0 12px; }
  .herramientas-page__overlay { position:fixed; inset:0; z-index:1000; display:flex; justify-content:center; align-items:center; padding:20px; background:rgba(15,23,42,.58); }
  .herramientas-page__modal { width:min(100%,580px); max-height:calc(100vh - 40px); overflow:auto; background:#fff; border-radius:12px; box-shadow:0 20px 70px rgba(0,0,0,.2); }
  .herramientas-page__modal-header { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:20px 24px; border-bottom:1px solid #e2e8f0; }
  .herramientas-page__modal-header h3 { margin:0; font-size:18px; color:#1e293b; }
  .herramientas-page__cerrar { border:0; background:transparent; color:#64748b; font-size:27px; line-height:1; cursor:pointer; }
  .herramientas-page__modal-cuerpo { display:flex; flex-direction:column; gap:18px; padding:24px; }
  .herramientas-page__modal-cuerpo > p { margin:0; color:#475569; font-size:13px; line-height:1.7; }
  .herramientas-page__campos-dos { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; }
  .herramientas-page__campo { display:flex; flex-direction:column; gap:7px; min-width:0; }
  .herramientas-page__campo span { font-size:12px; font-weight:700; color:#334155; }
  .herramientas-page__explicacion { color:#64748b!important; font-size:12px!important; }
  .herramientas-page__modal-acciones { display:flex; justify-content:flex-end; gap:10px; padding-top:12px; border-top:1px solid #e2e8f0; }
  @media (max-width:650px) {
    .herramientas-page__header { align-items:stretch; flex-direction:column; }
    .herramientas-page__filtros { align-items:stretch; flex-direction:column; }
    .herramientas-page__buscador { max-width:none; }
    .herramientas-page__selector { width:100%; }
    .herramientas-page__campos-dos { grid-template-columns:1fr; }
    .herramientas-page__modal-cuerpo { padding:18px; }
    .herramientas-page__modal-header { padding:18px; }
    .herramientas-page__card-encabezado { flex-direction:column; }
  }
`
