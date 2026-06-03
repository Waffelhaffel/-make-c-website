import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

// Syntactically valid but non-existent asset ref. Used only as a last-resort
// backstop so `urlFor(...).url()` never throws even if a call site forgets to
// guard with `hasImageAsset` — it yields a harmless (broken) URL instead of
// crashing the render. Real call sites should still guard and show a fallback.
const EMPTY_IMAGE = {
  _type: "image",
  asset: {
    _ref: "image-0000000000000000000000000000000000000000-1x1-png",
  },
};

/**
 * True only when the image actually has a usable asset reference.
 * After swapping/removing an image in Sanity, the field can exist while
 * `asset` is null — accessing `asset._ref` then throws at runtime.
 * Use this guard before rendering a Sanity image.
 */
export function hasImageAsset<T extends Image>(
  source: T | null | undefined
): source is T {
  return Boolean(
    (source as { asset?: { _ref?: string } } | null | undefined)?.asset?._ref
  );
}

export function urlFor(source: Image | null | undefined) {
  // Never pass an image without a valid asset into the builder, otherwise it
  // throws "Cannot read properties of null (reading '_ref')".
  return builder.image(hasImageAsset(source) ? source : EMPTY_IMAGE);
}
