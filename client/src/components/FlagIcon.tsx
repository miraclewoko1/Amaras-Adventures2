interface FlagIconProps {
  country: 'us' | 'kr';
  className?: string;
}

export function FlagIcon({ country, className = "" }: FlagIconProps) {
  if (country === 'us') {
    return (
      <svg viewBox="0 0 24 16" className={`w-6 h-4 ${className}`} aria-label="US Flag">
        <rect width="24" height="16" fill="#B22234" />
        <rect y="1.23" width="24" height="1.23" fill="white" />
        <rect y="3.69" width="24" height="1.23" fill="white" />
        <rect y="6.15" width="24" height="1.23" fill="white" />
        <rect y="8.62" width="24" height="1.23" fill="white" />
        <rect y="11.08" width="24" height="1.23" fill="white" />
        <rect y="13.54" width="24" height="1.23" fill="white" />
        <rect width="9.6" height="8.62" fill="#3C3B6E" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 16" className={`w-6 h-4 ${className}`} aria-label="Korean Flag">
      <rect width="24" height="16" fill="white" stroke="#e5e5e5" strokeWidth="0.5" />
      <circle cx="12" cy="8" r="3.5" fill="#C60C30" />
      <path d="M12 4.5 C14.5 6 14.5 10 12 11.5 C9.5 10 9.5 6 12 4.5" fill="#003478" />
      <g stroke="#000" strokeWidth="0.6">
        <line x1="3" y1="3" x2="5.5" y2="5" />
        <line x1="3" y1="4.2" x2="5.5" y2="6.2" />
        <line x1="3" y1="5.4" x2="5.5" y2="7.4" />
        <line x1="18.5" y1="8.6" x2="21" y2="10.6" />
        <line x1="18.5" y1="9.8" x2="21" y2="11.8" />
        <line x1="18.5" y1="11" x2="21" y2="13" />
        <line x1="18.5" y1="3" x2="21" y2="5" />
        <line x1="18.5" y1="4.2" x2="21" y2="6.2" />
        <line x1="3" y1="11" x2="5.5" y2="13" />
        <line x1="3" y1="9.8" x2="5.5" y2="11.8" />
      </g>
    </svg>
  );
}
