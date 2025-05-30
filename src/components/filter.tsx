import { setFilter } from "@/redux/postSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function Filter() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(setFilter(search));
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-900">
      <form
        className="flex justify-between items-center"
        onSubmit={handleSubmit}
      >
        <div className="relative mt-1">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-50 border ps-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Filtro de Nombre"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
