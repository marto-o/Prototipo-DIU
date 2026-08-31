interface EquipmentCardProps {
  title: string;
  type: string;
  description: string;
  status: string;
  statusColor: string;
  imageUrl: string;
}

export default function EquipmentCard({ title, type, description, status, statusColor, imageUrl }: EquipmentCardProps) {
  return (
    <div className="bg-surface border border-outline-variant/30 hover:border-fab-blue/50 transition-colors group">
      <div 
        className="h-48 bg-surface-container-high relative overflow-hidden bg-cover bg-center" 
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute top-4 left-4 bg-primary-container text-on-primary px-2 py-1 font-label-caps text-label-caps text-[10px] uppercase tracking-wider flex items-center gap-1">
          <span className={`w-1.5 h-1.5 ${statusColor} rounded-none inline-block`}></span> 
          {status}
        </div>
      </div>
      <div className="p-6">
        <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest block mb-2">{type}</span>
        <h3 className="font-headline-md text-headline-md text-ink-dark text-lg mb-2">{title}</h3>
        <p className="text-sm text-on-surface-variant mb-4 line-clamp-2">{description}</p>
        <a className="text-ink-dark hover:text-fab-blue text-sm font-bold flex items-center gap-1 underline decoration-outline-variant/50 underline-offset-4 hover:decoration-fab-blue" href="#">
          Ver especificaciones <span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
        </a>
      </div>
    </div>
  );
}