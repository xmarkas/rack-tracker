const sheetLink = "https://docs.google.com/spreadsheets/d/1-C6l615Fx8oP_X0VFjTiy6-2txplF8AteGZZIfuTbzY/export?format=csv&gid=";
//                     https://docs.google.com/spreadsheets/d/1-C6l615Fx8oP_X0VFjTiy6-2txplF8AteGZZIfuTbzY/edit?usp=sharing

// "https://docs.google.com/spreadsheets/d/1-C6l615Fx8oP_X0VFjTiy6-2txplF8AteGZZIfuTbzY/edit?gid=939283605#gid=939283605"

export const sheetsLink = () => {
  const gid = "939283605";
  const csvDownload = `${sheetLink}${gid}`;
  
  return csvDownload;
};
