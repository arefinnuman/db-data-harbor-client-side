import Ebl365Components from "@/components/Ebl365/Ebl365Components";
import RootLayout from "@/layout/RootLayout";

export default function Ebl365Page() {
  return (
    <div>
      <Ebl365Components />
    </div>
  );
}

Ebl365Page.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

