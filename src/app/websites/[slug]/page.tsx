import { websites } from "@/lib/catalog";
import { WebsiteProduct } from "@/components/studio/Studio";
import { notFound } from "next/navigation";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = websites.find((item) => item.slug === slug);
  return {
    title: product
      ? `${product.name} — Flowcraft Website Collection`
      : "Website not found — Flowcraft",
    description: product?.description,
  };
}
export function generateStaticParams() {
  return websites.map(({ slug }) => ({ slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = websites.find((p) => p.slug === slug);
  if (!product) notFound();
  return <WebsiteProduct product={product} />;
}
