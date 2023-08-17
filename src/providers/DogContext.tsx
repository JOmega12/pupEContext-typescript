import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

export const DogContext = 
// createContext<TDogContext | undefined>(undefined)
createContext({})

export const DogProvider = ({children}: {children: React.ReactNode}) => {
   const [mode, setMode] = useState('all');
   const [dogs, setDogs] = useState<Dog[]>([]);
   const [isLoading, setIsLoading] = useState(false);


   const refetchDogs = () => {
      Requests.getAllDogs()
         .then((res) => {
            setDogs(res)
         })
         .finally(() => setIsLoading(false))
   }

   useEffect(() => {
      refetchDogs();
   }, [])

   const addDog = (dog: Dog) => {
      Requests.postDog({
         id: dog.id,
         name: dog.name,
         description: dog.description,
         image: dog.image,
         isFavorite: false
      })
      .then(() => refetchDogs())
      .catch((err) => console.log(err));

   }

   const deleteDog = (dog: Dog) => {
      Requests.deleteDogRequest(dog)
         .then(() => {
            return refetchDogs();
         })
      .catch((err) => console.log(err));

   }

   const patchFavoriteDog = (dog: Dog) => {
      Requests.patchFavoriteForDog(dog)
         .then(() => refetchDogs())
         .catch((err) => console.log(err));

   }

   const favorite = dogs.filter((dog) => dog.isFavorite === true);
   const unfavorite = dogs.filter((dog) => dog.isFavorite === false);

   const favoriteDogCount = favorite.length;
   const unfavoriteDogCount = unfavorite.length

   const handleModeChange = (dogMode: string) => {
      if (mode === dogMode) {
         setMode('all');
         return;
      }
      setMode(dogMode);
   }


   const filteredDogs = () => {
      if (mode === 'favorite') {
         return favorite
      } else if (mode === 'unfavorite') {
         return unfavorite
      } else {
         return dogs
      }
   }


   return (
      <DogContext.Provider 
         value={{
            mode, setMode, addDog, deleteDog, patchFavoriteDog, favoriteDogCount, unfavoriteDogCount, filteredDogs, handleModeChange
         }}
      >
         {children}
      </DogContext.Provider>
   )
}

export const useDog = () => {
   const context = useContext(DogContext)
   return context;
}