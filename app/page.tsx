import Link from "next/link";
import Particles from "./components/Particles";

const navigation = [
  { name: "Now", href: "/now" },
  { name: "Blog", href: "/blog" },
  { name: "Projects", href: "/projects" }, 
  { name: "Social", href: "/social" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />

      <img
        src="https://ca.slack-edge.com/T02JL4BUK-U02LFTY70GK-591af2226f8f-512"
        className="rounded-full w-48 mb-8"
      />

      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        Juan Rivillas
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-md text-zinc-500 max-w-2xl">
          I'm a Senior Software Engineer working with Elixir, distributed
          systems, and AWS. I am personally interested in data visualization,
          astronomy, and algorithms. In the past decade, I've had the
          opportunity to work with Serverless architecture, React, Vue, D3.js,
          among other tools and frameworks.
        </h2>
      </div>
    </div>
  );
}
