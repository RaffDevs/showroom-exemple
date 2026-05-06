export type ShowroomItem = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  price: string;
  category: string;
  whatsappMessage: string;
};

export const showroomItems: ShowroomItem[] = [
  {
    id: "vaso-areia",
    name: "Vaso Decorativo Areia",
    shortName: "Vaso",
    description:
      "Peça delicada em tons neutros para compor salas, aparadores e mesas laterais.",
    price: "Sob consulta",
    category: "Decoração",
    whatsappMessage:
      "Olá! Tenho interesse no Vaso Decorativo Areia que vi no showroom.",
  },
  {
    id: "quadro-organico",
    name: "Quadro Orgânico",
    shortName: "Quadro",
    description:
      "Arte minimalista com formas naturais para trazer leveza e personalidade ao ambiente.",
    price: "Sob consulta",
    category: "Parede",
    whatsappMessage:
      "Olá! Tenho interesse no Quadro Orgânico que vi no showroom.",
  },
  {
    id: "luminaria-dourada",
    name: "Luminária Dourada",
    shortName: "Luminária",
    description:
      "Iluminação decorativa com acabamento elegante para criar um clima mais acolhedor.",
    price: "Sob consulta",
    category: "Iluminação",
    whatsappMessage:
      "Olá! Tenho interesse na Luminária Dourada que vi no showroom.",
  },
  {
    id: "almofadas-linho",
    name: "Almofadas em Linho",
    shortName: "Almofadas",
    description:
      "Texturas suaves e cores neutras para deixar o sofá mais confortável e sofisticado.",
    price: "Sob consulta",
    category: "Têxteis",
    whatsappMessage:
      "Olá! Tenho interesse nas Almofadas em Linho que vi no showroom.",
  },
  {
    id: "mesa-lateral",
    name: "Mesa Lateral Freijó",
    shortName: "Mesa",
    description:
      "Mesa lateral compacta para apoiar livros, vasos e objetos decorativos.",
    price: "Sob consulta",
    category: "Móveis",
    whatsappMessage:
      "Olá! Tenho interesse na Mesa Lateral Freijó que vi no showroom.",
  },
];
