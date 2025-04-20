const sheetLink = "https://docs.google.com/spreadsheets/d/1-C6l615Fx8oP_X0VFjTiy6-2txplF8AteGZZIfuTbzY/export?format=csv&gid=";
const pciLink = "https://docs.google.com/spreadsheets/d/1pDUSmeC9pmCqjpZUMn92aHfkN9kMUW780MsQ3M52jpE/export?format=csv&gid="
const ATNgid = import.meta.env.VITE_ATN_GID
const PCIgid = import.meta.env.VITE_PCI_GID

/**
 * Link for ATN
 * 
 * @returns the link for downloading ATN buildings
 */
export const sheetsLink = () => {
  return `${sheetLink}${ATNgid}`;
};

/**
 * Link for PCI
 * 
 * @returns the link for downloading PCI buildings
 */
export const PciLink = () : string => {
  return `${pciLink}${PCIgid}`
}
