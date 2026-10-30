import React from 'react'
import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Panel de disponibilidad' },
  { to: '/reservas', label: 'Reservas semanales' },
  { to: '/proyectos', label: 'Cola y traspaso de turno' },
  { to: '/maquinas', label: 'Estado de máquinas' },
  { to: '/turnos', label: 'Turnos de ayudantes' },
  { to: '/materiales', label: 'Materiales y stock' }
]

export const NavBar = () => {
  const navLinkClass = ({ isActive }) => {
    const classes = ['nav-bar__link']
    if (isActive) classes.push('nav-bar__link--active')
    return classes.join(' ')
  }
  return (
    <nav className='nav-bar'>
      <div className='nav-bar__brand'>
        <span className='nav-bar__brand-name'>FabLab USM</span>
        <span className='nav-bar__brand-sub'>Gestión de flujo de trabajo</span>
      </div>
      {LINKS.map(link => (
        <NavLink key={link.to} className={navLinkClass} to={link.to} end>
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default NavBar
