import { useEffect, useState } from "react";
import { getContacts, updateContactStatus } from "../../../_services/contacts";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        setLoading(true);
        const data = await getContacts();  // GET /api/contacts
        setContacts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Gagal mengambil data pesan:", error);
      } finally {
        setLoading(false);
      }
    };
    loadContacts();
  }, []);

  const handleResolve = async (id) => {
    const confirmed = window.confirm("Tandai pesan ini sebagai selesai (Resolved)?");
    if (!confirmed) return;
    try {
      await updateContactStatus(id, "resolved");  // PUT /api/contacts/{id}
      setContacts((prev) =>
        prev.map((c) => c.id === id ? { ...c, status: "resolved" } : c)
      );
    } catch {
      alert("Gagal mengupdate status pesan.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 min-h-screen">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kotak Masuk (Pesan User)
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Daftar keluhan, pertanyaan, dan saran dari pengunjung website.
          </p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Memuat pesan...</div>
          ) : contacts.length > 0 ? (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-6 bg-white rounded-lg border shadow-sm dark:bg-gray-800 dark:border-gray-700 ${
                  contact.status === "unread"
                    ? "border-l-4 border-l-indigo-500"
                    : "opacity-70"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      {contact.name}
                      {contact.status === "unread" && (
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Baru
                        </span>
                      )}
                      {contact.status === "resolved" && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Selesai
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {contact.email} •{" "}
                      {new Date(contact.created_at).toLocaleString("id-ID")}
                    </p>
                  </div>

                  {contact.status === "unread" && (
                    <button
                      onClick={() => handleResolve(contact.id)}
                      className="text-sm text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Tandai Selesai
                    </button>
                  )}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-gray-700 dark:bg-gray-700 dark:text-gray-300 whitespace-pre-wrap border border-gray-100 dark:border-gray-600">
                  {contact.message}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <svg className="mx-auto w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Kotak masuk masih kosong.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}