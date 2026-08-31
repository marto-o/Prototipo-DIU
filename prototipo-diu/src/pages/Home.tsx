import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MissionSection from '../components/MissionSection';
import EquipmentCard from '../components/EquipmentCard';
import Footer from '../components/Footer';

export default function Home() {
  const machines = [
    {
      id: 1,
      title: "Prusa i3 MK3S+",
      type: "Impresión 3D",
      description: "Impresora FDM de alta fiabilidad para prototipado rápido en PLA, PETG y ABS.",
      status: "Activo",
      statusColor: "bg-fab-blue",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-XEBl57w-rBTUjZr0qREsDNKeZzWVSFs8kegcEr9-pledFlGEJRqcOOhxFnip_gz4THaFb2jgC4by_bYAPAWCwsmKODIMSkYs2wPKIaUiz_Zvu-GinX0KXenKh52Kqzv1Xq9t2L6CyKVEmfNnR4m6X5Mh3F0BGDKsjesfZQnmpsc-5yKItvkB82UBnOEZ2p6TmkdFwJzLDRSmAYhtYkKBu0p3fRnN4krjz4dzT3O-g53z4KNKx7I"
    },
    {
      id: 2,
      title: "Epilog Zing 24",
      type: "Corte Láser",
      description: "Grabado y corte de precisión en madera, acrílico y cartón con área de trabajo de 600x300mm.",
      status: "Mantenimiento",
      statusColor: "bg-fab-yellow",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkpMENLatYVFFj-SEWsds9hJS4xAxjxd0WeVjg3RuZ4IIK54woXfn72bvSxo14_sdRZS4TC8V4GYMa75WHh4a59z1pOekrzWlAk1OFfnaMv80q2nuEOH_nUAnlMpmia4LAOJtpdaf39jkZ2SdnFeV88bVjpChGkEMg0oB2KMIhVM_J2U3vFxtP5Q4WSlkUkIvJg6CKuWXikOidEUvM5CMOdnj7M80-UyVivi8WDlTXxpR-GB17L3s"
    },
    {
      id: 3,
      title: "ShopBot Desktop",
      type: "Mecanizado CNC",
      description: "Fresadora CNC de escritorio para desbaste y acabado en maderas y plásticos blandos.",
      status: "Activo",
      statusColor: "bg-fab-blue",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYKbAqqhU5PtDHnnngk7B88mPT_egTh67RUaqE-ZZh7nzI38iIkufwwwOCHhRz1-AirWRzyNg5j0GZBWJ-7tw-MAgK77aNWrSVvP6e1Dq3zzSUiVUod5ZiUk3yELCKeDfHXfMjFqu1IRVJKvaw2UOnRCKb0i75iUhveBeE6FeeeZujYDafF2q_WxyMQTV5_IO0K2-AvL9JvQEJiJd0jFpz5FTl7-Dwpq2RlfwtDCAckuyW8Aid_is"
    }
  ];

  return (
    <div className="bg-surface font-body-base text-on-surface antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <MissionSection />
        <section className="py-section-gap bg-surface-neutral border-y border-outline-variant/20">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="font-headline-md text-headline-md text-ink-dark mb-4">Laboratorios y Equipamiento</h2>
                <div className="w-16 h-1 bg-fab-blue"></div>
              </div>
              <a className="text-fab-blue hover:text-ink-dark transition-colors font-label-caps text-label-caps uppercase flex items-center gap-1 group" href="#">
                Ver todo el inventario 
                <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1" data-icon="arrow_forward">arrow_forward</span>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {machines.map((machine) => (
                <EquipmentCard 
                  key={machine.id}
                  title={machine.title}
                  type={machine.type}
                  description={machine.description}
                  status={machine.status}
                  statusColor={machine.statusColor}
                  imageUrl={machine.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}