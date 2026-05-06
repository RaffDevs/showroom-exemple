import { InteractiveShowroom } from "@/components/InteractiveShowroom";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(157,112,83,0.22),transparent_56%)]"
      />

      <InteractiveShowroom />
    </main>
  );
}
