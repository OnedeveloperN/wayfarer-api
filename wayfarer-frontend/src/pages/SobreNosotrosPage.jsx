function SobreNosotrosPage() {
    return (
        <main className="mx-auto max-w-4xl px-4 py-12">
            <section className="text-center">
                <h1 className="font-display text-3xl font-bold text-on-surface sm:text-4xl">
                    Conectamos personas, compartimos trayectos
                </h1>
                <p className="mt-4 text-lg text-on-surface-variant">
                    En Wayfarer creemos en una forma de viajar más sostenible, accesible y social.
                </p>
            </section>

            <section className="mt-12 grid gap-8 sm:grid-cols-3">
                <div className="elevation-1 rounded-lg bg-surface p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
                        🌱
                    </div>
                    <h3 className="mt-4 font-display font-semibold text-on-surface">Sostenibilidad</h3>
                    <p className="mt-2 text-sm text-on-surface-variant">
                        Reducimos la huella de carbono optimizando los asientos libres en cada coche.
                    </p>
                </div>

                <div className="elevation-1 rounded-lg bg-surface p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
                        🤝
                    </div>
                    <h3 className="mt-4 font-display font-semibold text-on-surface">Comunidad</h3>
                    <p className="mt-2 text-sm text-on-surface-variant">
                        Fomentamos la confianza compartiendo experiencias y gastos de viaje de forma justa.
                    </p>
                </div>

                <div className="elevation-1 rounded-lg bg-surface p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl">
                        ⚡
                    </div>
                    <h3 className="mt-4 font-display font-semibold text-on-surface">Facilidad</h3>
                    <p className="mt-2 text-sm text-on-surface-variant">
                        Publicá o buscá un viaje en cuestión de segundos desde cualquier dispositivo.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default SobreNosotrosPage