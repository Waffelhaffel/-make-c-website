import type { QueryParams } from "next-sanity";

import { client } from "./client";

type FetchOptions = {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
};

export async function sanityFetch<T = unknown>({
  query,
  params = {},
  tags,
  revalidate = 60,
}: FetchOptions): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}
