import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-outline-variant/20">
      {/* <video autoPlay className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale pointer-events-none z-0" loop muted playsInline>
         <source src="/assets/video/hero-bg.mp4" type="video/mp4" />
      </video> */}
      <div className="absolute inset-0 bg-surface/80 z-0"></div>
      <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-gutter text-center py-section-gap">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-surface-neutral border border-outline-variant/30 mb-6">
          <span className="w-2 h-2 bg-fab-blue rounded-none"></span>
          <span className="font-label-caps text-label-caps text-ink-dark uppercase tracking-widest">Innovación Abierta</span>
        </div>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-ink-dark mb-6 max-w-4xl mx-auto leading-tight">
          Fabricación Digital y Prototipado para el <span className="text-fab-red">Futuro</span>.
        </h1>
        <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl mx-auto mb-10 text-lg">
          El FabLab USM es un espacio de creación e innovación tecnológica abierto a la comunidad académica y estudiantil, equipado con herramientas de fabricación digital de vanguardia.
        </p>
        <div className="bg-ink-dark p-8 border border-outline-variant/20 text-on-primary flex flex-col md:flex-row items-center justify-between gap-6 mt-12 max-w-4xl mx-auto text-left">
          <div>
            <h4 className="font-headline-md text-headline-md mb-2">¿Tienes una idea?</h4>
            <p className="text-inverse-primary/80">Ven a materializarla en nuestro laboratorio.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            
            {/* 2. Añadimos el evento onClick al botón */}
            <button 
              onClick={() => navigate('/login')}
              className="bg-transparent border border-on-primary px-6 py-2 hover:bg-on-primary hover:text-ink-dark transition-colors font-label-caps text-label-caps uppercase"
            >
              Agendar Visita
            </button>
            
            <span className="text-[10px] text-inverse-primary/60 uppercase tracking-wider">Se requiere iniciar sesión con cuenta institucional UTFSM.</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 flex z-20">
        <div className="h-full bg-fab-red flex-1"></div>
        <div className="h-full bg-fab-yellow flex-1"></div>
        <div className="h-full bg-fab-blue flex-1"></div>
      </div>
    </section>
  );
}