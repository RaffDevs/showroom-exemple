export type PanoramaViewport = {
  textureX: number;
  textureY: number;
  zoom: number;
};

export type ShowroomPanoramaHotspot = {
  id: string;
  itemId: string;
  label: string;
  shortLabel: string;
  textureX: number;
  textureY: number;
  zoom: number;
};

export const showroomPanorama = {
  src: "/panoramas/showroom.webp",
  alt: "Panorama 360 de uma sala residencial em tons neutros com sofá, cadeira, mesa de centro e objetos decorativos.",
  width: 3840,
  height: 1920,
  overview: {
    textureX: 2880,
    textureY: 1290,
    zoom: 18,
  } satisfies PanoramaViewport,
  hotspots: [
    {
      id: "quadro-organico",
      itemId: "quadro-organico",
      label: "Ver detalhes do quadro orgânico",
      shortLabel: "1",
      textureX: 2810,
      textureY: 835,
      zoom: 47,
    },
    {
      id: "luminaria-dourada",
      itemId: "luminaria-dourada",
      label: "Ver detalhes da luminária dourada",
      shortLabel: "2",
      textureX: 3425,
      textureY: 1055,
      zoom: 49,
    },
    {
      id: "almofadas-linho",
      itemId: "almofadas-linho",
      label: "Ver detalhes das almofadas em linho",
      shortLabel: "3",
      textureX: 2985,
      textureY: 1235,
      zoom: 52,
    },
    {
      id: "mesa-lateral",
      itemId: "mesa-lateral",
      label: "Ver detalhes da mesa lateral freijó",
      shortLabel: "4",
      textureX: 3290,
      textureY: 1490,
      zoom: 54,
    },
    {
      id: "vaso-areia",
      itemId: "vaso-areia",
      label: "Ver detalhes do vaso decorativo areia",
      shortLabel: "5",
      textureX: 2440,
      textureY: 1030,
      zoom: 48,
    },
  ] satisfies ShowroomPanoramaHotspot[],
};
