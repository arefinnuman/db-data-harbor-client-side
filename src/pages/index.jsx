import RootLayout from "@/layout/RootLayout";

export default function HomePage() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <h1 className="text-5xl font-bold">Welcome to DB Data Harbor</h1>
    </main>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

