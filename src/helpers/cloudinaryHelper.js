export function getCloudinaryFileIdFromUrl({ url, useExt = false }) {
  const parts = url.split('/');
  if (useExt) return `${parts[parts.length - 2]}/${parts[parts.length - 1]}`;
  return `${parts[parts.length - 2]}/${parts[parts.length - 1].slice(0, parts[parts.length - 1].lastIndexOf('.'))}`;
}
