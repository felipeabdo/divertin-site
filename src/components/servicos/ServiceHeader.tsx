import NavBar from "@/components/NavBar";

/** Cabeçalho compartilhado visualmente com as demais páginas internas. */
export default function ServiceHeader() {
  return (
    <header className="absolute inset-x-0 top-[25px] z-30 h-24 px-6">
      <div className="min-[1301px]:absolute min-[1301px]:left-1/2 min-[1301px]:top-8 min-[1301px]:-translate-x-1/2">
        <NavBar />
      </div>
    </header>
  );
}
