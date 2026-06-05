import { Link } from "react-router-dom";
import { FiGrid, FiMoon, FiSun, FiTarget } from "react-icons/fi";
import { useTheme } from "../context/useTheme";

function Sidebar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <aside
      className={`sticky top-0 flex h-screen w-72 flex-col border-r p-6 shadow-sm backdrop-blur transition ${
        isDark
          ? "border-orange-500/25 bg-zinc-900 text-white shadow-orange-950/20"
          : "border-orange-100 bg-white text-zinc-950"
      }`}
    >
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-xl font-black text-white shadow-lg shadow-orange-300/40">
          DV
        </div>

        <h1 className="mt-5 text-2xl font-black tracking-tight">
          DSA Vault
        </h1>

        <p
          className={`mt-2 text-sm leading-6 ${
            isDark ? "text-zinc-400" : "text-zinc-500"
          }`}
        >
          Build your practice library and track every solved problem.
        </p>
      </div>

      <nav className="mt-10 flex flex-col gap-2">
        <Link
          to="/"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
            isDark
              ? "text-zinc-300 hover:bg-orange-500/10 hover:text-orange-300"
              : "text-zinc-600 hover:bg-orange-50 hover:text-orange-700"
          }`}
        >
          <FiGrid className="text-lg" />
          Dashboard
        </Link>

        <Link
          to="/practice"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
            isDark
              ? "text-zinc-300 hover:bg-orange-500/10 hover:text-orange-300"
              : "text-zinc-600 hover:bg-orange-50 hover:text-orange-700"
          }`}
        >
          <FiTarget className="text-lg" />
          Practice
        </Link>
      </nav>

      <button
        onClick={toggleTheme}
        className={`mt-auto flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-bold transition ${
          isDark
            ? "border-orange-500/30 bg-zinc-800 text-orange-300 hover:bg-orange-500/10"
            : "border-orange-100 bg-orange-50 text-orange-700 hover:bg-orange-100"
        }`}
      >
        <span>{isDark ? "Dark Mode" : "Light Mode"}</span>
        {isDark ? <FiMoon /> : <FiSun />}
      </button>
    </aside>
  );
}

export default Sidebar;
