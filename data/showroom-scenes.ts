const SHOWROOM_IMAGE =
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80";

export type ShowroomCamera = {
  x: number;
  y: number;
  scale: number;
  rotateX?: number;
  rotateY?: number;
  overlayOpacity?: number;
  blurOpacity?: number;
};

export type ShowroomHotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  targetSceneId: string;
  itemId?: string;
  variant?: "primary" | "secondary";
};

export type ShowroomScene = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  alt: string;
  itemId?: string;
  hotspots: ShowroomHotspot[];
  camera: ShowroomCamera;
  nextSceneId?: string;
  prevSceneId?: string;
};

export const showroomScenes: ShowroomScene[] = [
  {
    id: "overview",
    title: "Visão geral do ambiente",
    eyebrow: "Entrada do tour",
    description:
      "Comece pela leitura completa da sala e avance pelos pontos de interesse para sentir a composição do ambiente.",
    image: SHOWROOM_IMAGE,
    alt: "Sala de estar decorada com sofá, quadros, luminária e acessórios em tons neutros.",
    hotspots: [
      {
        id: "overview-quadro",
        label: "Ir para o quadro orgânico",
        x: 42,
        y: 28,
        targetSceneId: "quadro-organico-scene",
        itemId: "quadro-organico",
      },
      {
        id: "overview-luminaria",
        label: "Ir para a luminária dourada",
        x: 78,
        y: 32,
        targetSceneId: "luminaria-dourada-scene",
        itemId: "luminaria-dourada",
      },
      {
        id: "overview-almofadas",
        label: "Ir para a composição do sofá",
        x: 36,
        y: 62,
        targetSceneId: "composicao-sofa-scene",
        itemId: "almofadas-linho",
      },
      {
        id: "overview-mesa",
        label: "Ir para a mesa lateral",
        x: 58,
        y: 70,
        targetSceneId: "mesa-lateral-scene",
        itemId: "mesa-lateral",
      },
      {
        id: "overview-vaso",
        label: "Ir para o vaso decorativo",
        x: 68,
        y: 54,
        targetSceneId: "vaso-areia-scene",
        itemId: "vaso-areia",
      },
    ],
    camera: {
      x: 0,
      y: 0,
      scale: 1,
      overlayOpacity: 0.18,
      blurOpacity: 0.08,
    },
    nextSceneId: "quadro-organico-scene",
  },
  {
    id: "quadro-organico-scene",
    title: "Primeira parada: parede com arte orgânica",
    eyebrow: "Cena 1",
    description:
      "A câmera se aproxima da área superior para destacar a arte e a moldura na composição da sala.",
    image: SHOWROOM_IMAGE,
    alt: "Close da parede com quadro orgânico acima do sofá em uma sala decorada.",
    itemId: "quadro-organico",
    hotspots: [
      {
        id: "quadro-focus",
        label: "Ver detalhes do quadro orgânico",
        x: 42,
        y: 28,
        targetSceneId: "quadro-organico-scene",
        itemId: "quadro-organico",
      },
      {
        id: "quadro-to-luminaria",
        label: "Avançar para a luminária dourada",
        x: 72,
        y: 31,
        targetSceneId: "luminaria-dourada-scene",
        itemId: "luminaria-dourada",
        variant: "secondary",
      },
    ],
    camera: {
      x: 12,
      y: 16,
      scale: 1.45,
      rotateX: 1.2,
      rotateY: -5,
      overlayOpacity: 0.24,
      blurOpacity: 0.18,
    },
    nextSceneId: "luminaria-dourada-scene",
    prevSceneId: "overview",
  },
  {
    id: "luminaria-dourada-scene",
    title: "Segunda parada: luz que puxa o olhar",
    eyebrow: "Cena 2",
    description:
      "A navegação desliza para o canto direito, simulando uma aproximação na iluminação e no clima do ambiente.",
    image: SHOWROOM_IMAGE,
    alt: "Close da luminária dourada ao lado do sofá em uma sala neutra e acolhedora.",
    itemId: "luminaria-dourada",
    hotspots: [
      {
        id: "luminaria-focus",
        label: "Ver detalhes da luminária dourada",
        x: 78,
        y: 32,
        targetSceneId: "luminaria-dourada-scene",
        itemId: "luminaria-dourada",
      },
      {
        id: "luminaria-to-sofa",
        label: "Avançar para a composição do sofá",
        x: 44,
        y: 58,
        targetSceneId: "composicao-sofa-scene",
        variant: "secondary",
      },
    ],
    camera: {
      x: -16,
      y: 11,
      scale: 1.52,
      rotateX: 0.6,
      rotateY: 6,
      overlayOpacity: 0.28,
      blurOpacity: 0.2,
    },
    nextSceneId: "composicao-sofa-scene",
    prevSceneId: "quadro-organico-scene",
  },
  {
    id: "composicao-sofa-scene",
    title: "Terceira parada: leitura da composição do sofá",
    eyebrow: "Cena 3",
    description:
      "Aqui a ideia é sentir o conjunto dos tecidos, volumes e texturas antes de entrar em uma peça específica.",
    image: SHOWROOM_IMAGE,
    alt: "Close do sofá com almofadas e objetos laterais em uma sala decorada.",
    hotspots: [
      {
        id: "sofa-to-almofadas",
        label: "Entrar nas almofadas em linho",
        x: 36,
        y: 62,
        targetSceneId: "almofadas-linho-scene",
        itemId: "almofadas-linho",
      },
      {
        id: "sofa-to-mesa",
        label: "Avançar para a mesa lateral",
        x: 58,
        y: 70,
        targetSceneId: "mesa-lateral-scene",
        itemId: "mesa-lateral",
        variant: "secondary",
      },
    ],
    camera: {
      x: 9,
      y: -10,
      scale: 1.38,
      rotateX: -0.8,
      rotateY: -3,
      overlayOpacity: 0.22,
      blurOpacity: 0.16,
    },
    nextSceneId: "almofadas-linho-scene",
    prevSceneId: "luminaria-dourada-scene",
  },
  {
    id: "almofadas-linho-scene",
    title: "Quarta parada: texturas e conforto",
    eyebrow: "Cena 4",
    description:
      "A aproximação agora favorece os tecidos do sofá para destacar maciez, trama e tons neutros da composição.",
    image: SHOWROOM_IMAGE,
    alt: "Close das almofadas em linho sobre o sofá em uma sala acolhedora.",
    itemId: "almofadas-linho",
    hotspots: [
      {
        id: "almofadas-focus",
        label: "Ver detalhes das almofadas em linho",
        x: 36,
        y: 62,
        targetSceneId: "almofadas-linho-scene",
        itemId: "almofadas-linho",
      },
      {
        id: "almofadas-to-mesa",
        label: "Avançar para a mesa lateral",
        x: 58,
        y: 70,
        targetSceneId: "mesa-lateral-scene",
        itemId: "mesa-lateral",
        variant: "secondary",
      },
    ],
    camera: {
      x: 20,
      y: -21,
      scale: 1.72,
      rotateX: -1.4,
      rotateY: -4,
      overlayOpacity: 0.28,
      blurOpacity: 0.2,
    },
    nextSceneId: "mesa-lateral-scene",
    prevSceneId: "composicao-sofa-scene",
  },
  {
    id: "mesa-lateral-scene",
    title: "Quinta parada: apoio e função no canto da sala",
    eyebrow: "Cena 5",
    description:
      "A cena desce para a leitura de apoio da mesa lateral e da composição dos objetos próximos ao assento.",
    image: SHOWROOM_IMAGE,
    alt: "Close da mesa lateral e dos objetos decorativos ao lado do sofá.",
    itemId: "mesa-lateral",
    hotspots: [
      {
        id: "mesa-focus",
        label: "Ver detalhes da mesa lateral freijó",
        x: 58,
        y: 70,
        targetSceneId: "mesa-lateral-scene",
        itemId: "mesa-lateral",
      },
      {
        id: "mesa-to-vaso",
        label: "Avançar para o vaso decorativo",
        x: 68,
        y: 54,
        targetSceneId: "vaso-areia-scene",
        itemId: "vaso-areia",
        variant: "secondary",
      },
    ],
    camera: {
      x: -3,
      y: -26,
      scale: 1.82,
      rotateX: -2.4,
      rotateY: 2.8,
      overlayOpacity: 0.3,
      blurOpacity: 0.24,
    },
    nextSceneId: "vaso-areia-scene",
    prevSceneId: "almofadas-linho-scene",
  },
  {
    id: "vaso-areia-scene",
    title: "Última parada: acabamento e delicadeza",
    eyebrow: "Cena 6",
    description:
      "O tour termina em um close de objeto decorativo para reforçar a sensação de curadoria refinada no ambiente.",
    image: SHOWROOM_IMAGE,
    alt: "Close de vaso decorativo em tons areia em uma sala residencial sofisticada.",
    itemId: "vaso-areia",
    hotspots: [
      {
        id: "vaso-focus",
        label: "Ver detalhes do vaso decorativo areia",
        x: 68,
        y: 54,
        targetSceneId: "vaso-areia-scene",
        itemId: "vaso-areia",
      },
      {
        id: "vaso-back-overview",
        label: "Voltar para a visão geral do ambiente",
        x: 50,
        y: 36,
        targetSceneId: "overview",
        variant: "secondary",
      },
    ],
    camera: {
      x: -18,
      y: -8,
      scale: 1.9,
      rotateX: -1.3,
      rotateY: 4.6,
      overlayOpacity: 0.34,
      blurOpacity: 0.26,
    },
    prevSceneId: "mesa-lateral-scene",
  },
];
