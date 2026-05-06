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
  src: "/panoramas/showroom-optimized.jpg",
  alt: "Panorama 360 de uma sala residencial em tons neutros com sofá, cadeira, mesa de centro e objetos decorativos.",
  width: 2560,
  height: 1280,
  overview: {
    textureX: 1920,
    textureY: 860,
    zoom: 18,
  } satisfies PanoramaViewport,
  hotspots: [
    {
      id: "quadro-organico",
      itemId: "quadro-organico",
      label: "Ver detalhes do quadro orgânico",
      shortLabel: "1",
      textureX: 1873,
      textureY: 557,
      zoom: 47,
    },
    {
      id: "luminaria-dourada",
      itemId: "luminaria-dourada",
      label: "Ver detalhes da luminária dourada",
      shortLabel: "2",
      textureX: 2283,
      textureY: 703,
      zoom: 49,
    },
    {
      id: "almofadas-linho",
      itemId: "almofadas-linho",
      label: "Ver detalhes das almofadas em linho",
      shortLabel: "3",
      textureX: 1990,
      textureY: 823,
      zoom: 52,
    },
    {
      id: "mesa-lateral",
      itemId: "mesa-lateral",
      label: "Ver detalhes da mesa lateral freijó",
      shortLabel: "4",
      textureX: 2193,
      textureY: 993,
      zoom: 54,
    },
    {
      id: "vaso-areia",
      itemId: "vaso-areia",
      label: "Ver detalhes do vaso decorativo areia",
      shortLabel: "5",
      textureX: 1627,
      textureY: 687,
      zoom: 48,
    },
  ] satisfies ShowroomPanoramaHotspot[],
};
