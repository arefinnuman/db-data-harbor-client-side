import WelcomeSection from "@/components/Home/WelcomeSection";
import RootLayout from "@/layout/RootLayout";

export default function HomePage() {
  return (
    <main>
      <WelcomeSection />
    </main>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
