import { Filter } from "./components/filter";
import { CreateForm } from "./components/createForm";
import { List } from "./components/list";

function App() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex items-center mx-auto">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col gap-3">
          <Filter />
          <List />
          <CreateForm />
        </div>
      </div>
    </div>
  );
}

export default App;
