import ImageBox from "./ImageBox";

export default function Hero() {
  return (
    <div className="relative mt-16 md:mt-[8vh]">
      <img
        src="/svg/inkclub.svg"
        alt="clamore bergamo"
        className="absolute top-16 md:top-28 left-1/2 -translate-x-1/2 w-[95%] md:w-[98%] h-auto"
      />
      <section className="px-4 md:px-6 grid items-end justify-start min-h-[calc(100vh-9vh)] md:min-h-screen w-full pb-12 border-t-2 border-b-2 border-black">
        <div className="text-black font-bold font-gambarino tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.1] md:leading-[1] stroke-black mb-4 md:mb-6 max-w-4xl">
          Dal 2016 promuoviamo la cultura dal basso
          <br />
          offrendo iniziative artistiche e musicali,
          <br />
          creando spazi di espressione
          <br />
          per giovani talenti e realtà emergenti.
        </div>
      </section>
      <div className="absolute bottom-8 md:bottom-16 right-2 md:right-4 w-[25%] sm:w-[20%] md:w-[15%] h-auto">
        <ImageBox
          src="/foto/ink.jpeg"
          alt="Image"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

