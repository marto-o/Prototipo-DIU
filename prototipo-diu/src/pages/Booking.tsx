import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingSidebar from '../components/BookingSidebar';
import BookingMachineCard from '../components/BookingMachineCard';
import SuccessModal from '../components/SuccessModal';

// 1. Datos completos de maquinaria con identificadores claros
const MACHINES = [
  {
    id: "m1",
    type: "IMPRESIÓN 3D",
    title: "Impresora 3D #1 (Prusa MK3S+)",
    description: "Filamento PLA/PETG. Área 25x21x21 cm. Ideal para piezas mecánicas y prototipos rápidos.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC23y-OKiqJ_N4ZQpFagJvifZXZLmMqll32Rarms5GFbkX4xSkl5F33D_40VqgeRhnEJyMe7N1Nf_n_qUOCNtgHwylabH66y_QwWiltNQprVF7TAQ1PFxTPD6gbMZPltZomhiBKW1WCUB4tna_9jtu-AGsmV-mQ8l5e48MkJbgjcTTlAgJ7cuY6yujq0xwvK2pYlZQY-DOBu_KyqTpK_G_eTnwXp2RMWLvLKPgnwwxBuJDSL4EaNM",
    statusLabel: "DISPONIBLE",
    statusColor: "text-fab-blue",
    available: true
  },
  {
    id: "m2",
    type: "CORTE LÁSER",
    title: "Cortadora Láser (Epilog Zing 24)",
    description: "Corte y grabado de MDF, Acrílico, Cartón. Área 610x305 mm. Alta precisión.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtVhuDc1t7tGnpS0yTEDBth4lblCbMDwsBXcZ9-58yjcMsYNMPeokxV_24g61MVNLWJd73ijil87Fd0ImmyIloHsYyD9-nBqxPRgjtXsFl127R0Xpqfs87UiX4Zt7pKHjEbnQyRr0Yx-nncUgu4is9Nfn_OkW3flW-FL1wdCFKOXIkJuX4IZhJebKVvO3zoSX9SffxN-YiID1kiFTfSGnn2j3oyZ_fxdEXIQMWJSH4SLjf4AWMqZM",
    statusLabel: "DISPONIBLE",
    statusColor: "text-fab-red",
    available: true
  },
  {
    id: "m3",
    type: "CNC ROUTER",
    title: "Router CNC (ShopBot Desktop)",
    description: "Fresado de madera terciada y plásticos de ingeniería. Área útil 609x457 mm.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgqFALp3AN5pLWQDcf3xFU4imJGJzpCZvCE0QtSqNoMtobrvz3vX7avO8Ikd3emQq5BxgMl1gwTpYXq8fehe8RQGh5otyucfrddn5Kw2pqbFF7HgoHXERixmCsWs1f1KNo6GLLp8p8OY8LU4d8J0nfvfun982DTZXICbPZpnySztI_V875k_j2mhkAvIXvRUTGoAznAOLDk1s9zi6x8qjKRaF4OY59DoGuQ2orcLKnlHetf61CZvI",
    statusLabel: "MANTENCIÓN",
    statusColor: "text-fab-yellow",
    icon: "build",
    available: false
  }
];

// 2. Disponibilidad dinámica por máquina (simulando casos reales del FabLab)
const MACHINE_SCHEDULES: Record<string, { morning: { id: string; label: string; available: boolean; assignedTo?: string }[]; afternoon: { id: string; label: string; available: boolean; assignedTo?: string }[] }> = {
  m1: {
    // Impresora 3D #1
    morning: [
      { id: 'm1_t1', label: '09:00 AM', available: false, assignedTo: 'Prótesis de mano (Kinesiol.)' },
      { id: 'm1_t2', label: '10:00 AM', available: false, assignedTo: 'Prótesis de mano (Kinesiol.)' },
      { id: 'm1_t3', label: '11:00 AM', available: true },
      { id: 'm1_t4', label: '12:00 PM', available: true }
    ],
    afternoon: [
      { id: 'm1_t5', label: '02:00 PM', available: true },
      { id: 'm1_t6', label: '03:00 PM', available: false, assignedTo: 'Engranajes Mecánica' },
      { id: 'm1_t7', label: '04:00 PM', available: true },
      { id: 'm1_t8', label: '05:00 PM', available: true }
    ]
  },
  m2: {
    // Cortadora Láser (el caso de la Tarea 2 del test: jueves 15:00 ocupada)
    morning: [
      { id: 'm2_t1', label: '09:00 AM', available: true },
      { id: 'm2_t2', label: '10:00 AM', available: false, assignedTo: 'Moldes taller diseño' },
      { id: 'm2_t3', label: '11:00 AM', available: true },
      { id: 'm2_t4', label: '12:00 PM', available: true }
    ],
    afternoon: [
      { id: 'm2_t5', label: '02:00 PM', available: true },
      { id: 'm2_t6', label: '03:00 PM (15:00)', available: false, assignedTo: 'Camila Rojas (Corte Maqueta)' },
      { id: 'm2_t7', label: '04:00 PM', available: true },
      { id: 'm2_t8', label: '05:00 PM', available: false, assignedTo: 'Grabado trofeos Robótica' }
    ]
  },
  m3: {
    // Router CNC (en mantención)
    morning: [
      { id: 'm3_t1', label: '09:00 AM', available: false, assignedTo: 'Fuera de servicio' },
      { id: 'm3_t2', label: '10:00 AM', available: false, assignedTo: 'Fuera de servicio' },
      { id: 'm3_t3', label: '11:00 AM', available: false, assignedTo: 'Fuera de servicio' },
      { id: 'm3_t4', label: '12:00 PM', available: false, assignedTo: 'Fuera de servicio' }
    ],
    afternoon: [
      { id: 'm3_t5', label: '02:00 PM', available: false, assignedTo: 'Fuera de servicio' },
      { id: 'm3_t6', label: '03:00 PM', available: false, assignedTo: 'Fuera de servicio' },
      { id: 'm3_t7', label: '04:00 PM', available: false, assignedTo: 'Fuera de servicio' },
      { id: 'm3_t8', label: '05:00 PM', available: false, assignedTo: 'Fuera de servicio' }
    ]
  }
};

