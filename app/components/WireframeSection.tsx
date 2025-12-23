import React from "react";

export default function WireframeSection({ title }: { title: string }) {
  return (
    <section className=" border-black grid place-items-center min-h-screen">
      <p className="text-black">{title}</p>
    </section>
  );
}
