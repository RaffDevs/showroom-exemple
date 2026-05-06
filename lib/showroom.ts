const WHATSAPP_PHONE = "5516999999999";

export function createWhatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
