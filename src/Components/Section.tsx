import { ReactNode } from "react";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
  handleModeChange: (dogMode: string) => void;
  mode: string,
  favoriteDogCount: number,
}) => {

   const context= useDog();
   const{mode, handleModeChange, favoriteDogCount} = context
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${mode === "favorite" ? "active": ""}`}
            onClick={() => {
              handleModeChange("favorite")
            }}
          >
            favorited ( {favoriteDogCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${""}`}
            onClick={() => {
              alert("click unfavorited");
            }}
          >
            unfavorited ( {10} )
          </div>
          <div
            className={`selector ${""}`}
            onClick={() => {
              alert("clicked create dog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
