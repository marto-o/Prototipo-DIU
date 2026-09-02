interface SuccessModalProps {
  isOpen: boolean;
  dateText: string;
  machineTitle: string;
  timeLabel: string;
  onClose: () => void; // NUEVA PROPIEDAD
}

export default function SuccessModal({ isOpen, dateText, machineTitle, timeLabel, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-surface border border-outline-variant/20 shadow-2xl max-w-md w-full mx-4 p-8 transform scale-100 transition-transform duration-300 flex flex-col items-center text-center">
        
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
          <span className="material-symbols-outlined text-[36px]">check_circle</span>
        </div>
        
        <h3 className="font-headline-md text-headline-md text-on-background mb-2">¡Agendamiento Exitoso!</h3>
        <p className="font-body-base text-body-base text-on-surface-variant mb-6">El horario fue agendado correctamente</p>
        
        <div className="w-full bg-surface-neutral p-4 mb-6 text-left flex flex-col gap-2 border border-outline-variant/10">
          <div className="flex justify-between text-body-sm">
            <span className="text-on-surface-variant">Fecha:</span>
            <span className="font-bold text-on-background capitalize">{dateText}</span>
          </div>
          <div className="flex justify-between text-body-sm">
            <span className="text-on-surface-variant">Máquina:</span>
            <span className="font-bold text-on-background">{machineTitle}</span>
          </div>
          <div className="flex justify-between text-body-sm">
            <span className="text-on-surface-variant">Horario:</span>
            <span className="font-bold text-on-background">{timeLabel}</span>
          </div>
        </div>
        
        <div className="flex flex-col w-full gap-3">
          <button 
            onClick={onClose} // CIERRA EL MODAL
            className="w-full py-3 bg-primary text-on-primary font-label-caps text-label-caps hover:bg-fab-blue transition-colors flex items-center justify-center gap-2"
          >
            VOLVER
          </button>
        </div>

      </div>
    </div>
  );
}