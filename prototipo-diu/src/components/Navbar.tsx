import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-tertiary dark:bg-primary text-primary dark:text-on-primary font-body-base text-body-base w-full top-0 sticky z-50 border-b border-outline-variant/20">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
        
        {/* Logo que redirige al inicio */}
        <button onClick={() => navigate('/')} className="font-headline-md text-headline-md font-bold text-primary dark:text-on-primary flex items-center gap-2">
          <img alt="FabLab USM Logo" className="h-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAipbX7MjK5CnnqbMaKtQgpxpeu-QJAGkKUBZu9bJxur4GBZaFSSKV-BNzlHw8E0yO9Q6Osy381PhQuvUwUivI9W0l5DnBeJo7HcVPNkAtVDoJnb83OJ4UrquRr9NzRRQfGpk1u9lKxFoTjkHftaTz1YHWia5Hh1awf-N22En9-Z1PZURfBvWl3kpJ1Rw9yJ3MBvepUKzr_sGSJCwtNwthm8mJdHavNiS_Yj2z2ZPLWK7mioJpmuFkCd8zG0iD4jwpf" />
          <span className="sr-only">FabLab USM</span>
        </button>

        <div className="flex items-center gap-4">
          <button className="hidden md:block bg-primary-container text-on-primary rounded-none px-6 py-2 hover:bg-fab-blue transition-colors duration-300 font-label-caps text-label-caps uppercase tracking-wider">
            Contáctanos
          </button>
          
          {/* BOTÓN DE PERFIL DE USUARIO INVERTIDO */}
          <button 
            onClick={() => navigate('/perfil')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-fab-blue shadow-sm border border-outline-variant/20"
            aria-label="Perfil de usuario"
          >
            <span className="material-symbols-outlined text-ink-dark text-[20px]">person</span>
          </button>

          {/* Menú hamburguesa para celulares */}
          <button className="md:hidden p-2 text-primary dark:text-on-primary">
            <span className="material-symbols-outlined" data-icon="menu">menu</span>
          </button>
        </div>

      </div>
    </nav>
  );
}