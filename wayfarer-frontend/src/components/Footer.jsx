import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="mt-auto border-t border-outline-variant bg-surface py-6 text-on-surface-variant">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left">
                {/* Marca y Copyright */}
                <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
                    <span className="font-display font-bold text-primary">Wayfarer</span>
                    <span className="text-xs text-on-surface-variant/80">
                        © {new Date().getFullYear()} — Todos los derechos reservados
                    </span>
                </div>

                {/* Navegación vertical en Mobile, horizontal en Desktop */}
                <nav className="flex flex-col items-center gap-3 text-xs sm:flex-row sm:gap-6 sm:text-sm">
                    <Link to="/sobre-nosotros" className="hover:text-primary transition-colors">
                        Sobre Nosotros
                    </Link>
                    <Link to="/terminos" className="hover:text-primary transition-colors">
                        Términos y Condiciones
                    </Link>
                    <Link to="/privacidad" className="hover:text-primary transition-colors">
                        Privacidad
                    </Link>
                </nav>
            </div>
        </footer>
    )
}

export default Footer