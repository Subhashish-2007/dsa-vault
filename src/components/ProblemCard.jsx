import { FiCheck, FiExternalLink, FiTrash2 } from "react-icons/fi";
import { SiCodechef, SiCodeforces, SiLeetcode } from "react-icons/si";
import { useTheme } from "../context/useTheme";

const platformIcons = {
  LeetCode: SiLeetcode,
  Codeforces: SiCodeforces,
  CodeChef: SiCodechef,
};

function ProblemCard({ problem, onToggle, onDelete }) {
  const { isDark } = useTheme();
  const PlatformIcon = platformIcons[problem.platform];

  return (
    <article
      className={`rounded-2xl border p-4 shadow-sm transition ${
        problem.completed
          ? isDark
            ? "border-green-500/50 bg-[#003f00a3] text-white"
            : "border-green-200 bg-green-50 text-zinc-950"
          : isDark
            ? "border-orange-500/25 bg-zinc-900 text-white hover:border-orange-500/60 hover:bg-zinc-800"
            : "border-orange-100 bg-white text-zinc-950 hover:border-orange-300 hover:shadow-md"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span
              title={problem.platform}
              className={`${problem.completed
                ?"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-lg   text-green-500 ring-1 ring-green-500/30"
                :"flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-lg   text-orange-500 ring-1 ring-orange-500/30"}`}
            >
              {PlatformIcon ? (
                <PlatformIcon />
              ) : problem.platform === "AtCoder" ? (
                <span className="text-[10px] font-black">AC</span>
              ) : (
                <span className="text-xs font-black">?</span>
              )}
            </span>

            <a
              href={problem.link}
              target="_blank"
              rel="noreferrer"
              className={`group inline-flex min-w-0 items-center gap-2 text-base font-bold ${
                problem.completed
                  ? "text-[#00ff00]"
                  : "hover:text-orange-500"
              }`}
            >
              <span className="truncate">{problem.title}</span>
              <FiExternalLink className="shrink-0 text-sm opacity-50 transition group-hover:opacity-100" />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {problem.completed && (
            <span className="bg-[#00ff001e] border-[1px] px-[7px] py-[5px]  rounded-[14px] border-green-400 flex items-center gap-1 text-xs font-bold text-[#00ff00]">
              <FiCheck />
              Solved
            </span>
          )}
          <label
            className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
              isDark
              ? problem.completed
                ?"border-green-500/25 bg-green-800 text-zinc-300 hover:border-green-500/50 hover:text-green-400"
                :"border-orange-500/25 bg-zinc-800 text-zinc-300 hover:border-orange-500/50 hover:text-orange-400"
              : problem.completed
                ?"border-green-200 bg-white text-green-600 hover:border-green-300 hover:text-green-700"
                :"border-orange-200 bg-white text-zinc-600 hover:border-orange-300 hover:text-orange-700"
            }
            
            `}
          >
            <input
              type="checkbox"
              checked={problem.completed}
              onChange={() => onToggle(problem.id)}
              className={ `h-4 w-4 accent-[#00ff00]`}
            />
            Done
          </label>

          <button
            onClick={() => onDelete(problem.id)}
            className={`rounded-xl border p-2 transition text-red-500`}
            title="Delete problem"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProblemCard;
