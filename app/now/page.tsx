"use client";
import { FlagTriangleRight } from "lucide-react";
import { useState } from "react";

import { ImageSlider } from "../components/ImageSlider";
import { CustomLink } from "../components/Link";
import { Modal } from "../components/Modal";
import { Navigation } from "../components/Nav";

export default function Now() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalOpen = (isOpen: boolean) => {
    setModalIsOpen(isOpen);
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0 pb-24">
      <Navigation />

      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            What's going on now ?
          </h2>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        <div className="w-9/12 mx-auto">
          <h3 className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
            Personal Life
          </h3>

          <section className="flex items-center gap-1.5">
            <FlagTriangleRight className="text-zinc-200" size={20} style={{ minWidth: 30 }} />

            <p className="mt-4 text-md duration-1000 text-zinc-500 group-hover:text-zinc-200">
              Ich lerne Deutsch 🇩🇪 Yes, I'm learing a fifth language! Learning new languages is one
              of my hobbies and despite I worked for almost five years with a German company, I
              never learned it (shame on me). I already speak English 🇺🇸, Portuguese 🇧🇷, Spanish
              (CO) 🇨🇴, and I have a basic French 🇫🇷. So far, learning German has been really fun.
            </p>
          </section>

          <section className="flex items-center gap-1.5">
            <FlagTriangleRight className="text-zinc-200" size={20} style={{ minWidth: 30 }} />

            <p className="mt-4 text-md duration-1000 text-zinc-500 group-hover:text-zinc-200">
              I have two beautiful kids named João and David! In my spare time you can find me
              playing with them in the parks near my house, riding a bike or just chasing them 😅!
              Aren't they adorable ?{" "}
              <button
                type="button"
                className="text-sky-500 cursor-pointer hover:text-white bg-transparent border-none p-0 underline"
                onClick={() => handleModalOpen(true)}
              >
                Click here
              </button>
            </p>
          </section>

          <section className="flex items-center gap-1.5">
            <FlagTriangleRight className="text-zinc-200" size={20} style={{ minWidth: 30 }} />

            <p className="mt-4 text-md duration-1000 text-zinc-500 group-hover:text-zinc-200">
              I'm not haiving much time to read but I'm in the middle of{" "}
              <CustomLink
                external
                to="https://www.amazon.com/Innovation-Biome-Sustained-Business-Environment/dp/163299156X"
                text="The Innovation Biome (Kumar Mehta)"
              />{" "}
              and I'm focused on resources about Distributed Systems such as{" "}
              <CustomLink
                external
                to="https://www.distributed-systems.net/index.php/books/ds4/"
                text="Distributed Systems (Maarten Van Steen and Andrew S. Tanenbaum)."
              />
            </p>
          </section>

          <h3 className="mt-8 lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
            Professional life
          </h3>

          <section className="mt-4 flex items-center gap-1.5">
            <FlagTriangleRight className="text-zinc-200" size={20} style={{ minWidth: 30 }} />

            <p className="text-md duration-1000 text-zinc-500 group-hover:text-zinc-200">
              I'm working as a Senior Platform Engineer at Appcues, where I write a bunch of Elixir
              and Node. We work with GraphQL, Absinthe and Phoenix.
            </p>
          </section>

          <section className="mt-4 flex items-center gap-1.5">
            <FlagTriangleRight className="text-zinc-200" size={20} style={{ minWidth: 30 }} />

            <p className="text-md duration-1000 text-zinc-500 group-hover:text-zinc-200">
              After almost five years working as an Engineering lead, I came back to being an
              individual contributor which is where I think I excel. I do want to continue pursuing
              the technical ladder, even though, I enjoyed having the opportunity to lead a remote
              engineering team for a couple of years.
            </p>
          </section>
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onClose={() => handleModalOpen(false)}>
        <ImageSlider>
          <img className="max-h-full" src="/assets/kids-1.jpeg" alt="João and David playing" />
          <img className="max-h-full" src="/assets/kids-2.jpeg" alt="João and David at the park" />
          <img className="max-h-full" src="/assets/kids-3.jpeg" alt="João and David having fun" />
          <img className="max-h-full" src="/assets/kids-6.jpeg" alt="João and David together" />
          <img
            className="max-h-full"
            src="/assets/kids-7.jpeg"
            alt="João and David outdoor activities"
          />
        </ImageSlider>
      </Modal>
    </div>
  );
}
