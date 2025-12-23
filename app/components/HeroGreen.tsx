export default function HeroGreen() {
  return (
    <div className="relative h-[200vh] border-t-2 border-b-2 border-black snap-end">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ height: '200vh' }}>
        <div 
          className="absolute left-0 right-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/foto/ink_red.jpg)',
            height: '200vh',
            top: '0',
            width: '100%',
          }}
        />
        <div className="absolute inset-0 h-[200vh] bg-gradient-to-b from-black/50 to-black/80 z-[1]" />
      </div>
      {/* First viewport - SVG */}
      <section className="relative h-screen flex flex-col items-center justify-end px-4 md:px-6 pb-16 md:pb-24 z-10">
        <img
          src="/svg/ink_centered_w.svg"
          alt="clamore bergamo"
          className="w-[95%] md:w-[98%] h-auto mx-auto"
        />
      </section>
      {/* Second viewport - Description */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-4 md:px-6 z-10">
        <div className="text-cream font-bold font-gambarino tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-[1.1] md:leading-[1] stroke-cream max-w-5xl text-center">
          Dal 2016 promuoviamo la cultura dal basso
          offrendo iniziative artistiche e musicali,
          creando spazi di espressione
          per giovani talenti e realtà emergenti.
        </div>
      </div>
      <div className="fixedin bottom-4 px-4 md:px-6 z-10 w-full flex justify-between">
        <div className="text-cream font-bold font-brand tracking-tight text-sm sm:text-base md:text-md uppercase leading-[0.9]">
          il tuo circolo
          <br />
          a bergamo
        </div>
        <div className="text-cream font-bold font-brand tracking-tight text-sm sm:text-base md:text-md uppercase leading-[0.9]">
          tesserati ora
        </div>
      </div>
    </div>
  );
}

