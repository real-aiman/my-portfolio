/**
 * Plain inline SVGs for GitHub/LinkedIn.
 *
 * lucide-react dropped brand/logo icons in newer releases (licensing),
 * so importing `Github`/`Linkedin` from it breaks depending on the
 * installed version. These two are small and stable enough to own
 * directly rather than depend on a third-party package for them.
 */

interface BrandIconProps {
  size?: number;
}

export function GithubIcon({ size = 18 }: BrandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 0C5.37 0 0 5.5 0 12.3c0 5.44 3.44 10.05 8.21 11.68.6.11.82-.27.82-.6 0-.29-.01-1.06-.02-2.08-3.34.75-4.04-1.65-4.04-1.65-.55-1.43-1.34-1.82-1.34-1.82-1.09-.77.08-.75.08-.75 1.2.09 1.84 1.26 1.84 1.26 1.07 1.87 2.81 1.33 3.49 1.02.11-.79.42-1.33.76-1.63-2.67-.31-5.47-1.37-5.47-6.1 0-1.35.47-2.45 1.24-3.31-.12-.31-.54-1.57.12-3.28 0 0 1.01-.33 3.3 1.26a11.2 11.2 0 0 1 6.01 0c2.29-1.59 3.3-1.26 3.3-1.26.66 1.71.24 2.97.12 3.28.77.86 1.24 1.96 1.24 3.31 0 4.74-2.81 5.79-5.48 6.09.43.38.81 1.13.81 2.28 0 1.65-.02 2.98-.02 3.38 0 .33.22.72.83.6C20.57 22.34 24 17.73 24 12.3 24 5.5 18.63 0 12 0Z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 18 }: BrandIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
