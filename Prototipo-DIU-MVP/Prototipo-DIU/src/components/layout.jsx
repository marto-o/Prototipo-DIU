
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'

import { AppStateProvider } from '../state/app_state'

import PanelPage from '../pages/panel_page'
import ReservasPage from '../pages/reservas_page'
import ProyectosPage from '../pages/proyectos_page'
import MaquinasPage from '../pages/maquinas_page'
import TurnosPage from '../pages/turnos_page'
import MaterialesPage from '../pages/materiales_page'
import HerramientasAdicionalesPage from '../pages/herramientas_adicionales_page'

import NavBar from './nav_bar'
import StatusBanner from './status_banner'

const LayoutContent = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)

  // Cerrar menú al cambiar de sección
  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  // Cerrar menú con Escape
  useEffect(() => {
    if (!menuOpen) return

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [menuOpen])

  return (
    <div className='layout'>

      {/* Fondo oscuro para cerrar menú en móvil */}
      {menuOpen && (
        <button
          type='button'
          className='layout__overlay'
          onClick={closeMenu}
          aria-label='Cerrar menú de navegación'
        />
      )}

      {/* Barra lateral */}
      <NavBar
        isOpen={menuOpen}
        onNavigate={closeMenu}
      />

      <div className='layout__main'>

        {/* Barra superior móvil */}
        <header className='layout__mobile-header'>
          <button
            type='button'
            className='layout__menu-toggle'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls='main-navigation'
          >
            ☰
          </button>

          <span className='layout__mobile-title'>
            FabLab USM
          </span>
        </header>

        <StatusBanner />

        <main className='layout__page'>
          <Routes>
            <Route path='/' element={<PanelPage />} />
            <Route path='/reservas' element={<ReservasPage />} />
            <Route path='/proyectos' element={<ProyectosPage />} />
            <Route path='/maquinas' element={<MaquinasPage />} />
            <Route path='/turnos' element={<TurnosPage />} />
            <Route path='/materiales' element={<MaterialesPage />} />
            <Route
              path='/herramientas-adicionales'
              element={<HerramientasAdicionalesPage />}
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}

const Layout = () => {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <LayoutContent />
      </BrowserRouter>
    </AppStateProvider>
  )
}

export default Layout
