
import React from 'react'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/', label: 'Panel de disponibilidad', end: true },
  { path: '/reservas', label: 'Reservas semanales' },
  { path: '/proyectos', label: 'Cola de proyectos' },
  { path: '/maquinas', label: 'Máquinas' },
  { path: '/turnos', label: 'Turnos de ayudantes' },
  { path: '/materiales', label: 'Materiales y stock' },
  {
    path: '/herramientas-adicionales',
    label: 'Herramientas adicionales'
  }
]

const NavBar = ({ isOpen = false, onNavigate = () => {} }) => {
  return (
    <nav
      id='main-navigation'
      className={`nav-bar ${isOpen ? 'nav-bar--open' : ''}`}
      aria-label='Navegación principal'
    >
      <div className='nav-bar__brand'>
        <span className='nav-bar__brand-name'>
          FabLab USM
        </span>
        <span className='nav-bar__brand-sub'>
          Sistema de gestión
        </span>
      </div>

      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `nav-bar__link ${
              isActive ? 'nav-bar__link--active' : ''
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default NavBar
