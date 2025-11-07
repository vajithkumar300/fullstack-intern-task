import { FaCloudUploadAlt, FaTimesCircle, FaEdit, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTemplates,
  createTemplate,
  deleteTemplate,
  updateTemplate,
} from "../store/slices/templatesSlice";
import ProtectedRoute from "../components/ProtectedRoute";
import TemplateList from "../components/dashboard/TemplateList";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const templates = useSelector((s) => s.templates.items);
  const user = useSelector((s) => s.auth.user);
  const [form, setForm] = useState({
    name: "",
    description: "",
    thumbnail_url: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null); // 🔹 for editing

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.role !== "admin") return alert("Admin only");

    setLoading(true);
    try {
      if (editId) {
        // 🔹 Update
        await dispatch(updateTemplate({ id: editId, data: form })).unwrap();
        setEditId(null);
      } else {
        // 🔹 Create
        await dispatch(createTemplate(form)).unwrap();
      }
      setForm({
        name: "",
        description: "",
        thumbnail_url: "",
        category: "",
        thumbnail: null,
        preview: null,
      });
      dispatch(fetchTemplates());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      await dispatch(deleteTemplate(id));
    }
  };

  const handleEdit = (t) => {
    setEditId(t._id);
    setForm({
      name: t.name,
      description: t.description,
      thumbnail_url: t.thumbnail_url,
      category: t.category,
      thumbnail: null,
      preview: t.thumbnail_url,
    });
     window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6"
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 border rounded bg-transparent"
            required
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-2 border rounded bg-transparent"
          />

          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded cursor-pointer p-4 relative">
            {!form.preview ? (
              <>
                <FaCloudUploadAlt className="text-zinc-400 text-7xl mb-2" />
                <span className="text-gray-600">Upload Thumbnail</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setForm({
                        ...form,
                        thumbnail: file,
                        preview: URL.createObjectURL(file),
                      });
                    }
                  }}
                  className="hidden"
                />
              </>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src={form.preview}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded shadow-md"
                />
                <p className="text-sm text-gray-500 mt-2">
                  {form.thumbnail?.name || "Current Image"}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setForm({ ...form, thumbnail: null, preview: null });
                  }}
                  className="mt-2 flex items-center text-red-500 hover:text-red-700 text-sm"
                >
                  <FaTimesCircle className="mr-1" /> <span>Remove</span>
                </button>
              </div>
            )}
          </label>

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="p-2 border rounded bg-transparent"
          />

          <button
            type="submit"
            disabled={loading}
            className={`col-span-full px-4 py-2 rounded text-white transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading
              ? "Saving..."
              : editId
              ? "Update Template"
              : "Create Template"}
          </button>
        </form>

        <TemplateList templates={templates} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </ProtectedRoute>
  );
}
