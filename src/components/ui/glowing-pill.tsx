export default function GlowingPill({ label = "AI Powered", className = "" }) {
  return (
    <h1
      className={`inline-block py-2 px-5 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium text-primary border border-primary shadow-primary animate-pulse-glow ${className}`}
    >
      {label}
    </h1>
  );
}