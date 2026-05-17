import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems, removeFromCart, updateCartQuantity } from "../../_services/cart";
import { createTransaction } from "../../_services/order";

export default function Cart() {
  const [cartItems, setCartItems]             = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [paymentMethod, setPaymentMethod]     = useState("cod");

  const navigate = useNavigate();


  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        const data = await getCartItems();
        setCartItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Gagal menghapus item");
    }
  };

  const handleUpdateQty = async (id, newQty) => {
    if (newQty < 1) return;
    try {
      await updateCartQuantity(id, newQty);
      setCartItems((prev) =>
        prev.map((item) => item.id === id ? { ...item, quantity: newQty } : item)
      );
    } catch {
      alert("Gagal update jumlah");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.book.price * item.quantity), 0
  );

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    try {
      setCheckoutLoading(true);
      for (const item of cartItems) {
        await createTransaction({
          book_id:        item.book_id,
          quantity:       item.quantity,
          total_amount:   item.book.price * item.quantity,
          payment_method: paymentMethod,
        });
      }
      const metodeBayarLabel = paymentMethod === "cod" ? "Bayar di Tempat (COD)" : paymentMethod;
      let message = "Halo Admin, saya ingin memesan buku berikut:\n\n";
      cartItems.forEach((item, index) => {
        message += `${index + 1}. ${item.book.title} (Qty: ${item.quantity}) - Rp${(item.book.price * item.quantity).toLocaleString()}\n`;
      });
      message += `\nTotal Harga  : Rp${totalPrice.toLocaleString()}`;
      message += `\nMetode Bayar : ${metodeBayarLabel}`;
      message += `\n\nMohon segera diproses ya, terima kasih!`;
      const waURL = `https://wa.me/6289507663218?text=${encodeURIComponent(message)}`;
      window.open(waURL, "_blank");
      navigate("/checkout-success", {
        state: { waURL, totalHarga: totalPrice, itemCount: cartItems.length }
      });
    } catch (error) {
      console.error("Checkout Gagal:", error);
      alert("Terjadi kesalahan saat checkout. Silakan coba lagi.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center">Memuat keranjang...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 min-h-screen">
      <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        Keranjang Belanja
      </h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 mb-6 font-medium">Keranjang kamu masih kosong nih.</p>
          <Link to="/books" className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            Mulai Belanja
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 items-center">
                <img
                  src={`http://localhost:8000/storage/books/${item.book.cover_photo}`}
                  className="w-20 h-28 object-cover rounded-lg shadow-sm"
                  alt={item.book.title}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 leading-tight mb-1">{item.book.title}</h3>
                  <p className="text-indigo-600 font-black text-sm mb-3">
                    Rp{Number(item.book.price).toLocaleString("id-ID")}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <button onClick={() => handleUpdateQty(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-gray-200">-</button>
                      <span className="px-4 py-1 text-xs font-bold bg-white border-x border-gray-200">{item.quantity}</span>
                      <button onClick={() => handleUpdateQty(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-gray-200">+</button>
                    </div>
                    <button onClick={() => handleRemove(item.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-6">Ringkasan Belanja</h2>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Total Item</span>
              <span className="font-bold text-gray-900">{cartItems.length} Buku</span>
            </div>
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Total Harga</span>
                <span className="text-2xl font-black text-indigo-600">
                  Rp{totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-3">Metode Pembayaran</p>
              <label className="flex items-center gap-3 p-3 border-2 border-indigo-500 rounded-xl bg-indigo-50 cursor-pointer">
                <input
                  type="radio"
                  name="payment_method"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="accent-indigo-600 w-4 h-4"
                />
                <div>
                  <p className="text-sm font-bold text-gray-900">Bayar di Tempat (COD)</p>
                  <p className="text-xs text-gray-500">Bayar saat buku tiba di tangan kamu</p>
                </div>
              </label>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:bg-gray-300"
            >
              {checkoutLoading ? "Memproses..." : "Checkout via WhatsApp"}
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-4 leading-relaxed px-4">
              *Pesanan kamu akan tercatat di sistem dan dilanjutkan via WhatsApp Admin.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}