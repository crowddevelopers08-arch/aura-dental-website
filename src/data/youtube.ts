/**
 * Poster frame for a YouTube clip, served straight from YouTube so the repo
 * carries no local copies. `maxresdefault` is 1280x720 for every id we use;
 * Shorts arrive pillarboxed, and an `object-cover` crop to 9:16 lands exactly
 * on the vertical frame.
 */
export function youtubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}
