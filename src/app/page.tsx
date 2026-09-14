import { Home } from "@/components/studio/Studio";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const { interest } = await searchParams;
  return (
    <Home initialInterest={typeof interest === "string" ? interest : ""} />
  );
}
