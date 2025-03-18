const sheetLink = "https://docs.google.com/spreadsheets/d/1-C6l615Fx8oP_X0VFjTiy6-2txplF8AteGZZIfuTbzY/export?format=csv&gid=";
const pciLink = "https://docs.google.com/spreadsheets/d/1pDUSmeC9pmCqjpZUMn92aHfkN9kMUW780MsQ3M52jpE/export?format=csv&gid="
const gid = import.meta.env.VITE_GID
const PCIgid = '834466479'

export const sheetsLink = () => {
  return `${sheetLink}${gid}`;
};

export const PciLink = () => {
  return `${pciLink}${PCIgid}`
}
