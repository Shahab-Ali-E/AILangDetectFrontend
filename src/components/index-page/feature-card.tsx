import GrainBackground from "@/assets/images/grain.jpg";
import type React from "react";

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactElement;
  title: string;
  description: string;
}) {
  return (
    <div
      className="relative group flex flex-col h-full w-full rounded-xl 
      bg-primary/5 shadow-md hover:shadow-lg transition-shadow duration-300 
      outline outline-primary/30 overflow-hidden z-10"
    >
      {/* Grain Texture Overlay */}
      <img
        src={GrainBackground}
        alt="grain-Background"
        height={100}
        width={100}
        className="absolute object-cover top-0 left-0 w-full h-full z-10 opacity-5 pointer-events-none"
      />

      {/* Icon and glowing effect */}
      <div className="flex w-full justify-between relative z-10">
        <div className="p-7">{icon}</div>

        {/* Hover Glow Effect */}
        <div className="relative h-40 w-40 z-10 group">
          <div
            className="absolute top-0 right-0 h-40 w-56 scale-100 opacity-0 
            transition-opacity duration-700 ease-in-out 
            group-hover:opacity-100
            bg-[linear-gradient(to_bottom_left,#ffffff_10%,#C2DBFF_20%,#A57BDE_50%,transparent_75%)] 
            dark:bg-[linear-gradient(to_bottom_left,white_20%,#81b1ff_10%,#4512A1_50%,transparent_75%)] 
            blur-2xl transform origin-top-right"
          ></div>
        </div>
      </div>

      {/* Heading & Description */}
      <div className="flex flex-col space-y-2 font-inter max-w-96 p-7 relative z-10">
        <h3 className="text-2xl text-card-foreground">{title}</h3>
        <p className="text-muted-foreground text-base">{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
