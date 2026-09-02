import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingSidebar from '../components/BookingSidebar';
import BookingMachineCard from '../components/BookingMachineCard';

// Datos de las máquinas
const MACHINES = [
  {
    id: "m1", type: "IMPRESIÓN 3D", title: "Prusa i3 MK3S+", description: "Filamento PLA/PETG/ABS. Volumen 25x21x21 cm.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC23y-OKiqJ_N4ZQpFagJvifZXZLmMqll32Rarms5GFbkX4xSkl5F33D_40VqgeRhnEJyMe7N1Nf_n_qUOCNtgHwylabH66y_QwWiltNQprVF7TAQ1PFxTPD6gbMZPltZomhiBKW1WCUB4tna_9jtu-AGsmV-mQ8l5e48MkJbgjcTTlAgJ7cuY6yujq0xwvK2pYlZQY-DOBu_KyqTpK_G_eTnwXp2RMWLvLKPgnwwxBuJDSL4EaNM",
    statusLabel: "DISPONIBLE", statusColor: "text-fab-blue", available: true
  },
  {
    id: "m2", type: "CORTE LÁSER", title: "Epilog Zing 24", description: "Corte y grabado de MDF, Acrílico, Cartón. 610x305 mm.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtVhuDc1t7tGnpS0yTEDBth4lblCbMDwsBXcZ9-58yjcMsYNMPeokxV_24g61MVNLWJd73ijil87Fd0ImmyIloHsYyD9-nBqxPRgjtXsFl127R0Xpqfs87UiX4Zt7pKHjEbnQyRr0Yx-nncUgu4is9Nfn_OkW3flW-FL1wdCFKOXIkJuX4IZhJebKVvO3zoSX9SffxN-YiID1kiFTfSGnn2j3oyZ_fxdEXIQMWJSH4SLjf4AWMqZM",
    statusLabel: "DISPONIBLE", statusColor: "text-fab-red", available: true
  },
  {
    id: "m3", type: "CNC ROUTER", title: "ShopBot Desktop", description: "Fresado de madera y plásticos. Área útil 609x457 mm.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgqFALp3AN5pLWQDcf3xFU4imJGJzpCZvCE0QtSqNoMtobrvz3vX7avO8Ikd3emQq5BxgMl1gwTpYXq8fehe8RQGh5otyucfrddn5Kw2pqbFF7HgoHXERixmCsWs1f1KNo6GLLp8p8OY8LU4d8J0nfvfun982DTZXICbPZpnySztI_V875k_j2mhkAvIXvRUTGoAznAOLDk1s9zi6x8qjKRaF4OY59DoGuQ2orcLKnlHetf61CZvI",
    statusLabel: "MANTENCIÓN", statusColor: "text-fab-yellow", icon: "build", available: false
  }
];

// Horarios de prueba
const TIME_SLOTS_MORNING = [
  { id: 't1', label: '09:00 AM', available: true },
  { id: 't2', label: '10:00 AM', available: false },
  { id: 't3', label: '11:00 AM', available: true },
  { id: 't4', label: '12:00 PM', available: true },
];

const TIME_SLOTS_AFTERNOON = [
  { id: 't5', label: '02:00 PM', available: true },
  { id: 't6', label: '03:00 PM', available: true },
  { id: 't7', label: '04:00 PM', available: true },
  { id: 't8', label: '05:00 PM', available: false },
];

