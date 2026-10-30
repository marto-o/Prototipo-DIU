
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingMachineCard from '../components/BookingMachineCard';

// Datos iniciales de las máquinas
const MACHINES = [
  {
    id: 1,
    title: "Prusa i3 MK3S+",
    type: "Impresión 3D",
    description: "Impresora FDM de alta fiabilidad para prototipado rápido en PLA, PETG y ABS.",
    status: "Disponible",
    statusColor: "text-fab-blue",
    available: true,
    icon: "",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-XEBl57w-rBTUjZr0qREsDNKeZzWVSFs8kegcEr9-pledFlGEJRqcOOhxFnip_gz4THaFb2jgC4by_bYAPAWCwsmKODIMSkYs2wPKIaUiz_Zvu-GinX0KXenKh52Kqzv1Xq9t2L6CyKVEmfNnR4m6X5Mh3F0BGDKsjesfZQnmpsc-5yKItvkB82UBnOEZ2p6TmkdFwJzLDRSmAYhtYkKBu0p3fRnN4krjz4dzT3O-g53z4KNKx7I"
  },
  {
    id: 2,
    title: "Epilog Zing 24",
    type: "Corte Láser",
    description: "Grabado y corte de precisión en madera, acrílico y cartón con área de trabajo de 600x300mm.",
    status: "Mantenimiento",
    statusColor: "text-fab-yellow",
    available: false,
    icon: "build",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkpMENLatYVFFj-SEWsds9hJS4xAxjxd0WeVjg3RuZ4IIK54woXfn72bvSxo14_sdRZS4TC8V4GYMa75WHh4a59z1pOekrzWlAk1OFfnaMv80q2nuEOH_nUAnlMpmia4LAOJtpdaf39jkZ2SdnFeV88bVjpChGkEMg0oB2KMIhVM_J2U3vFxtP5Q4WSlkUkIvJg6CKuWXikOidEUvM5CMOdnj7M80-UyVivi8WDlTXxpR-GB17L3s"
  },
  {
    id: 3,
    title: "ShopBot Desktop",
    type: "Mecanizado CNC",
    description: "Fresadora CNC de escritorio para desbaste y acabado en maderas y plásticos blandos.",
    status: "Disponible",
    statusColor: "text-fab-blue",
    available: true,
    icon: "",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYKbAqqhU5PtDHnnngk7B88mPT_egTh67RUaqE-ZZh7nzI38iIkufwwwOCHhRz1-AirWRzyNg5j0GZBWJ-7tw-MAgK77aNWrSVvP6e1Dq3zzSUiVUod5ZiUk3yELCKeDfHXfMjFqu1IRVJKvaw2UOnRCKb0i75iUhveBeE6FeeeZujYDafF2q_WxyMQTV5_IO0K2-AvL9JvQEJiJd0jFpz5FTl7-Dwpq2RlfwtDCAckuyW8Aid_is"
  }
];

export default function CambiarEstadoMaquinas() {

  // Estado de las máquinas
  const [machines, setMachines] = useState(MACHINES);

  // Función para cambiar el estado de una máquina
  const cambiarEstado = (id: number) => {

    setMachines(prevMachines =>
      prevMachines.map(machine => {

        if (machine.id === id) {

          const nuevoEstado = !machine.available;

          return {
            ...machine,
            available: nuevoEstado,
            status: nuevoEstado
              ? "Disponible"
              : "Mantenimiento",
            statusColor: nuevoEstado
              ? "text-fab-blue"
              : "text-fab-yellow",
            icon: nuevoEstado ? "" : "build"
          };
        }

        return machine;
      })
    );
  };

  return (
    <div className="bg-background font-body-base text-on-surface min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-grow w-full bg-background pt-8 pb-12">

        <div className="max-w-container-max mx-auto w-full px-margin-mobile lg:px-gutter">

          {/* Título */}
          <div className="mb-10">

            <h1 className="font-display-lg text-display-lg text-primary mb-4">
              Gestión de Equipamiento
            </h1>
          </div>

          {/* Selección de máquinas */}
          <section className="flex flex-col gap-6">

            <div className="flex items-center gap-4 border-b border-outline-variant/20 pb-4">

              <span className="font-headline-md text-primary">
                01.
              </span>

              <h2 className="font-headline-md text-on-background uppercase tracking-wider">
                Selecciona la máquina para modificar su estado
              </h2>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {machines.map(machine => (

                <BookingMachineCard
                  key={machine.id}
                  id={String(machine.id)}
                  type={machine.type}
                  title={machine.title}
                  description={machine.description}
                  imageUrl={machine.imageUrl}
                  statusLabel={machine.status}
                  statusColor={machine.statusColor}
                  icon={machine.icon}
                  isSelected={false}
                  onClick={() => cambiarEstado(machine.id)}
                />

              ))}

            </div>

          </section>

        </div>

      </main>

      <Footer />

    </div>
  );
}
