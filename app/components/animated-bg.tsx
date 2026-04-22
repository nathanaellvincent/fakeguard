/**
 * Ambient editorial background.
 *
 * Two very-blurred warm orbs (amber + rose) drift behind the content.
 * A paper-grain noise overlay on top gives the page a textured newsprint
 * feel without needing a real image asset. All colours come from CSS
 * variables so the look holds up in both themes.
 */
export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="paper-grain" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, var(--vignette) 100%)",
        }}
      />
    </div>
  );
}
