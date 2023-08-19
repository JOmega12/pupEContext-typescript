import { ReactNode } from "react";
import { TDogContext } from "../types";
import { useDog } from "../providers/DogContext";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const context: Partial<TDogContext> = useDog();
  const { mode, handleModeChange, favoriteDogCount, unfavoriteDogCount } = context;

  const handleClick = (typeOfMode: string): void => {
  if(handleModeChange) {
    handleModeChange(typeOfMode)
  }
 }
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${mode === "favorite" ? "active" : ""}`}
            onClick={() => {
              handleClick("favorite");
            }}
          >
            favorited ( {favoriteDogCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${mode === "unfavorite" ? "active" : ""}`}
            onClick={() => {
              handleClick("unfavorite");
            }}
          >
            unfavorited ( {unfavoriteDogCount} )
          </div>
          <div
            className={`selector ${mode === "create"? "active" : ""}`}
            onClick={() => {
              handleClick("create")
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
