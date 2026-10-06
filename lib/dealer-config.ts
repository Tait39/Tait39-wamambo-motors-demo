export const dealerConfig = {
  name: "WAMAMBO MOTORS ZW",
  location: "Harare City Centre, Harare, Zimbabwe",
  whatsappNumber: "263715299295",
  salesEmail: "ashleychiyangwa@yahoo.com",
  currency: "US$",
  enquiryMessage: "Hi Ashley, I’m interested in the Wamambo Motors vehicle shown on the demo website. Is it still available?",
} as const;

export function buildWhatsAppUrl(message: string = dealerConfig.enquiryMessage) {
  if (!dealerConfig.whatsappNumber) return "#contact";
  return "https://wa.me/" + dealerConfig.whatsappNumber + "?text=" + encodeURIComponent(message);
}

export function vehicleWhatsAppUrl(vehicleName: string, price: string) {
  return buildWhatsAppUrl(
    "Hi Ashley, I’m interested in the " + vehicleName + " listed at " + price + " on the Wamambo demo. Please let me know if you have a similar vehicle available."
  );
}
