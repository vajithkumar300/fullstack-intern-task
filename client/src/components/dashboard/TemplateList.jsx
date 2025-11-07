import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TemplateList = ({ templates, handleEdit, handleDelete }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">All Templates</h2>

      {templates.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No templates found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {templates.map((t) => (
            <div
              key={t._id}
              className="flex items-center gap-4 shadow-md  border border-gray-400 rounded-2xl  hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-4"
            >
              <img
                src={t.thumbnail_url}
                alt={t.name}
                className="w-28 h-20 object-cover rounded-lg border border-gray-200"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold ">{t.name}</h3>
                <p className="text-sm  mt-1">{t.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(t)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 cursor-pointer text-white text-sm rounded-lg hover:bg-blue-600 transition"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-500 cursor-pointer text-white text-sm rounded-lg hover:bg-red-600 transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateList;
