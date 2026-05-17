export default function About() {
  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen pt-16">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Membangun Jendela Dunia Melalui Buku
          </h2>
          <p className="mb-4">
            Kami di BookStore percaya bahwa setiap buku memiliki kekuatan untuk mengubah perspektif dan menginspirasi hidup. Berdiri sejak tahun 2024, kami mendedikasikan diri untuk menyediakan koleksi buku terbaik dari berbagai genre untuk para pembaca setia di seluruh Indonesia.
          </p>
          <p>
            Mulai dari fiksi yang menegangkan, pengembangan diri yang memotivasi, hingga literatur klasik yang abadi—semuanya kami kurasi dengan penuh cinta. Kami bukan hanya sebuah toko buku, melainkan komunitas bagi mereka yang terus mencari ilmu dan petualangan di setiap lembaran kertas.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8 lg:mt-0">
          <img
            className="w-full rounded-lg shadow-lg"
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Perpustakaan"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg shadow-lg"
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Buku-buku"
          />
        </div>
      </div>
    </section>
  );
}
