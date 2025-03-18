const sheetLink = "https://docs.google.com/spreadsheets/d/1-C6l615Fx8oP_X0VFjTiy6-2txplF8AteGZZIfuTbzY/export?format=csv&gid=";
const pciLink = "https://docs.google.com/spreadsheets/d/1pDUSmeC9pmCqjpZUMn92aHfkN9kMUW780MsQ3M52jpE/export?format=csv&gid="
const ATNgid = import.meta.env.VITE_ATN_GID
const PCIgid = import.meta.env.VITE_PCI_GID

export const sheetsLink = () => {
  return `${sheetLink}${ATNgid}`;
};

export const PciLink = () : string => {
  return `${pciLink}${PCIgid}`
}
