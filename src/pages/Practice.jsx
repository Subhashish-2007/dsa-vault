import { useEffect, useState } from "react";
import { FiDownload, FiPlus, FiUpload } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import FolderCard from "../components/FolderCard";
import { useTheme } from "../context/useTheme";

function Practice() {
  const { isDark } = useTheme();
  const [collections, setCollections] = useState(() => {
    const saved = localStorage.getItem("collections");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [backupMessage, setBackupMessage] = useState("");

  const createCollection = () => {
    if (input.trim() === "") return;

    const newCollection = {
      id: Date.now(),
      name: input.trim(),
      problems: [],
    };

    setCollections((prev) => [...prev, newCollection]);
    setInput("");
  };

  const deleteCollection = (id) => {
    setCollections((prev) =>
      prev.filter((collection) => collection.id !== id)
    );
  };

  const exportCollections = () => {
    const backup = {
      app: "DSA Vault",
      exportedAt: new Date().toISOString(),
      collections,
    };

    const file = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = url;
    link.download = "dsa-vault-backup.json";
    link.click();
    URL.revokeObjectURL(url);

    setBackupMessage("Backup exported successfully.");
  };

  const importCollections = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsedBackup = JSON.parse(reader.result);
        const importedCollections = Array.isArray(parsedBackup)
          ? parsedBackup
          : parsedBackup.collections;

        if (!Array.isArray(importedCollections)) {
          throw new Error("Invalid backup file");
        }

        setCollections(importedCollections);
        setBackupMessage("Backup imported successfully.");
      } catch {
        setBackupMessage("Import failed. Please select a valid backup file.");
      }
    };

    reader.readAsText(file);
    event.target.value = "";
  };

  useEffect(() => {
    localStorage.setItem("collections", JSON.stringify(collections));
  }, [collections]);

  return (
    <div
      className={`flex min-h-screen transition ${
        isDark ? "bg-zinc-950" : "bg-orange-50/40"
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-8">
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
                Collections
              </p>

              <h1 className="mt-2 text-4xl font-black tracking-tight">
                Practice Library
              </h1>

              <p
                className={`mt-3 max-w-2xl ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Create focused folders for topics, contests, interview prep,
                and revision lists.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 lg:w-auto">
              <div className="flex gap-3">
                <button
                  onClick={exportCollections}
                  title="Export backup"
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border text-lg transition ${
                    isDark
                      ? "border-orange-500/30 bg-zinc-800 text-orange-300 hover:bg-orange-500/10"
                      : "border-orange-100 bg-orange-50 text-orange-700 hover:bg-orange-100"
                  }`}
                >
                  <FiDownload />
                </button>

                <label
                  title="Import backup"
                  className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border text-lg transition ${
                    isDark
                      ? "border-orange-500/30 bg-zinc-800 text-orange-300 hover:bg-orange-500/10"
                      : "border-orange-100 bg-orange-50 text-orange-700 hover:bg-orange-100"
                  }`}
                >
                  <FiUpload />
                  <input
                    type="file"
                    accept="application/json"
                    onChange={importCollections}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex w-full gap-3 lg:w-auto">
                <input
                  type="text"
                  placeholder="Collection name"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className={`min-h-11 flex-1 rounded-xl border px-4 text-sm font-medium outline-none transition placeholder:text-zinc-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20 lg:w-80 ${
                    isDark
                      ? "border-orange-500/25 bg-zinc-800 text-white"
                      : "border-orange-100 bg-orange-50/50 text-zinc-950 focus:bg-white"
                  }`}
                />

                <button
                  onClick={createCollection}
                  className="flex min-h-11 items-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  <FiPlus />
                  Create
                </button>
              </div>

              {backupMessage && (
                <p
                  className={`text-sm font-semibold ${
                    isDark ? "text-zinc-300" : "text-zinc-600"
                  }`}
                >
                  {backupMessage}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-8">
          {collections.length === 0 ? (
            <div
              className={`rounded-3xl border border-dashed p-10 text-center shadow-sm transition ${
                isDark
                  ? "border-orange-500/30 bg-zinc-900 text-white"
                  : "border-orange-200 bg-white text-zinc-950"
              }`}
            >
              <h2 className="text-xl font-bold">
                No collections yet
              </h2>

              <p
                className={`mt-2 ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Add your first topic folder and start saving problems.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {collections.map((collection) => (
                <FolderCard
                  key={collection.id}
                  collection={collection}
                  onDelete={deleteCollection}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Practice;
