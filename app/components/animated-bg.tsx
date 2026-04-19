export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,9,20,0.9)_100%)]" />
    </div>
  );
}
