import { Link } from "react-router-dom";
import { FiArrowRight, FiFolder, FiTrash2 } from "react-icons/fi";
import { useTheme } from "../context/useTheme";

function FolderCard({ collection, onDelete }) {
  const { isDark } = useTheme();
  const total = collection.problems?.length || 0;
  const solved =
    collection.problems?.filter((problem) => problem.completed).length || 0;

  return (
    <article
      className={`group rounded-2xl border p-5 shadow-sm transition hover:-translate-y-1 ${
        isDark
          ? "border-orange-500/25 bg-zinc-900 text-white hover:border-orange-500/60 hover:bg-zinc-800"
          : "border-orange-100 bg-white text-zinc-950 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
            <FiFolder className="text-xl" />
          </div>

          <div>
            <Link
              to={`/collection/${collection.id}`}
              className="text-lg font-bold hover:text-orange-500"
            >
              {collection.name}
            </Link>

            <p
              className={`mt-1 text-sm ${
                isDark ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              {solved} solved of {total} problems
            </p>
          </div>
        </div>

        <button
          onClick={() => onDelete(collection.id)}
          className={`rounded-lg p-2 transition ${
            isDark
              ? "text-zinc-500 hover:bg-red-500/10 hover:text-red-400"
              : "text-zinc-400 hover:bg-red-50 hover:text-red-600"
          }`}
          title="Delete collection"
        >
          <FiTrash2 />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div
          className={`h-2 w-28 overflow-hidden rounded-full ${
            isDark ? "bg-zinc-700" : "bg-orange-100"
          }`}
        >
          <div
            className="h-full rounded-full bg-orange-500"
            style={{
              width: `${total === 0 ? 0 : (solved / total) * 100}%`,
            }}
          />
        </div>

        <Link
          to={`/collection/${collection.id}`}
          className="flex items-center gap-2 text-sm font-semibold text-orange-500"
        >
          Open
          <FiArrowRight className="transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default FolderCard;
