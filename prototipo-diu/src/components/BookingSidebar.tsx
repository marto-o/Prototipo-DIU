interface BookingSidebarProps {
  selectedDate: Date | null;
  selectedMachine: any | null;
  selectedTime: string | null;
}

export default function BookingSidebar({ selectedDate, selectedMachine, selectedTime }: BookingSidebarProps) {
  // Formatear la fecha a texto (Ej: "Miércoles 6, Mar")
  const dateText = selectedDate 
    ? selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' }).replace(',', '')
    : 'No seleccionado';

  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="sticky top-24 bg-surface border border-outline-variant/20 shadow-xl shadow-surface-neutral/50">
        <div className="bg-primary p-4">
          <h3 className="font-headline-md text-headline-md text-on-primary tracking-tight">Resumen</h3>
        </div>
        
        <div className="p-6 flex flex-col gap-6">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-none bg-surface-neutral flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">calendar_today</span>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">FECHA</p>
              <p className="font-body-base text-body-base font-bold text-on-background capitalize">{dateText}</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-none bg-surface-neutral flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">precision_manufacturing</span>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">MÁQUINA</p>
              <p className="font-body-base text-body-base font-bold text-on-background">{selectedMachine ? selectedMachine.title : 'No seleccionada'}</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{selectedMachine ? selectedMachine.type : '-'}</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start pb-6 border-b border-outline-variant/20">
            <div className="w-8 h-8 rounded-none bg-surface-neutral flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">schedule</span>
            </div>
            <div>
              <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">HORARIO</p>
              <p className="font-body-base text-body-base font-bold text-on-background">{selectedTime || 'No seleccionado'}</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <button 
              disabled={!selectedDate || !selectedMachine || !selectedTime}
              className="w-full py-4 bg-primary text-on-primary font-label-caps text-label-caps hover:bg-fab-blue transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CONFIRMAR AGENDAMIENTO
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}