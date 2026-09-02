import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-background font-body-base text-body-base text-on-surface min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow w-full pt-8 bg-background">
        <div className="flex flex-col w-full">
          
          {/* Top Profile Banner */}
          <section className="w-full bg-surface-container py-12 px-margin-mobile lg:px-gutter border-b border-outline-variant/10">
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 bg-primary-container overflow-hidden rounded-full flex items-center justify-center text-on-primary font-display-lg text-[28px]">
                  SG
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-fab-blue rounded-full border-2 border-surface-container" title="Activo"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-label-caps font-label-caps text-on-surface-variant mb-1">PANEL DE USUARIO // FABLAB USM</span>
                  <h1 className="font-display-lg text-display-lg text-primary tracking-tight">Hola, Sebastián González</h1>
                  <p className="text-body-base font-body-base text-on-surface-variant mt-1">PasaporteUSM ID: <span className="text-primary font-bold">202173502-K</span> • Ingeniería Civil Informática</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/reserva')}
                  className="bg-primary text-on-primary px-6 py-3 text-label-caps font-label-caps hover:bg-fab-blue transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  Nueva Reserva
                </button>
              </div>
            </div>
          </section>

          {/* Main Dashboard Grid */}
          <section className="max-w-[1280px] w-full mx-auto px-margin-mobile lg:px-gutter py-section-gap">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                
                {/* Próxima Reserva Card */}
                <div className="bg-surface-container-lowest p-8 border border-outline-variant/20 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-fab-blue"></div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-outline-variant/10">
                    <div>
                      <span className="text-label-caps font-label-caps text-fab-blue mb-1 block">PRÓXIMA RESERVA CONFIRMADA</span>
                      <h2 className="font-headline-md text-headline-md text-primary">Epilog Zing 24 - Corte Láser</h2>
                    </div>
                    <div className="bg-secondary-fixed/55 text-on-secondary-fixed px-3 py-1.5 text-label-caps font-label-caps flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-fab-blue inline-block"></span>
                      Horario Confirmado
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-fab-blue text-[24px]">calendar_today</span>
                      <div>
                        <span className="text-label-caps font-label-caps text-on-surface-variant block">FECHA</span>
                        <span className="text-body-base font-body-base font-bold text-primary">Miércoles 6 de Marzo</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-fab-blue text-[24px]">schedule</span>
                      <div>
                        <span className="text-label-caps font-label-caps text-on-surface-variant block">HORARIO BLOQUEADO</span>
                        <span className="text-body-base font-body-base font-bold text-primary">11:00 AM - 12:00 PM</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-fab-blue text-[24px]">location_on</span>
                      <div>
                        <span className="text-label-caps font-label-caps text-on-surface-variant block">UBICACIÓN</span>
                        <span className="text-body-base font-body-base font-bold text-primary">Sala Láser - Campus Viña</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-outline-variant/10">
                    <div className="flex items-center gap-3">
                      <button className="border border-outline-variant/40 text-primary px-4 py-2 text-label-caps font-label-caps hover:bg-surface-neutral transition-colors">
                        Ver Detalles
                      </button>
                      <button className="border border-fab-red/40 text-fab-red px-4 py-2 text-label-caps font-label-caps hover:bg-error-container/20 transition-colors">
                        Cancelar Reserva
                      </button>
                    </div>
                  </div>
                </div>

                {/* Historial de Reservas Recientes */}
                <div className="bg-surface-container-lowest p-8 border border-outline-variant/20 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-headline-md text-headline-md text-primary">Historial Reciente</h3>
                    <a className="text-label-caps font-label-caps text-fab-blue hover:underline" href="#">Ver todo</a>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 bg-surface-neutral/60 border border-outline-variant/10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">print</span>
                        </div>
                        <div>
                          <h4 className="font-body-base font-bold text-primary">Impresora Prusa i3 MK3S+ (3D)</h4>
                          <span className="text-body-sm font-body-sm text-on-surface-variant">28 de Febrero, 14:00 - 17:00</span>
                        </div>
                      </div>
                      <span className="text-label-caps font-label-caps text-on-tertiary-fixed-variant bg-surface-container px-2.5 py-1">Completado</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-surface-neutral/60 border border-outline-variant/10">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined">design_services</span>
                        </div>
                        <div>
                          <h4 className="font-body-base font-bold text-primary">Tormach CNC 1100M</h4>
                          <span className="text-body-sm font-body-sm text-on-surface-variant">15 de Febrero, 10:00 - 12:00</span>
                        </div>
                      </div>
                      <span className="text-label-caps font-label-caps text-on-tertiary-fixed-variant bg-surface-container px-2.5 py-1">Completado</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Cuota de Materiales */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="bg-surface-container-lowest p-8 border border-outline-variant/20 shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-label-caps font-label-caps text-on-surface-variant block mb-1">CONSUMO MENSUAL</span>
                      <h3 className="font-headline-md text-headline-md text-primary">Cuota de Materiales</h3>
                    </div>
                    <span className="material-symbols-outlined text-fab-yellow text-[28px]">token</span>
                  </div>
                  <div className="bg-surface-neutral p-6 mb-6 border border-outline-variant/10">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-label-caps font-label-caps text-on-surface-variant">Filamento PLA / ABS</span>
                      <span className="font-headline-md text-headline-md text-primary">65g <span className="text-body-sm font-body-sm text-on-surface-variant font-normal">disponibles</span></span>
                    </div>
                    <div className="w-full h-3 bg-surface-container-highest overflow-hidden mb-3">
                      <div className="bg-primary h-full transition-all duration-500" style={{ width: '35%' }}></div>
                    </div>
                    <div className="flex justify-between text-body-sm font-body-sm text-on-surface-variant">
                      <span>Usado: 35g</span>
                      <span>Total: 100g / mes</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}