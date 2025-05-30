import { useDispatch } from "react-redux";
import { createPost } from "../redux/postSlice";
import { useRef } from "react";

export function CreateForm() {
  const dispatch = useDispatch();
  const formRef = useRef();

  async function handleSubmit(formData) {
    const name = formData.get("name");
    const description = formData.get("description");
    const form = {
      name,
      description,
    };

    dispatch(createPost(form));
    formRef.current.reset();
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-900">
      <form
        className="flex items-center justify-center gap-3"
        action={handleSubmit}
        ref={formRef}
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nombre
          </label>
          <input
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ingresar un nombre"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descripción
          </label>
          <input
            id="description"
            name="description"
            placeholder="Ingresar una breve descripción"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Crear
        </button>
      </form>
    </div>
  );
}
