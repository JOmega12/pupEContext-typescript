import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { DogProvider } from "./providers/DogContext";

// const AppContainer = () => (
//   <div className="App" style={{ backgroundColor: "skyblue" }}>
//   <header>
//     <h1>pup-e-picker (Functional)</h1>
//   </header>
//   <Section label={"Dogs: "}>

//   </Section>
// </div>
// )

export function App() {
  return (
    <DogProvider>
      {/* <AppContainer /> */}
      <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Functional)</h1>
        </header>
        <Section label={"Dogs: "}>
          <Dogs />
        </Section>
      </div>
    </DogProvider>
  );
}
