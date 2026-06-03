import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/layout/Header";
import { CaseStudyPage } from "@/components/work/CaseStudyPage";
import { urlFor, hasImageAsset } from "@/sanity/lib/image";
import {
  CASE_STUDY_BY_SLUG_QUERY,
  CASE_STUDY_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import type { CaseStudy } from "@/sanity/types";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: CASE_STUDY_SLUGS_QUERY,
    tags: ["caseStudy"],
  });

  return slugs.filter(Boolean).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const params = await props.params;
  const caseStudy = await sanityFetch<CaseStudy | null>({
    query: CASE_STUDY_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ["caseStudy", `caseStudy:${params.slug}`],
  });

  if (!caseStudy) {
    return {};
  }

  const title =
    caseStudy.seo?.metaTitle ||
    `${caseStudy.project} — ${caseStudy.projectMeta.client}`;
  const description = caseStudy.seo?.metaDescription || caseStudy.intro || caseStudy.summary;

  const ogSource = caseStudy.seo?.ogImage ?? caseStudy.heroImage;
  const ogImageUrl = hasImageAsset(ogSource)
    ? urlFor(ogSource).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function WorkDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const caseStudy = await sanityFetch<CaseStudy | null>({
    query: CASE_STUDY_BY_SLUG_QUERY,
    params: { slug: params.slug },
    tags: ["caseStudy", `caseStudy:${params.slug}`],
  });

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Header />
      <CaseStudyPage data={caseStudy} />
    </>
  );
}
