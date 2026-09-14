import { ContactPage } from "@/components/studio/Studio";
export const metadata = { title: "Start Your Project — Flowcraft" };
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const { interest } = await searchParams;
  return (
    <ContactPage
      initialInterest={typeof interest === "string" ? interest : ""}
    />
  );
}
