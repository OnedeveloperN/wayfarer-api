import { useLocation } from 'react-router-dom'

function LegalesPage() {
    const { pathname } = useLocation()
    const esTerminos = pathname.includes('terminos')

    return (
        <main className="mx-auto max-w-3xl px-6 py-12">
            <h1 className="font-display text-3xl font-bold text-on-surface">
                {esTerminos ? 'Términos y Condiciones' : 'Política de Privacidad'}
            </h1>
            <p className="mt-2 text-xs text-on-surface-variant">Última actualización: Octubre 2026</p>

            <div className="mt-6 flex flex-col gap-4 text-sm text-on-surface-variant leading-relaxed">
                {esTerminos ? (
                    <>
                        <p>
                            Bienvenido a <strong>Wayfarer</strong>. Al acceder a nuestra plataforma, aceptas cumplir con los
                            siguientes términos de servicio para compartir trayectos y gastos de viaje de forma justa y responsable.
                        </p>
                        <h2 className="font-semibold text-on-surface text-base mt-2">1. Uso del Servicio</h2>
                        <p>
                            Wayfarer es una plataforma académica de intermediación que conecta conductores y pasajeros. No somos
                            una empresa de transporte de pasajeros.
                        </p>
                        <h2 className="font-semibold text-on-surface text-base mt-2">2. Normas de Convivencia</h2>
                        <p>
                            Todos los usuarios deben mantener un trato respetuoso, puntualidad en los puntos de encuentro y
                            cumplir las normas de seguridad vial aplicables.
                        </p>
                    </>
                ) : (
                    <>
                        <p>
                            En <strong>Wayfarer</strong> nos tomamos muy en serio la privacidad de tus datos personales.
                        </p>
                        <h2 className="font-semibold text-on-surface text-base mt-2">1. Datos Recopilados</h2>
                        <p>
                            Recopilamos únicamente los datos estrictamente necesarios para la gestión de usuarios y publicaciones de
                            viajes: nombre, correo electrónico y tipo de perfil (conductor/pasajero).
                        </p>
                        <h2 className="font-semibold text-on-surface text-base mt-2">2. Uso de la Información</h2>
                        <p>
                            Tus datos no serán cedidos a terceros y son utilizados exclusivamente para la autenticación y
                            operación dentro de la plataforma Wayfarer.
                        </p>
                    </>
                )}
            </div>
        </main>
    )
}

export default LegalesPage