export default function Booking() {
  // Inicializamos por defecto con una fecha válida y la máquina más consultada
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedMachineId, setSelectedMachineId] = useState<string>("m2"); // Cortadora Láser por defecto para facilitar pruebas
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTimeId(null);
  };

  // Información del mes y días
  const currentMonthName = today.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Obtener máquina y horarios activos
  const selectedMachine = MACHINES.find(m => m.id === selectedMachineId) || MACHINES[0];
  const activeSchedule = MACHINE_SCHEDULES[selectedMachine.id] || MACHINE_SCHEDULES.m1;
  const allSlots = [...activeSchedule.morning, ...activeSchedule.afternoon];
  const selectedTimeObj = allSlots.find(t => t.id === selectedTimeId);
  const selectedTimeLabel = selectedTimeObj ? selectedTimeObj.label : null;

  const dateText = selectedDate
    ? selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' }).replace(',', '')
    : '';

  return (
    <div className="bg-background font-body-base text-body-base text-on-surface min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow w-full bg-background pt-8 pb-12">
        <div className="max-w-container-max mx-auto w-full px-margin-mobile lg:px-gutter">
          
          {/* Encabezado */}
          <div className="mb-8">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Hipótesis 2: Anticipar y Comunicar Disponibilidad
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-background mt-3 mb-2">
              Disponibilidad y Reservas Semanales
            </h1>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-2xl">
              Consulta en tiempo real la asignación de cada máquina y bloque horario para coordinar proyectos con anticipación y evitar esperas en el taller.
            </p>
          </div>

          {/* BARRA PERSISTENTE Y DESTACADA DE MÁQUINA ACTIVA (Soluciona el problema de visibilidad de la Entrega 2) */}
          <div className="bg-surface border-2 border-primary/40 rounded-xl p-4 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-primary animate-pulse" />
              <div>
                <span className="text-xs uppercase tracking-wider text-on-surface-variant block">Consultando disponibilidad de:</span>
                <strong className="text-lg md:text-xl text-primary font-bold">{selectedMachine.title}</strong>
              </div>
            </div>

            {/* Selector rápido directo entre máquinas */}
            <div className="flex flex-wrap gap-2">
              {MACHINES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMachineId(m.id);
                    setSelectedTimeId(null); // Reiniciar slot seleccionado al cambiar de máquina
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedMachineId === m.id
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-surface-neutral hover:bg-primary/10 text-on-surface-variant border border-outline-variant/30"
                  }`}
                >
                  {m.title.split('(')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-gutter">
            
            {/* Columna Izquierda: Selección */}
            <div className="flex-1 flex flex-col gap-10">
              
              {/* PASO 1: SELECCIONAR MÁQUINA */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b border-outline-variant/20 pb-3">
                  <span className="font-headline-md text-headline-md text-primary font-bold">01.</span>
                  <h2 className="font-headline-md text-headline-md text-on-background uppercase tracking-wider">
                    Equipamiento del FabLab
                  </h2>
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
                      onClick={() => {
                        setSelectedMachineId(machine.id);
                        setSelectedTimeId(null);
                      }}
                    />
                  ))}
                </div>
              </section>

              {/* PASO 2: DÍA */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b border-outline-variant/20 pb-3">
                  <span className="font-headline-md text-headline-md text-primary font-bold">02.</span>
                  <h2 className="font-headline-md text-headline-md text-on-background uppercase tracking-wider">
                    Fecha de consulta / reserva
                  </h2>
                </div>
                <div className="bg-surface-neutral p-6 rounded-xl border border-outline-variant/30">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label-caps text-label-caps font-bold text-on-surface-variant">{currentMonthName}</span>
                    <span className="text-xs text-on-surface-variant">Lunes a Viernes (08:00 a 18:00)</span>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'].map(day => (
                      <div key={day} className="font-label-caps text-xs text-on-surface-variant mb-2">{day}</div>
                    ))}
                    
                    {daysArray.map((day) => {
                      const dateObj = new Date(today.getFullYear(), today.getMonth(), day);
                      const isPast = dateObj < new Date(new Date().setHours(0,0,0,0));
                      const isSelected = selectedDate?.getDate() === day;

                      if (isPast) {
                        return <div key={day} className="p-3 text-on-surface-variant opacity-25">{day}</div>;
                      }

                      return (
                        <button 
                          key={day}
                          onClick={() => setSelectedDate(dateObj)}
                          className={`p-3 rounded-lg font-body-base transition-all ${
                            isSelected 
                              ? "border-2 border-primary bg-primary text-white font-bold shadow-md" 
                              : "border border-transparent hover:border-primary/40 text-on-background bg-surface"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* PASO 3: HORARIOS CON ESTADO REAL Y ASIGNACIÓN */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                  <div className="flex items-center gap-4">
                    <span className="font-headline-md text-headline-md text-primary font-bold">03.</span>
                    <h2 className="font-headline-md text-headline-md text-on-background uppercase tracking-wider">
                      Horarios ({selectedMachine.title.split('(')[0]})
                    </h2>
                  </div>
                  <span className="text-xs text-on-surface-variant bg-surface px-3 py-1 rounded border border-outline-variant/40">
                    {dateText}
                  </span>
                </div>

                <div className="bg-surface-neutral p-6 rounded-xl border border-outline-variant/30 flex flex-col gap-6">
                  
                  {/* Bloque Mañana */}
                  <div>
                    <h3 className="font-label-caps text-xs font-bold text-on-surface-variant mb-3 border-l-4 border-primary pl-2 uppercase">
                      Bloque Mañana
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {activeSchedule.morning.map(slot => (
                        <button 
                          key={slot.id}
                          disabled={!slot.available}
                          onClick={() => setSelectedTimeId(slot.id)}
                          className={`p-3 rounded-lg text-left transition-all border ${
                            !slot.available 
                              ? "border-outline-variant/20 bg-surface/50 text-outline-variant cursor-not-allowed opacity-75"
                              : selectedTimeId === slot.id
                                ? "border-2 border-primary bg-primary text-white font-bold shadow"
                                : "border-outline-variant/40 bg-surface hover:border-primary text-on-surface"
                          }`}
                        >
                          <div className="text-sm font-bold">{slot.label}</div>
                          <div className={`text-xs mt-1 ${slot.available ? (selectedTimeId === slot.id ? 'text-white/80' : 'text-fab-blue font-semibold') : 'text-red-500'}`}>
                            {slot.available ? '● Disponible' : `Ocupado: ${slot.assignedTo}`}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bloque Tarde */}
                  <div>
                    <h3 className="font-label-caps text-xs font-bold text-on-surface-variant mb-3 border-l-4 border-fab-blue pl-2 uppercase">
                      Bloque Tarde
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {activeSchedule.afternoon.map(slot => (
                        <button 
                          key={slot.id}
                          disabled={!slot.available}
                          onClick={() => setSelectedTimeId(slot.id)}
                          className={`p-3 rounded-lg text-left transition-all border ${
                            !slot.available 
                              ? "border-outline-variant/20 bg-surface/50 text-outline-variant cursor-not-allowed opacity-75"
                              : selectedTimeId === slot.id
                                ? "border-2 border-primary bg-primary text-white font-bold shadow"
                                : "border-outline-variant/40 bg-surface hover:border-primary text-on-surface"
                          }`}
                        >
                          <div className="text-sm font-bold">{slot.label}</div>
                          <div className={`text-xs mt-1 ${slot.available ? (selectedTimeId === slot.id ? 'text-white/80' : 'text-fab-blue font-semibold') : 'text-red-500 font-medium'}`}>
                            {slot.available ? '● Disponible' : `Ocupado: ${slot.assignedTo}`}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </section>

            </div>

            {/* Columna Derecha: Sidebar */}
            <BookingSidebar 
              selectedDate={selectedDate}
              selectedMachine={selectedMachine}
              selectedTime={selectedTimeLabel}
              onConfirmClick={() => setIsModalOpen(true)}
            />
            
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal de confirmación */}
      <SuccessModal 
        isOpen={isModalOpen}
        dateText={dateText}
        machineTitle={selectedMachine.title}
        timeLabel={selectedTimeLabel || ''}
        onClose={handleCloseModal}
      />
    </div>
  );
}