"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EquirectangularAdapter, Viewer } from "@photo-sphere-viewer/core";
import { MarkersPlugin, type MarkerConfig } from "@photo-sphere-viewer/markers-plugin";

import { showroomPanorama } from "@/data/showroom-panorama";
import { showroomItems, type ShowroomItem } from "@/data/showroom-items";
import { createWhatsappLink } from "@/lib/showroom";

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65 },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 18, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -18, scale: 0.98 },
};

const ORDERED_HOTSPOTS = showroomPanorama.hotspots;

function textureToSpherical(textureX: number, textureY: number) {
  const yaw = (textureX / showroomPanorama.width) * 360 - 180;
  const pitch = 90 - (textureY / showroomPanorama.height) * 180;

  return {
    yaw: `${yaw.toFixed(2)}deg`,
    pitch: `${pitch.toFixed(2)}deg`,
  };
}

export function InteractiveShowroom() {
  const viewerElementRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const markersPluginRef = useRef<MarkersPlugin | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isViewerReady, setIsViewerReady] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [viewerError, setViewerError] = useState<string | null>(null);

  const itemsById = useMemo(
    () =>
      Object.fromEntries(showroomItems.map((item) => [item.id, item])) as Record<
        string,
        ShowroomItem
      >,
    [],
  );

  const activeIndex = activeItemId
    ? ORDERED_HOTSPOTS.findIndex((hotspot) => hotspot.itemId === activeItemId)
    : -1;
  const activeItem = activeItemId ? itemsById[activeItemId] : null;

  useEffect(() => {
    let cancelled = false;
    const container = viewerElementRef.current;

    if (!container) {
      return;
    }

    try {
      const markerConfigs: MarkerConfig[] = ORDERED_HOTSPOTS.map((hotspot) => ({
        id: hotspot.id,
        position: {
          textureX: hotspot.textureX,
          textureY: hotspot.textureY,
        },
        html: `<div class="showroom-marker__dot">${hotspot.shortLabel}</div>`,
        anchor: "center center",
        className: "showroom-marker",
        tooltip: {
          content: hotspot.label,
          position: "top center",
        },
        size: {
          width: 44,
          height: 44,
        },
      }));

      const viewer = new Viewer({
        container,
        adapter: EquirectangularAdapter,
        panorama: {
          path: showroomPanorama.src,
        },
        touchmoveTwoFingers: false,
        mousewheelCtrlKey: false,
        navbar: ["zoom", "move", "fullscreen"],
        defaultZoomLvl: showroomPanorama.overview.zoom,
        ...textureToSpherical(
          showroomPanorama.overview.textureX,
          showroomPanorama.overview.textureY,
        ),
        plugins: [
          MarkersPlugin.withConfig({
            clickEventOnMarker: true,
            gotoMarkerSpeed: 700,
            markers: markerConfigs,
          }),
        ],
      });

      const markers = viewer.getPlugin<MarkersPlugin>(MarkersPlugin);
      viewerRef.current = viewer;
      markersPluginRef.current = markers;

      viewer.addEventListener("ready", () => {
        if (cancelled) {
          return;
        }

        // The viewer sometimes mounts before the grid/card layout settles.
        // Force a few resizes after paint so the panorama renders at full size immediately.
        requestAnimationFrame(() => {
          viewer.autoSize();

          requestAnimationFrame(() => {
            viewer.autoSize();
          });
        });

        setIsViewerReady(true);
        setViewerError(null);
      });

      viewer.addEventListener("before-animate", () => {
        if (!cancelled) {
          setIsMoving(true);
        }
      });

      markers.addEventListener("select-marker", ({ marker }) => {
        if (cancelled) {
          return;
        }

        const hotspot = ORDERED_HOTSPOTS.find((entry) => entry.id === marker.id);

        if (!hotspot) {
          return;
        }

        setActiveItemId(hotspot.itemId);
        setIsMoving(true);
        viewer
          .animate({
            ...textureToSpherical(hotspot.textureX, hotspot.textureY),
            zoom: hotspot.zoom,
            speed: 700,
          })
          .then(() => {
            if (!cancelled) {
              setIsMoving(false);
            }
          });
      });

      resizeObserverRef.current = new ResizeObserver(() => {
        viewer.autoSize();
      });

      resizeObserverRef.current.observe(container);
    } catch (error) {
      console.error("Panorama viewer failed to initialize", error);
      setViewerError("Nao foi possivel carregar o panorama 360.");
    }

    return () => {
      cancelled = true;
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      markersPluginRef.current = null;
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, []);

  const focusHotspot = (hotspotId: string) => {
    const hotspot = ORDERED_HOTSPOTS.find((entry) => entry.id === hotspotId);
    const viewer = viewerRef.current;

    if (!hotspot || !viewer) {
      return;
    }

    setActiveItemId(hotspot.itemId);
    setIsMoving(true);

    viewer
      .animate({
        ...textureToSpherical(hotspot.textureX, hotspot.textureY),
        zoom: hotspot.zoom,
        speed: 700,
      })
      .then(() => setIsMoving(false));
  };

  const goToOverview = () => {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    setActiveItemId(null);
    setIsMoving(true);

    viewer
      .animate({
        ...textureToSpherical(
          showroomPanorama.overview.textureX,
          showroomPanorama.overview.textureY,
        ),
        zoom: showroomPanorama.overview.zoom,
        speed: 800,
      })
      .then(() => setIsMoving(false));
  };

  const goToAdjacentItem = (direction: "prev" | "next") => {
    if (ORDERED_HOTSPOTS.length === 0) {
      return;
    }

    const baseIndex = activeIndex >= 0 ? activeIndex : 0;
    const nextIndex =
      direction === "next"
        ? (baseIndex + 1) % ORDERED_HOTSPOTS.length
        : (baseIndex - 1 + ORDERED_HOTSPOTS.length) % ORDERED_HOTSPOTS.length;

    focusHotspot(ORDERED_HOTSPOTS[nextIndex].id);
  };

  return (
    <motion.section
      aria-labelledby="interactive-showroom-heading"
      className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <div className="mb-8 max-w-3xl sm:mb-10">
        <p className="mb-3 inline-flex rounded-full border border-clay/20 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-clay shadow-sm backdrop-blur">
          Showroom 360
        </p>
        <h2
          id="interactive-showroom-heading"
          className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-none text-ink sm:text-5xl lg:text-6xl"
        >
          Explore nosso showroom - Tassi Decor Exemplo
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/70 sm:text-base">
          Arraste o ambiente, clique nos marcadores e navegue pelo panorama para conhecer cada
          peça com uma sensação de visita mais real.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.85fr)_minmax(340px,1fr)] lg:items-stretch">
        <div
          className={`showroom-panorama-shell relative overflow-hidden rounded-[2rem] border border-white/70 bg-showroom-grid p-3 shadow-ambient sm:p-4 ${
            activeItem ? "showroom-panorama-shell--sheet-open" : ""
          }`}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-[#f4ede5] sm:aspect-[5/4] lg:aspect-[16/11] lg:min-h-[680px] xl:aspect-[16/10]">
            <div
              ref={viewerElementRef}
              aria-label={showroomPanorama.alt}
              className="h-full w-full"
            />

            {viewerError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#f4ede5] px-6 text-center text-sm font-medium text-ink/70">
                {viewerError}
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3">
              <div className="rounded-2xl border border-white/18 bg-[#291c15]/52 px-4 py-3 text-white/88 backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
                  Navegação imersiva
                </p>
                <p className="mt-2 max-w-[15rem] text-sm leading-6">
                  {activeItem
                    ? `Foco em ${activeItem.shortName.toLowerCase()}`
                    : "Arraste para explorar e use os pontos para focar nos itens"}
                </p>
              </div>
              <div className="rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/78 backdrop-blur">
                {isMoving ? "Movendo" : isViewerReady ? "360 ativo" : "Carregando"}
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-[#291c15]/50 px-4 py-3 text-[11px] uppercase tracking-[0.25em] text-white/75 backdrop-blur sm:left-4 sm:right-auto sm:max-w-sm">
              Arraste para os lados ou toque nos marcadores numerados para aproximar o produto
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:self-stretch">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeItem?.id ?? "overview"}
              className="flex h-full min-h-[360px] flex-col justify-between rounded-[2rem] border border-white/80 bg-white/90 p-6 shadow-ambient backdrop-blur sm:p-8"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-clay">
                    {activeItem ? activeItem.category : "Visão geral"}
                  </p>
                  <span className="rounded-full border border-clay/15 bg-canvas px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/58">
                    {activeItem ? "Produto em foco" : "Panorama 360"}
                  </span>
                </div>

                <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-ink sm:text-[2.35rem]">
                  {activeItem ? activeItem.name : "Entre no ambiente e descubra cada detalhe"}
                </h3>

                <p className="mt-4 text-sm leading-7 text-ink/75 sm:text-base">
                  {activeItem
                    ? activeItem.description
                    : "Use o panorama para girar a cena livremente. Os marcadores conduzem a câmera para os itens em destaque e deixam a conversa comercial pronta para continuar no WhatsApp."}
                </p>

                {activeItem ? (
                  <div className="mt-8 rounded-[1.5rem] border border-sand/70 bg-canvas/65 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/50">
                      Faixa de preço
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-bronze">{activeItem.price}</p>
                  </div>
                ) : (
                  <div className="mt-8 grid gap-3 rounded-[1.5rem] border border-sand/70 bg-canvas/65 p-4 text-sm text-ink/70 sm:grid-cols-2">
                    <div>
                      <p className="font-semibold text-ink">Visita livre</p>
                      <p className="mt-1">
                        Gire a câmera para ler o espaço como se estivesse dentro do ambiente.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-ink">Hotspots guiados</p>
                      <p className="mt-1">
                        Cada marcador reposiciona a câmera e aproxima o olhar do item.
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-clay/20 bg-white px-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
                    onClick={() => goToAdjacentItem("prev")}
                    disabled={!isViewerReady || isMoving}
                  >
                    Item anterior
                  </button>
                  <button
                    type="button"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-clay/20 bg-white px-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
                    onClick={() => goToAdjacentItem("next")}
                    disabled={!isViewerReady || isMoving}
                  >
                    Próximo item
                  </button>
                  <button
                    type="button"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-clay/20 bg-white px-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45"
                    onClick={goToOverview}
                    disabled={!isViewerReady || isMoving}
                  >
                    Voltar ao ambiente
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <motion.a
                  href={createWhatsappLink(
                    activeItem
                      ? activeItem.whatsappMessage
                      : "Olá! Quero falar com um especialista sobre o showroom 360.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-bronze px-5 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(123,85,60,0.24)]"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeItem ? "Quero esse item" : "Falar com especialista"}
                </motion.a>

                {activeItem ? (
                  <motion.button
                    type="button"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-clay/25 bg-white px-5 text-sm font-semibold text-ink"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={goToOverview}
                  >
                    Limpar seleção
                  </motion.button>
                ) : null}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-5 rounded-[1.75rem] border border-white/80 bg-white/88 p-5 shadow-ambient backdrop-blur lg:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-clay">
          {activeItem ? activeItem.category : "Visão geral"}
        </p>
        <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-ink">
          {activeItem
            ? `${activeItem.name} selecionado`
            : "Toque em um ponto para abrir o detalhe do item"}
        </p>
        <p className="mt-3 text-sm leading-7 text-ink/72">
          {activeItem
            ? "O detalhe completo foi aberto no painel inferior para manter o panorama visível enquanto você navega."
            : "No mobile, os detalhes aparecem em um bottom sheet parcial para você continuar explorando o ambiente sem perder o contexto da cena."}
        </p>
      </div>

      <AnimatePresence>
        {activeItem ? (
          <>
            <motion.button
              key="mobile-sheet-backdrop"
              type="button"
              aria-label="Fechar detalhes do item"
              className="fixed inset-0 z-40 bg-[#201610]/35 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={goToOverview}
            />

            <motion.aside
              key={`mobile-sheet-${activeItem.id}`}
              aria-label={`Detalhes de ${activeItem.name}`}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-[2rem] border-t border-white/80 bg-white/96 px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4 shadow-[0_-24px_80px_rgba(51,39,34,0.22)] backdrop-blur lg:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-ink/12" />

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-clay">
                    {activeItem.category}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-[2rem] font-semibold leading-none text-ink">
                    {activeItem.name}
                  </h3>
                </div>

                <button
                  type="button"
                  aria-label="Fechar bottom sheet"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-clay/15 bg-canvas text-lg font-medium text-ink"
                  onClick={goToOverview}
                >
                  ×
                </button>
              </div>

              <p className="mt-4 text-sm leading-7 text-ink/75">{activeItem.description}</p>

              <div className="mt-6 rounded-[1.5rem] border border-sand/70 bg-canvas/75 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/50">
                  Faixa de preço
                </p>
                <p className="mt-2 text-2xl font-semibold text-bronze">{activeItem.price}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-clay/20 bg-white px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink disabled:cursor-not-allowed disabled:opacity-45"
                  onClick={() => goToAdjacentItem("prev")}
                  disabled={!isViewerReady || isMoving}
                >
                  Item anterior
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-clay/20 bg-white px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink disabled:cursor-not-allowed disabled:opacity-45"
                  onClick={() => goToAdjacentItem("next")}
                  disabled={!isViewerReady || isMoving}
                >
                  Próximo item
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <motion.a
                  href={createWhatsappLink(activeItem.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-bronze px-5 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(123,85,60,0.24)]"
                  whileTap={{ scale: 0.98 }}
                >
                  Quero esse item
                </motion.a>

                <button
                  type="button"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-clay/25 bg-white px-5 text-sm font-semibold text-ink"
                  onClick={goToOverview}
                >
                  Fechar detalhes
                </button>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
