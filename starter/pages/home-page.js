export default function Page() {
  return (
    <main className="mt-24">
      <img src="/bg.png" alt="Mountains and forests with two cabins" />

      <div className="relative z-10 text-center">
        <h1 className="text-primary-50 mb-10 text-8xl font-normal tracking-tight">
          Welcome to paradise.
        </h1>
        <a
          href="/cabins"
          className="bg-accent-500 text-primary-800 hover:bg-accent-600 px-8 py-6 text-lg font-semibold transition-all"
        >
          Explore luxury cabins
        </a>
      </div>
    </main>
  );
}
