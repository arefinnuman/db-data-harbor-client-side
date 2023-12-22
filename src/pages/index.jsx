import WarningSection from "@/components/HomePage/WarningSection";
import DashboardLayout from "@/layout/RootLayout";

export default function HomePage() {
  return (
    <main>
      <WarningSection />
    </main>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
