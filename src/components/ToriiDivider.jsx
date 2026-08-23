export default function ToriiDivider({ tone = 'ink' }) {
  const stroke = tone === 'lime' ? '#D6FA2B' : '#16160F'
  return (
    <div className="torii-divider" aria-hidden="true">
      <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
        <line x1="8" y1="6" x2="112" y2="6" stroke={stroke} strokeWidth="2" />
        <line x1="16" y1="0" x2="16" y2="14" stroke={stroke} strokeWidth="2" />
        <line x1="104" y1="0" x2="104" y2="14" stroke={stroke} strokeWidth="2" />
        <line x1="30" y1="14" x2="90" y2="14" stroke={stroke} strokeWidth="1.5" />
        <line x1="26" y1="14" x2="26" y2="38" stroke={stroke} strokeWidth="2" />
        <line x1="94" y1="14" x2="94" y2="38" stroke={stroke} strokeWidth="2" />
        <circle cx="60" cy="26" r="2.5" fill={stroke} />
      </svg>
    </div>
  )
}
