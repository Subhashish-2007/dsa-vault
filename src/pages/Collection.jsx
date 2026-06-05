import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiLink, FiPlus } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import ProblemCard from "../components/ProblemCard";
import { useTheme } from "../context/useTheme";

function Collection() {
  const { isDark } = useTheme();
  const { id } = useParams();
  const collectionId = Number(id);

  const [collections, setCollections] = useState(() => {
    const saved = localStorage.getItem("collections");
    return saved ? JSON.parse(saved) : [];
  });

  const [problemLink, setProblemLink] = useState("");

  const collection = collections.find((item) => item.id === collectionId);
  const problems = collection?.problems || [];
  const solved = problems.filter((problem) => problem.completed).length;
  const total = problems.length;
  const completion = total === 0 ? 0 : Math.round((solved / total) * 100);

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(collections));
  }, [collections]);

  const getPlatform = (url) => {
    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes("leetcode.com")) return "LeetCode";
    if (lowerUrl.includes("codeforces.com")) return "Codeforces";
    if (lowerUrl.includes("codechef.com")) return "CodeChef";
    if (lowerUrl.includes("atcoder.jp")) return "AtCoder";

    return "Unknown";
  };

  const getTitle = (url) => {
    if (url.includes("leetcode.com")) {
      const match = url.match(/problems\/([^/]+)/);

      if (!match) return "Unknown Problem";

      return match[1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    if (url.includes("codeforces.com")) {
      const match = url.match(/problem\/(\d+)\/([A-Z0-9]+)/i);

      if (match) {
        return `Problem ${match[1]}${match[2].toUpperCase()}`;
      }

      return "Codeforces Problem";
    }

    if (url.includes("codechef.com") || url.includes("atcoder.jp")) {
      const parts = url.split("/").filter(Boolean);
      return parts[parts.length - 1] || "Practice Problem";
    }

    return "Practice Problem";
  };

  const updateCollectionProblems = (updater) => {
    setCollections((prev) =>
      prev.map((item) =>
        item.id === collectionId
          ? {
              ...item,
              problems: updater(item.problems || []),
            }
          : item
      )
    );
  };

  const addProblem = () => {
    if (!problemLink.trim()) return;

    const trimmedLink = problemLink.trim();
    const newProblem = {
      id: Date.now(),
      title: getTitle(trimmedLink),
      platform: getPlatform(trimmedLink),
      link: trimmedLink,
      completed: false,
    };

    updateCollectionProblems((currentProblems) => [
      ...currentProblems,
      newProblem,
    ]);

    setProblemLink("");
  };

  const toggleProblem = (problemId) => {
    updateCollectionProblems((currentProblems) =>
      currentProblems.map((problem) =>
        problem.id === problemId
          ? {
              ...problem,
              completed: !problem.completed,
            }
          : problem
      )
    );
  };

  const deleteProblem = (problemId) => {
    updateCollectionProblems((currentProblems) =>
      currentProblems.filter((problem) => problem.id !== problemId)
    );
  };

  return (
    <div
      className={`flex min-h-screen transition ${
        isDark ? "bg-zinc-950" : "bg-orange-50/40"
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-8">
        <Link
          to="/practice"
          className={`mb-6 inline-flex items-center gap-2 text-sm font-bold transition ${
            isDark
              ? "text-zinc-400 hover:text-orange-400"
              : "text-zinc-500 hover:text-orange-700"
          }`}
        >
          <FiArrowLeft />
          Back to collections
        </Link>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <section
            className={`rounded-3xl border p-8 shadow-sm transition ${
              isDark
                ? "border-orange-500/25 bg-zinc-900 text-white"
                : "border-orange-100 bg-white text-zinc-950"
            }`}
          >
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-orange-500">
                  Collection
                </p>

                <h1 className="mt-2 text-4xl font-black tracking-tight">
                  {collection ? collection.name : "Collection Not Found"}
                </h1>

                <p
                  className={`mt-3 ${
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {solved} solved out of {total} saved problems.
                </p>
              </div>

              <div className="rounded-2xl bg-orange-500 px-5 py-4 text-white">
                <p className="text-sm font-semibold text-orange-100">
                  Progress
                </p>

                <p className="mt-1 text-3xl font-black">
                  {completion}%
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div
                className={`mb-2 flex justify-between text-sm font-semibold ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                <span>Solved {solved} / {total}</span>
                <span>{completion}%</span>
              </div>

              <div
                className={`h-3 overflow-hidden rounded-full ${
                  isDark ? "bg-zinc-700" : "bg-orange-100"
                }`}
              >
                <div
                  className="h-full rounded-full bg-orange-500 transition-all duration-300"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </section>

          {collection && (
            <section
              className={`rounded-3xl border p-6 shadow-sm transition ${
                isDark
                  ? "border-orange-500/25 bg-zinc-900"
                  : "border-orange-100 bg-white"
              }`}
            >
              <div className="flex h-full flex-col justify-center gap-4">
                <p className="text-sm font-bold uppercase tracking-wide text-orange-500">
                  Add Problem
                </p>

                <div className="relative">
                  <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />

                  <input
                    type="text"
                    placeholder="Paste problem link"
                    value={problemLink}
                    onChange={(event) => setProblemLink(event.target.value)}
                    className={`min-h-12 w-full rounded-xl border pl-11 pr-4 text-sm font-medium outline-none transition placeholder:text-zinc-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20 ${
                      isDark
                        ? "border-orange-500/25 bg-zinc-800 text-white"
                        : "border-orange-100 bg-orange-50/50 text-zinc-950 focus:bg-white"
                    }`}
                  />
                </div>

                <button
                  onClick={addProblem}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-bold text-white shadow-lg shadow-orange-200/50 transition hover:bg-orange-600"
                >
                  <FiPlus />
                  Add Problem
                </button>
              </div>
            </section>
          )}
        </div>

        <section className="mt-8">
          {collection && problems.length === 0 && (
            <div
              className={`rounded-3xl border border-dashed p-10 text-center shadow-sm transition ${
                isDark
                  ? "border-orange-500/30 bg-zinc-900 text-white"
                  : "border-orange-200 bg-white text-zinc-950"
              }`}
            >
              <h2 className="text-xl font-bold">
                No problems added
              </h2>

              <p
                className={`mt-2 ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Paste a LeetCode, Codeforces, CodeChef, or AtCoder link above.
              </p>
            </div>
          )}

          {collection && problems.length > 0 && (
            <div className="flex flex-col gap-3">
              {problems.map((problem) => (
                <ProblemCard
                  key={problem.id}
                  problem={problem}
                  onToggle={toggleProblem}
                  onDelete={deleteProblem}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Collection;
