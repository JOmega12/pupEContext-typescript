import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { DogProvider, useDog } from "./providers/DogContext";

const AppContainer = () => {
  const context  = useDog();
  const { mode } = context;
  console.log(mode, 'mode')
  
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <Section label={"Dogs: "}>
      {mode !== 'create' && (
        <Dogs />
      )}
      {mode === 'create' && (
        <CreateDogForm />
      )}
      </Section>
    </div>
  );
};

export function App() {
  return (
    <DogProvider>
      <AppContainer />
    </DogProvider>
  );
}
