import ImageBox from "./ImageBox";

export default function HeroCentered() {
  return (
    <div className="mt-[10vh] md:mt-[12vh]">
      <section className="px-4 md:px-6 flex flex-col items-center justify-center min-h-[calc(200vh-12vh)] md:min-h-[200vh] w-full pb-8 md:pb-12 border-black gap-4 md:gap-6">
        <img
          src="/svg/ink_centered.svg"
          alt="clamore bergamo"
          className="w-[95%] md:w-[98%] h-auto mt-8 md:mt-12"
        />
        <div className="w-full h-auto">
          <ImageBox
            src="/foto/ink.jpeg"
            alt="Image"
            className="w-full h-full"
          />
        </div>
        <div className="text-black font-bold font-gambarino tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] md:leading-[1] stroke-black max-w-6xl text-center min-h-screen grid place-items-center">
          Dal 2016 promuoviamo la cultura dal basso
          <br />
          offrendo iniziative artistiche e musicali,
          <br />
          creando spazi di espressione
          <br />
          per giovani talenti e realtà emergenti.
        </div>
      </section>
    </div>
  );
}

