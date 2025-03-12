const sheetLink = "https://docs.google.com/spreadsheets/d/1-C6l615Fx8oP_X0VFjTiy6-2txplF8AteGZZIfuTbzY/export?format=csv&gid=";
const gid = import.meta.env.VITE_GID

export const sheetsLink = () => {
  const csvDownload = `${sheetLink}${gid}`;
  
  return csvDownload;
};

