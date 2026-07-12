export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference sm:px-10">
      <span className="text-sm font-semibold tracking-tight text-white">
        Gonzalo Romero
      </span>
      <nav className="flex items-center gap-6 text-sm font-medium text-white">
        <a href="#work" className="opacity-80 transition-opacity hover:opacity-100">
          Work
        </a>
        <a href="#about" className="opacity-80 transition-opacity hover:opacity-100">
          About
        </a>
        <a href="#contact" className="opacity-80 transition-opacity hover:opacity-100">
          Contact
        </a>
        <span className="opacity-50">EN</span>
      </nav>
    </header>
  );
}