export default function Booking() {
  // ESTADOS (Lo que hace dinámico al prototipo)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMachineId, setSelectedMachineId] = useState<string | null>(null);
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(null);

  // Lógica del calendario (Mes actual dinámico)
  const today = new Date();
  const currentMonthName = today.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  
  // Generamos un arreglo con los días del mes actual [1, 2, 3, ... 30/31]
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Encuentra la máquina completa basada en el ID seleccionado para mandarla al Sidebar
  const selectedMachine = MACHINES.find(m => m.id === selectedMachineId);
  // Encuentra el label de la hora
  const selectedTimeLabel = [...TIME_SLOTS_MORNING, ...TIME_SLOTS_AFTERNOON].find(t => t.id === selectedTimeId)?.label || null;

  return (
    <div className="bg-background font-body-base text-body-base text-on-surface min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow w-full bg-background pt-8 pb-12">
        <div className="max-w-container-max mx-auto w-full px-margin-mobile lg:px-gutter">
          
          <div className="mb-12">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mb-4">Agendamiento de Equipamiento</h1>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl">
              Reserva tu espacio de trabajo seleccionando una fecha y la máquina.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-gutter">
            
            <div className="flex-1 flex flex-col gap-12">
              
              {/* PASO 1: CALENDARIO DINÁMICO */}
              <section className="flex flex-col gap-6">
                <div className="flex items-center gap-4 border-b border-outline-variant/20 pb-4">
                  <span className="font-headline-md text-headline-md text-primary">01.</span>
                  <h2 className="font-headline-md text-headline-md text-on-background uppercase tracking-wider">Selecciona el día</h2>
                </div>
                <div className="bg-surface-neutral p-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">{currentMonthName}</span>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'].map(day => (
                      <div key={day} className="font-label-caps text-label-caps text-on-surface-variant mb-2">{day}</div>
                    ))}
                    
                    {/* Renderizamos los días reales del mes */}
                    {daysArray.map((day) => {
                      const dateObj = new Date(today.getFullYear(), today.getMonth(), day);
                      const isPast = dateObj < new Date(today.setHours(0,0,0,0));
                      const isSelected = selectedDate?.getDate() === day;

                      if (isPast) {
                        return <div key={day} className="p-3 text-on-surface-variant opacity-30">{day}</div>;
                      }

                      return (
                        <button 
                          key={day}
                          onClick={() => setSelectedDate(dateObj)}
                          className={`p-3 font-body-base transition-all ${
                            isSelected 
                              ? "border-2 border-primary bg-primary text-on-primary shadow-sm" 
                              : "border border-transparent hover:border-primary/20 text-on-background bg-surface"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* PASO 2: MÁQUINAS DINÁMICAS */}
              <section className="flex flex-col gap-6">
                <div className="flex items-center gap-4 border-b border-outline-variant/20 pb-4">
                  <span className="font-headline-md text-headline-md text-outline-variant">02.</span>
                  <h2 className="font-headline-md text-headline-md text-on-background uppercase tracking-wider">Selecciona la máquina</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {MACHINES.map((machine) => (
                    <BookingMachineCard 
                      key={machine.id}
                      id={machine.id}
                      type={machine.type}
                      title={machine.title}
                      description={machine.description}
                      imageUrl={machine.imageUrl}
                      statusLabel={machine.statusLabel}
                      statusColor={machine.statusColor}
                      icon={machine.icon}
                      isSelected={selectedMachineId === machine.id}
                      onClick={() => machine.available && setSelectedMachineId(machine.id)}
                    />
                  ))}
                </div>
              </section>

              {/* PASO 3: HORARIOS DINÁMICOS */}
              <section className="flex flex-col gap-6">
                <div className="flex items-center gap-4 border-b border-outline-variant/20 pb-4">
                  <span className="font-headline-md text-headline-md text-outline-variant">03.</span>
                  <h2 className="font-headline-md text-headline-md text-on-background uppercase tracking-wider">Horarios disponibles</h2>
                </div>
                <div className="bg-surface-neutral p-6">
                  
                  <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 border-l-2 border-primary pl-2">MAÑANA</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {TIME_SLOTS_MORNING.map(slot => (
                      <button 
                        key={slot.id}
                        disabled={!slot.available}
                        onClick={() => setSelectedTimeId(slot.id)}
                        className={`py-3 px-4 font-body-base text-center transition-colors ${
                          !slot.available 
                            ? "border border-outline-variant/30 bg-surface text-outline-variant line-through opacity-50 cursor-not-allowed"
                            : selectedTimeId === slot.id
                              ? "border-2 border-primary bg-primary text-on-primary font-bold shadow-sm"
                              : "border border-outline-variant/30 bg-surface hover:border-primary hover:text-primary"
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>

                  <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-4 border-l-2 border-fab-blue pl-2">TARDE</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TIME_SLOTS_AFTERNOON.map(slot => (
                      <button 
                        key={slot.id}
                        disabled={!slot.available}
                        onClick={() => setSelectedTimeId(slot.id)}
                        className={`py-3 px-4 font-body-base text-center transition-colors ${
                          !slot.available 
                            ? "border border-outline-variant/30 bg-surface text-outline-variant line-through opacity-50 cursor-not-allowed"
                            : selectedTimeId === slot.id
                              ? "border-2 border-primary bg-primary text-on-primary font-bold shadow-sm"
                              : "border border-outline-variant/30 bg-surface hover:border-primary hover:text-primary"
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>

                </div>
              </section>

            </div>

            {/* Sidebar Conectado al Estado */}
            <BookingSidebar 
              selectedDate={selectedDate}
              selectedMachine={selectedMachine}
              selectedTime={selectedTimeLabel}
            />
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}