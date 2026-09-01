import Footer from '../components/Footer';

export default function Login() {
  return (
    <div className="bg-surface font-body-base text-body-base text-on-surface min-h-screen flex flex-col antialiased selection:bg-fab-blue selection:text-white">
      {/* Main Content Area con Patrón Geométrico */}
      <main 
        className="flex-grow flex items-center justify-center p-margin-mobile md:p-gutter bg-surface"
        style={{ 
          backgroundImage: 'radial-gradient(#c4c7c7 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }}
      >
        <div className="bg-surface-container-lowest w-full max-w-[480px] p-8 md:p-12 border border-outline-variant/20 rounded-none shadow-none relative">
          
          {/* Accents */}
          <div className="absolute top-0 left-0 w-full h-1 flex">
            <div className="h-full flex-1 bg-fab-red"></div>
            <div className="h-full flex-1 bg-fab-yellow"></div>
            <div className="h-full flex-1 bg-fab-blue"></div>
          </div>
          
          {/* Logo */}
          <div className="flex justify-center mb-10 mt-4">
            <img alt="FabLab USM Logo" className="h-32 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSx4kIZS3uJUu84TVtTIUQvq57WTi1FGLvSXRx9sSJHD7-PUmOt6JybwoZN2OfCW8tvwbekUPPkBxJ170H6A22mgRBqzLVV5e8gx3G3rolk9uvvxRDDYxsg0zJRBFoJHyw3A-3Y3Mt1ZD_gMF3UWZeg8Pbxm4jeaxPN9o3VxWUs7mWyLCsw56Y7OxKyg3SCSdQDmJBS9dY-ypAIgZ9vBQ1EXS7J4ONaFxRo99yUhTPbzcIgKoF29j5jAkazU1-GVeR" />
          </div>

          {/* Login Content */}
          <div className="text-center mb-8">
            <h1 className="font-headline-md text-headline-md text-on-surface mb-2">Bienvenido</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Inicie sesión para acceder a la plataforma</p>
          </div>

          {/* Authentication Form */}
          <form action="#" className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-4">
              <button className="w-full bg-fab-blue text-white font-body-base text-body-base font-bold py-3 px-6 rounded-none flex items-center justify-center gap-2 hover:bg-primary-container transition-colors duration-200" type="submit">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  account_circle
                </span>
                PasaporteUSM
              </button>
              <p className="font-body-sm text-body-sm text-center text-on-surface-variant mt-2">
                Utilice sus credenciales corporativas para continuar.
              </p>
            </div>
          </form>

          {/* Technical Decor */}
          <div className="mt-12 flex justify-between items-center pt-6 border-t border-outline-variant/20">
            <div className="font-label-caps text-label-caps text-outline">SYS_AUTH_V1.0</div>
            <div className="w-2 h-2 bg-fab-blue"></div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}