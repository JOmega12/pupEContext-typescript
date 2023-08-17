import { ReactNode, createContext, useEffect, useState } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

type TDogContext = {
   mode: string,
   setMode: (mode: string) => void ,
   children: React.ReactNode,
}

console.log(Dog, 'dog')


export const DogContext = 
// createContext<TDogContext | undefined>(undefined)
createContext({})

export const DogProvider = ({children}) => {
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
         name: dog.name,
         description: dog.description,
         image: dog.image,
         isFavorite: false
      })
      .then(() => refetchDogs());

   }

   const deleteDog = (dog: Dog) => {
      Requests.deleteDogRequest(dog)
         .then(() => {
            return refetchDogs();
         })
   }

   const patchFavoriteDog = (dog: Dog) => {
      Requests.patchFavoriteForDog(dog)
         .then(() => refetchDogs());
   }

   return (
      <DogContext.Provider 
         value={{
            mode, setMode
         }}
      >
         {children}
      </DogContext.Provider>
   )
}
