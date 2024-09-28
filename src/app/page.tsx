import PetCard from "@/components/PetCard";

export default function Home() {
  return (
    <>
      <h1 className="p-2 text-4xl sm:text-5xl font-extrabold leading-[1.25] text-foreground max-w-6xl mx-auto text-center pt-20">
        <span className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 bg-clip-text text-transparent">
          Donate for virtual adoption using ERC20 tokens
        </span>
      </h1>
      <div className="grid grid-cols-1 max-w-7xl lg:grid-cols-3 gap-y-6 gap-6 items-center justify-items-center mx-auto p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <PetCard
          id="1"
          photo="https://utfs.io/f/4c5ccd05-17f8-4966-892c-3194855a86b3-1jf5hd.jpeg"
          title="Armin"
          body="A cute doggo looking for food and a new home."
          variant="default"
          age="2 years"
          breed="Husky"
          type="Dog"
        />
        <PetCard
          id="2"
          title="Noah"
          photo="https://utfs.io/f/f97ccdec-c8cc-4fe0-8785-28d7bfc85da6-235mz.jpg"
          body="A fluffy kitty looking for snacks and toys."
          variant="default"
          age="1 year"
          breed="Persian"
          type="Cat"
        />
        <PetCard
          id="3"
          title="Benny"
          photo="https://utfs.io/f/242f33d0-f8bf-4c18-8c6d-5ab07eabf863-12594m.jpeg"
          body="A fluffy cocker looking for treats and a new home."
          variant="default"
          age="6 months"
          breed="Cocker Spaniel"
          type="Dog"
        />
      </div>
    </>
  );
}
