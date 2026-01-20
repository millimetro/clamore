"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "../contexts/LoaderContext";
import Nav, { type NavRef } from "../components/Nav";

export default function ManifestoPage() {
  const navRef = useRef<NavRef>(null);
  const manifestoImageRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const logoImageRef = useRef<HTMLDivElement>(null);
  const sponsorLogosRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLElement>(null);
  const { isLoaderComplete } = useLoader();

  useGSAP(() => {
    if (!mainContainerRef.current) return;

    // Get all other elements (excluding logo) to animate after logo
    const otherElements = [
      manifestoImageRef.current,
      textContentRef.current,
      sponsorLogosRef.current,
    ].filter(Boolean);

    // Set initial state immediately - logo starts hidden/scaled down, other elements hidden
    if (logoImageRef.current) {
      gsap.set(logoImageRef.current, {
        opacity: 0,
        scale: 0.5,
      });
    }

    if (otherElements.length > 0) {
      gsap.set(otherElements, {
        opacity: 0,
        y: 10,
      });
    }

    // Create timeline for entrance animation
    const tl = gsap.timeline({
      delay: isLoaderComplete ? 0.1 : 0, // Reduced delay
    });

    // Phase 1: Animate logo in first (loader-like entrance)
    if (logoImageRef.current) {
      tl.to(logoImageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "expo.inOut",
      }, "logo");
    }

    // Setup nav animations on the timeline
    if (navRef.current) {
      navRef.current.setupAnimations(tl);
    }

    if (manifestoImageRef.current) {
      tl.to(manifestoImageRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "expo.inOut",
      }, "logo+=0.5");
    }

    if (textContentRef.current) {
      tl.to(textContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "expo.inOut",
      }, "logo+=0.6");
    }

    if (sponsorLogosRef.current) {
      tl.to(sponsorLogosRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "expo.inOut",
      }, "logo+=0.7");
    }
  }, { scope: mainContainerRef, dependencies: [isLoaderComplete] });

  return (
    <main ref={mainContainerRef} className="min-h-[100dvh] bg-cream flex items-center justify-center relative">
      <Nav ref={navRef} />

      <section className="px-3 sm:px-4 md:px-4 lg:px-8 mt-20 sm:mt-24 md:mt-32 mb-5 w-full mx-auto">
        <div ref={manifestoImageRef} className="mb-8 md:mb-12 w-full" style={{ opacity: 0, transform: 'translateY(10px)' }}>
          <img 
            src="/svg/manifesto.svg" 
            alt="Manifesto" 
            className="w-full h-auto"
          />
        </div>
        <div ref={textContentRef} className="font-sans font-medium tracking-tight text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-tight sm:leading-tighter space-y-4 sm:space-y-6 text-justify" style={{ color: '#E84627', opacity: 0, transform: 'translateY(10px)' }}>
          <p>
            <strong>Clamore Festival</strong> è un progetto ideato, organizzato e promosso da{" "}
            <a 
              href="https://www.inkclub.bergamo.it/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:no-underline font-bold cursor-pointer"
              style={{ color: '#E84627' }}
            >
              Ink Club APS
            </a>
            {" "}in collaborazione con diverse realtà di <strong>Bergamo</strong>, è nato nel 2017 con l'intento di valorizzare tutti i progetti musicali della città e della provincia.
          </p>
          <p>
            Dalla prima edizione il Festival, rigorosamente gratuito per i fruitori, si è impegnato ad allestire palchi diffusi in città, fornendo a ciascuno di questi spazi fonico professionista, impianto audio, strumentazione di palco e backline. Per i progetti musicali la partecipazione al festival avviene tramite iscrizione ad un questionario online ed è gratuita e vincolata a poche condizioni base: risiedere nelle province di <strong>Bergamo</strong> e Brescia ed eseguire musica originale (no cover).
          </p>
          <p>
            In questi anni abbiamo ospitato circa 700 progetti (2mila my musicist3) di ogni età e genere musicale.
          </p>
          <p>
            Nel tempo <strong>Clamore</strong> è diventato un riferimento per i gruppi di tutta la provincia (in particolar modo le realtà giovani ed emergenti), che trovano sui palchi del Festival un modo per confrontarsi con un pubblico locale reale e variegato.
          </p>
          <p>
            Dal 2023, in occasione di <strong>Bergamo</strong> Brescia Capitale Italiana della Cultura, sono state aperte le iscrizioni ai progetti provenienti dalla Provincia di Brescia.
          </p>
          <p>
            Il Festival coinvolge sempre di più il territorio a partire dagli enti culturali (locali, organizzatori, addett3 ai lavori, artist3, enti sensibili al tema), creando nuovi spazi ed opportunità. Oltre alla musica <strong>Clamore</strong> organizza talk ospiti di livello nazionale come i produttori dei Coma Cose, musicisti di Elio e le storie tese, i Pinguini Tattici Nucleari e laboratori per famiglie e centri estivi.
          </p>
          <p>
            <strong>Clamore</strong> collabora anche alla co-gestione dei palchi di alcuni Festival come Filagosto Festival e Rock Sul Serio e di alcune realtà che si occupano di musica dal vivo come Diluvio Festival, Circolo ARCI Base, Latteria Molloy.
          </p>
          <p>
            Nel tempo è nata anche la collaborazione con Nuovi Suoni Live, concorso proposto e organizzato annualmente dalle Politiche Giovanili del Comune di <strong>Bergamo</strong> con il supporto di HG80 – Impresa sociale.
          </p>
        </div>

        <div ref={sponsorLogosRef} className="mt-8 md:my-24 w-full flex justify-center" style={{ opacity: 0, transform: 'translateY(10px)' }}>
          <img 
            src="/sponsor/plancia.png" 
            alt="Sponsor Loghi" 
            className="w-full h-auto"
          />
        </div>
        <div ref={logoImageRef} className="mt-8 md:mt-12 w-full" style={{ opacity: 0 }}>
          <img 
            src="/logo/logo.svg" 
            alt="Clamore Logo" 
            className="w-full h-auto"
          />
        </div>
      </section>
    </main>
  );
}

