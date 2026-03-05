export const PAKISTAN_CITIES = [
  // Sindh
  "Karachi",
  "Hyderabad",
  "Sukkur",
  "Larkana",
  "Nawabshah",
  "Mirpur Khas",
  "Jacobabad",
  "Shikarpur",
  "Khairpur",
  "Dadu",
  
  // Punjab
  "Lahore",
  "Faisalabad",
  "Rawalpindi",
  "Multan",
  "Gujranwala",
  "Sialkot",
  "Bahawalpur",
  "Sargodha",
  "Sheikhupura",
  "Jhang",
  "Rahim Yar Khan",
  "Gujrat",
  "Kasur",
  "Sahiwal",
  "Okara",
  "Wah Cantonment",
  "Dera Ghazi Khan",
  "Chiniot",
  "Kamoke",
  "Mandi Burewala",
  
  // Khyber Pakhtunkhwa
  "Peshawar",
  "Mardan",
  "Abbottabad",
  "Mingora",
  "Kohat",
  "Dera Ismail Khan",
  "Swabi",
  "Charsadda",
  "Nowshera",
  "Mansehra",
  
  // Balochistan
  "Quetta",
  "Turbat",
  "Khuzdar",
  "Hub",
  "Chaman",
  "Gwadar",
  "Sibi",
  
  // Islamabad Capital Territory
  "Islamabad",
  
  // Azad Kashmir
  "Muzaffarabad",
  "Mirpur",
  "Kotli",
  "Rawalakot",
  
  // Gilgit-Baltistan
  "Gilgit",
  "Skardu",
] as const;

export type City = typeof PAKISTAN_CITIES[number];

// Shipping costs
export const SHIPPING_COSTS = {
  Karachi: 400,
  default: 600, 
};

export const getShippingCost = (city: string): number => {
  return city === "Karachi" ? SHIPPING_COSTS.Karachi : SHIPPING_COSTS.default;
}