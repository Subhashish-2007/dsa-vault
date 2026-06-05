import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiFolder,
  FiTrendingUp,
} from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/useTheme";

function Dashboard() {
  const { isDark } = useTheme();
  const collections = JSON.parse(localStorage.getItem("collections")) || [];

  const totalProblems = collections.reduce(
    (count, collection) => count + (collection.problems?.length || 0),
    0
  );

  const solvedProblems = collections.reduce(
    (count, collection) =>
      count +
      (collection.problems?.filter((problem) => problem.completed).length || 0),
    0
  );

  const completion =
    totalProblems === 0
      ? 0
      : Math.round((solvedProblems / totalProblems) * 100);

  const stats = [
    {
      label: "Collections",
      value: collections.length,
      icon: FiFolder,
    },
    {
      label: "Problems",
      value: totalProblems,
      icon: FiTrendingUp,
    },
    {
      label: "Solved",
      value: solvedProblems,
      icon: FiCheckCircle,
    },
  ];

  return (
    <div
      className={`flex min-h-screen transition ${
        isDark ? "bg-zinc-950" : "bg-orange-50/40"
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-8">
        <section
          className={`overflow-hidden rounded-3xl border shadow-xl transition ${
            isDark
              ? "border-orange-500/25 bg-zinc-900 text-white shadow-orange-950/30"
              : "border-orange-100 bg-white text-zinc-950 shadow-orange-100"
          }`}
        >
          <div className="p-8">
            <p className="text-sm font-bold uppercase tracking-wide text-orange-500">
              Dashboard
            </p>

            <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <h1 className="max-w-3xl text-5xl font-black tracking-tight">
                  Your DSA command center
                </h1>

                <p
                  className={`mt-4 max-w-2xl ${
                    isDark ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  Organize problems by topic, track progress, and keep your
                  practice sessions focused.
                </p>
              </div>

              <Link
                to="/practice"
                className="flex w-fit items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-black text-white transition hover:bg-orange-600"
              >
                Start Practice
                <FiArrowRight />
              </Link>
            </div>
          </div>

          <div
            className={`border-t px-8 py-5 ${
              isDark
                ? "border-orange-500/20 bg-orange-500/5"
                : "border-orange-100 bg-orange-50"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <span
                className={`text-sm font-semibold ${
                  isDark ? "text-zinc-300" : "text-zinc-600"
                }`}
              >
                Overall completion
              </span>

              <span className="text-sm font-black text-orange-500">
                {completion}%
              </span>
            </div>

            <div
              className={`mt-3 h-3 overflow-hidden rounded-full ${
                isDark ? "bg-zinc-700" : "bg-orange-100"
              }`}
            >
              <div
                className="h-full rounded-full bg-orange-500 transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className={`rounded-3xl border p-6 shadow-sm transition ${
                  isDark
                    ? "border-orange-500/20 bg-zinc-900 text-white"
                    : "border-orange-100 bg-white text-zinc-950"
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                  <Icon className="text-xl" />
                </div>

                <p
                  className={`mt-5 text-sm font-semibold ${
                    isDark ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {stat.label}
                </p>

                <p className="mt-2 text-4xl font-black">
                  {stat.value}
                </p>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
