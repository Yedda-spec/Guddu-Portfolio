export function driveFileId(link) {
  const match = (link || "").match(/\/d\/([^/]+)/);
  return match ? match[1] : "";
}

export function driveEmbedUrl(link) {
  const id = driveFileId(link);
  return id ? `https://drive.google.com/file/d/${id}/preview` : link || "";
}

export function driveThumbnailUrl(link) {
  const id = driveFileId(link);
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w1000` : "";
}
