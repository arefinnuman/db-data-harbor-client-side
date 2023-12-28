import DetailsSection from "@/components/HomePage/DetailsSection";
import WarningSection from "@/components/HomePage/WarningSection";
import WelcomeSection from "@/components/HomePage/WelcomeSection";
import DashboardLayout from "@/layout/RootLayout";

export default function HomePage() {
  return (
    <main>
      <WelcomeSection />
      <DetailsSection />
      <WarningSection />
    </main>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
