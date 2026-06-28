// Faint gold geometric pattern accent for the bottom of cards.
// Uses the same transparent gold motif as the hero strip, rendered at its
// natural (square) proportion so it isn't distorted.
// Parent must be `relative overflow-hidden` and leave bottom padding so the
// pattern sits clear of the text.
export default function CardPattern({ className = '' }) {
  return (
    <div
      className={`absolute inset-x-0 bottom-0 h-12 opacity-60 pointer-events-none ${className}`}
      style={{
        backgroundImage: 'url(/hero/pattern-gold.png)',
        backgroundSize: '40px auto',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center bottom',
      }}
    />
  )
}
