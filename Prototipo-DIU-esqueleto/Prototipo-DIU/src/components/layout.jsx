import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AppStateProvider } from '../state/app_state'

import PanelPage from '../pages/panel_page'
import ReservasPage from '../pages/reservas_page'
import ProyectosPage from '../pages/proyectos_page'
import MaquinasPage from '../pages/maquinas_page'
import TurnosPage from '../pages/turnos_page'
import MaterialesPage from '../pages/materiales_page'

import NavBar from './nav_bar'
import StatusBanner from './status_banner'

const Layout = () => {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <div className='layout'>
          <NavBar />
          <main className='layout__main'>
            <StatusBanner />
            <div className='layout__page'>
              <Routes>
                <Route path='/' element={<PanelPage />} />
                <Route path='/reservas' element={<ReservasPage />} />
                <Route path='/proyectos' element={<ProyectosPage />} />
                <Route path='/maquinas' element={<MaquinasPage />} />
                <Route path='/turnos' element={<TurnosPage />} />
                <Route path='/materiales' element={<MaterialesPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </AppStateProvider>
  )
}

export default Layout
