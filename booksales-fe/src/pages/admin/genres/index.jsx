import { useEffect, useState } from "react";
import { getGenres, createGenre, updateGenre, deleteGenre } from "../../../_services/genres";

export default function AdminGenres() {
  const [genres, setGenres]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [formName, setFormName]     = useState("");
  const [formDesc, setFormDesc]     = useState("");
  const [saving, setSaving]         = useState(false);
  const [message, setMessage]       = useState("");

  
  useEffect(() => {
    const loadGenres = async () => {
      try {
        setLoading(true);
        const data = await getGenres();
        setGenres(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Gagal mengambil data genres:", error);
      } finally {
        setLoading(false);
      }
    };
    loadGenres();
  }, []);

  // Refresh data setelah add/edit/delete
  const fetchGenres = async () => {
    try {
      const data = await getGenres();
      setGenres(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenAdd = () => {
    setEditTarget(null);
    setFormName("");
    setFormDesc("");
    setShowModal(true);
  };

  const handleOpenEdit = (genre) => {
    setEditTarget(genre);
    setFormName(genre.name);
    setFormDesc(genre.description || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditTarget(null);
    setFormName("");
    setFormDesc("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formName.trim()) return;
    try {
      setSaving(true);
      const payload = { name: formName, description: formDesc };
      if (editTarget) {
        await updateGenre(editTarget.id, payload);
        setMessage(`Kategori "${formName}" berhasil diperbarui!`);
      } else {
        await createGenre(payload);
        setMessage(`Kategori "${formName}" berhasil ditambahkan!`);
      }
      handleCloseModal();
      fetchGenres();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Gagal simpan genre:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (genre) => {
    const confirmed = window.confirm(`Yakin ingin menghapus kategori "${genre.name}"?`);
    if (!confirmed) return;
    try {
      await deleteGenre(genre.id);
      setGenres((prev) => prev.filter((g) => g.id !== genre.id));
      setMessage(`Kategori "${genre.name}" berhasil dihapus.`);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Gagal hapus genre:", error);
      alert("Gagal menghapus kategori.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 min-h-screen">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Kelola Kategori Buku</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Tambah, ubah, atau hapus kategori (genre) buku.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Kategori
          </button>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm font-medium border border-green-200">
            {message}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-4 w-16">No</th>
                  <th className="px-6 py-4">Nama Kategori</th>
                  <th className="px-6 py-4">Deskripsi</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
                      <div className="flex justify-center gap-2">
                        <div className="w-3 h-3 rounded-full animate-bounce bg-indigo-400" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-3 h-3 rounded-full animate-bounce bg-indigo-400" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-3 h-3 rounded-full animate-bounce bg-indigo-400" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </td>
                  </tr>
                ) : genres.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
                      Belum ada kategori. Klik "Tambah Kategori" untuk memulai.
                    </td>
                  </tr>
                ) : (
                  genres.map((genre, index) => (
                    <tr key={genre.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{genre.name}</td>
                      <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                        {genre.description || <span className="italic text-gray-300">—</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(genre)}
                            className="inline-flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(genre)}
                            className="inline-flex items-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {editTarget ? "Edit Kategori" : "Tambah Kategori Baru"}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nama Kategori <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  placeholder="Contoh: Fiksi, Sains, Sejarah..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Deskripsi <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <textarea
                  rows="3"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Deskripsi singkat kategori ini..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-colors disabled:bg-indigo-300"
                >
                  {saving ? "Menyimpan..." : editTarget ? "Simpan Perubahan" : "Tambah Kategori"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}