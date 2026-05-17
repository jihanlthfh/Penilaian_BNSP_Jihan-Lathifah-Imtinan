import { useEffect, useState } from "react";
import { getAuthors, createAuthor, updateAuthor, deleteAuthor } from "../../../_services/authors";

export default function AdminAuthors() {
  const [authors, setAuthors]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [formName, setFormName]     = useState("");
  const [formBio, setFormBio]       = useState("");
  const [saving, setSaving]         = useState(false);
  const [message, setMessage]       = useState("");

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        setLoading(true);
        const data = await getAuthors();
        setAuthors(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Gagal mengambil data authors:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const data = await getAuthors();
      setAuthors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenAdd = () => {
    setEditTarget(null);
    setFormName("");
    setFormBio("");
    setShowModal(true);
  };

  const handleOpenEdit = (author) => {
    setEditTarget(author);
    setFormName(author.name);
    setFormBio(author.bio || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditTarget(null);
    setFormName("");
    setFormBio("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formName.trim()) return;
    try {
      setSaving(true);
      const payload = { name: formName, bio: formBio };
      if (editTarget) {
        await updateAuthor(editTarget.id, payload);
        setMessage(`Penulis "${formName}" berhasil diperbarui!`);
      } else {
        await createAuthor(payload);
        setMessage(`Penulis "${formName}" berhasil ditambahkan!`);
      }
      handleCloseModal();
      fetchAuthors();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Gagal simpan author:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (author) => {
    const confirmed = window.confirm(
      `Yakin ingin menghapus penulis "${author.name}"?\nSemua buku dengan penulis ini mungkin terpengaruh.`
    );
    if (!confirmed) return;
    try {
      await deleteAuthor(author.id);
      setAuthors((prev) => prev.filter((a) => a.id !== author.id));
      setMessage(`Penulis "${author.name}" berhasil dihapus.`);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Gagal hapus author:", error);
      alert("Gagal menghapus penulis. Pastikan tidak ada buku yang terhubung.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 min-h-screen">
      <div className="mx-auto max-w-screen-xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Kelola Penulis (Authors)</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Tambah, ubah, atau hapus data penulis buku.</p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Penulis
          </button>
        </div>

        {/* Notif sukses */}
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-sm font-medium border border-green-200">
            {message}
          </div>
        )}

        {/* Tabel */}
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-4 w-16">No</th>
                  <th className="px-6 py-4">Nama Penulis</th>
                  <th className="px-6 py-4">Bio</th>
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
                ) : authors.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-400">
                      Belum ada penulis. Klik "Tambah Penulis" untuk memulai.
                    </td>
                  </tr>
                ) : (
                  authors.map((author, index) => (
                    <tr key={author.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{author.name}</td>
                      <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                        {author.bio || <span className="italic text-gray-300">—</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenEdit(author)}
                            className="inline-flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(author)}
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

      {/* Modal Tambah / Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {editTarget ? "Edit Penulis" : "Tambah Penulis Baru"}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nama Penulis <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  placeholder="Contoh: J.K. Rowling, Andrea Hirata..."
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bio <span className="text-gray-400 font-normal">(opsional)</span>
                </label>
                <textarea
                  rows="3"
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  placeholder="Deskripsi singkat tentang penulis..."
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
                  {saving ? "Menyimpan..." : editTarget ? "Simpan Perubahan" : "Tambah Penulis"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}