// Right now these dogs are constant, but in reality we should be getting these from our server

import { useDog } from "../providers/DogContext";
import { TDogContext } from "../types";
import { DogCard } from "./DogCard";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  const context = useDog();
  const { filteredDogs, deleteDog, patchFavoriteDog, isLoading } =
    context as TDogContext;

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {filteredDogs?.map((dog) => {
        return (
          <DogCard
            dog={dog}
            key={dog.id}
            isLoading={isLoading}
            onEmptyHeartClick={() => patchFavoriteDog(dog)}
            onHeartClick={() => patchFavoriteDog(dog)}
            onTrashIconClick={() => deleteDog(dog)}
          />
        );
      })}
    </>
  );
};
