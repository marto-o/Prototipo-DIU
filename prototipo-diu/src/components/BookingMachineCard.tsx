interface BookingMachineCardProps {
  id: string;
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  statusLabel: string;
  statusColor: string;
  isSelected?: boolean;
  icon?: string;
  onClick: () => void;
}

export default function BookingMachineCard({ type, title, description, imageUrl, statusLabel, statusColor, isSelected, icon = "arrow_forward", onClick }: BookingMachineCardProps) {
  return (
    <button 
      onClick={onClick}
      className={`group text-left flex flex-col h-full relative overflow-hidden focus:outline-none transition-all ${
      isSelected 
        ? "bg-surface border-2 border-primary shadow-md" 
        : "bg-surface border border-outline-variant/30 hover:border-primary focus:ring-2 focus:ring-fab-blue"
    }`}>
      
      {!isSelected && <div className="absolute inset-0 bg-gradient-to-br from-transparent to-surface-neutral opacity-50"></div>}
      
      {isSelected && (
        <>
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
          <div className="absolute top-0 right-0 bg-primary text-on-primary p-1 z-20">
            <span className="material-symbols-outlined text-[16px] block">check</span>
          </div>
        </>
      )}

      <div className={`h-32 w-full flex items-center justify-center p-4 border-b border-outline-variant/10 ${isSelected ? 'bg-surface' : 'bg-surface-neutral'}`}>
        <img className="w-full h-full object-contain mix-blend-multiply" alt={title} src={imageUrl} />
      </div>
      
      <div className="p-4 z-10 flex-grow">
        <span className={`font-label-caps text-label-caps block mb-2 ${statusColor}`}>{type}</span>
        <h3 className="font-body-base text-body-base font-bold text-on-background mb-1">{title}</h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{description}</p>
      </div>
      
      <div className="mt-auto p-4 pt-0 z-10 flex items-center justify-between">
        <span className={`font-label-caps text-label-caps ${isSelected ? 'text-primary' : statusColor}`}>
          {statusLabel}
        </span>
        {!isSelected && (
          <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">
            {icon}
          </span>
        )}
      </div>
    </button>
  );
}