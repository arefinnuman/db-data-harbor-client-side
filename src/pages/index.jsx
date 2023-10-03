import DashboardLayout from "@/layout/RootLayout";

export default function HomePage() {
  return (
    <main className="text-5xl font-bold ">
      <h1>It is Dashboard Page, I will do it later</h1>
    </main>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
