import { createContext, useContext, useEffect, useState } from "react";
import { Dog, TDogContext } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export const DogContext = createContext<TDogContext | undefined>(undefined);

export const DogProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("all");
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refetchDogs = () => {
    Requests.getAllDogs()
      .then((res) => {
        setDogs(res);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  const addDog = (dog: Dog) => {
    Requests.postDog({
      id: dog.id,
      name: dog.name,
      description: dog.description,
      image: dog.image,
      isFavorite: false,
    })
      .then(() => refetchDogs())
      .catch((err) => console.log(err));
  };

  const deleteDog = (dog: Dog) => {
    const updatedDogs = dogs.filter((dogz) => dogz.id !== dog.id);
    setDogs(updatedDogs);
    Requests.deleteDogRequest(dog)
      .then((res) => {
        if (!res.ok) {
          setDogs(dogs);
        } else {
          toast.success(`You've deleted a good boi`);
        }
      })
      .then(() => {
        refetchDogs();
      })
      .catch((err) => console.log(err));
  };

  const patchFavoriteDog = (dog: Dog) => {
    setDogs(
      dogs.map((dogz) =>
        dogz.id === dog.id ? { ...dogz, isFavorite: !dogz.isFavorite } : dogz
      )
    );
    Requests.patchFavoriteForDog(dog)
      .then((res) => {
        if (!res.ok) {
          setDogs(dogs);
        } else {
          if (dog.isFavorite) {
            toast.success(`You've favorite a good boi`);
          } else {
            toast.success(`You've unfavorited a good boi`);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const favorite = dogs.filter((dog) => dog.isFavorite === true);
  const unfavorite = dogs.filter((dog) => dog.isFavorite === false);

  const favoriteDogCount = favorite.length;
  const unfavoriteDogCount = unfavorite.length;

  const handleModeChange = (dogMode: string) => {
    if (mode === dogMode) {
      setMode("all");
      return;
    }
    setMode(dogMode);
  };

  const filteredDogs: Dog[] = (() => {
    if (mode === "favorite") {
      return favorite;
    }

    if (mode === "unfavorite") {
      return unfavorite;
    }
    return dogs;
  })();

  return (
    <DogContext.Provider
      value={{
        mode,
        setMode,
        addDog,
        deleteDog,
        patchFavoriteDog,
        favoriteDogCount,
        unfavoriteDogCount,
        filteredDogs,
        handleModeChange,
        isLoading,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDog = () => {
  const context = useContext(DogContext) || {};
  return context;
};
