export default function Footer() {
  return (
    <footer className="bg-tertiary dark:bg-tertiary-container text-on-tertiary-fixed dark:text-on-tertiary-container font-body-sm text-body-sm w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-gutter py-section-gap max-w-container-max mx-auto">
        <div className="md:col-span-1">
          <a className="font-label-caps text-label-caps text-on-tertiary-fixed block mb-6" href="#">
            <img alt="FabLab USM Logo" className="h-12 brightness-0 invert opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgcfcVQYwhUA1touy0X0ANEBJVOtnQOSWZyE3m1oTyT2ICwLMdlAHP1KpT6UrVAQvg5LZK14fVASLO-uiMl6K4BdjfsxvBWmQTwT15-YJAZhGf7q5TCi8VAZGVz5UYviO9stqCieApEmgvMsFOezqWYO_HyvFuDwcgSQdM1b9O59ljZUkW9cmmeuC-8_0bI87pbN4pjMdjocLUxgZ4jnsFs5Zj8EBFfu7Q0NA5csmhxAnOr7tXqHeBX5iYMkVzi5lH" />
          </a>
          <p className="text-on-tertiary-container mb-6 max-w-xs">
            Laboratorio de Fabricación Digital.<br />
            Universidad Técnica Federico Santa María.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-1 bg-fab-red"></div>
            <div className="w-8 h-1 bg-fab-yellow"></div>
            <div className="w-8 h-1 bg-fab-blue"></div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-on-tertiary font-bold mb-2">Explorar</h4>
          <a className="text-on-tertiary-container hover:text-secondary-fixed-dim transition-colors opacity-100 hover:opacity-80" href="#">Equipamiento</a>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-on-tertiary font-bold mb-2">Contacto</h4>
          <a className="text-on-tertiary-container hover:text-secondary-fixed-dim transition-colors opacity-100 hover:opacity-80" href="#">Contacto</a>
          <span className="text-on-tertiary-container mt-2">Av. Federico Sta. María 6090,<br />Viña del Mar, Chile</span>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-on-tertiary font-bold mb-2">Síguenos</h4>
          <div className="flex flex-wrap gap-4">
            <a className="text-on-tertiary-container hover:text-secondary-fixed-dim transition-colors opacity-100 hover:opacity-80" href="https://www.instagram.com/fablab_usm/">Instagram</a>
          </div>
        </div>
        <div className="col-span-1 md:col-span-4 mt-12 pt-8 border-t border-outline-variant/10 text-on-tertiary-container text-xs">
          © 2026 FabLab USM - Universidad Técnica Federico Santa María. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}