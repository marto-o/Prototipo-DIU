export default function MissionSection() {
  return (
    <section className="py-section-gap max-w-container-max mx-auto px-margin-mobile md:px-gutter">
      <div className="mb-12">
        <h2 className="font-headline-md text-headline-md text-ink-dark mb-4">Nuestra Misión</h2>
        <div className="w-16 h-1 bg-fab-yellow"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-surface-neutral p-8 border border-outline-variant/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed-dim/20 -mr-16 -mt-16 rounded-full transition-transform duration-700 group-hover:scale-150"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-fab-red text-4xl mb-6" data-icon="lightbulb" data-weight="fill">lightbulb</span>
              <h3 className="font-headline-md text-headline-md text-ink-dark mb-4">Democratizar la Innovación</h3>
              <p className="text-on-surface-variant font-body-base text-body-base max-w-lg">
                Facilitamos el acceso a tecnologías de fabricación digital para fomentar la creatividad, el emprendimiento y el desarrollo de soluciones tecnológicas de alto impacto.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-surface-neutral p-8 border border-outline-variant/20 flex flex-col justify-center">
          <span className="material-symbols-outlined text-fab-blue text-3xl mb-4" data-icon="architecture" data-weight="fill">architecture</span>
          <h4 className="font-label-caps text-label-caps text-ink-dark uppercase mb-2">Diseño Paramétrico</h4>
          <p className="text-on-surface-variant text-sm">Herramientas avanzadas para modelado complejo.</p>
        </div>
        <div className="bg-surface-neutral p-8 border border-outline-variant/20 flex flex-col justify-center">
          <span className="material-symbols-outlined text-fab-yellow text-3xl mb-4" data-icon="precision_manufacturing" data-weight="fill">precision_manufacturing</span>
          <h4 className="font-label-caps text-label-caps text-ink-dark uppercase mb-2">Precisión Técnica</h4>
          <p className="text-on-surface-variant text-sm">Estándares industriales en cada prototipo.</p>
        </div>
      </div>
    </section>
  );
}