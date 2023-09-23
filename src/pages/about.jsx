import RootLayout from "@/layout/RootLayout";

export default function AboutPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1>My name is Arefin Numan</h1>
    </div>
  );
}

AboutPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
