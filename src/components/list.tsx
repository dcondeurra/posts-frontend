import { deletePost, fetchPosts, selectFilteredPosts } from "@/redux/postSlice";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function PostRow({ item }) {
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    dispatch(deletePost(item.id));
  }, [dispatch, item.id]);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {item.name}
      </th>
      <td className="px-6 py-4">{item.description}</td>
      <td className="px-6 py-4">
        <button
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

function TableList() {
  const posts = useSelector(selectFilteredPosts);
  const items = [];

  posts.forEach((item) => {
    items.push(item);
  });

  return (
    <tbody>
      {items.length > 0 ? (
        items.map((item) => <PostRow item={item} key={item.id} />)
      ) : (
        <tr>
          <td colSpan={3} className="px-6 py-4 text-center">
            No hay posts creados o la búsqueda no ha devuelto resultados.
          </td>
        </tr>
      )}
    </tbody>
  );
}

export function List() {
  const { loading } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  if (loading) return <div className="flex px-4">cargando...</div>;

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Nombre
          </th>
          <th scope="col" className="px-6 py-3">
            Descripción
          </th>
          <th scope="col" className="px-6 py-3">
            Acción
          </th>
        </tr>
      </thead>
      <TableList />
    </table>
  );
}
