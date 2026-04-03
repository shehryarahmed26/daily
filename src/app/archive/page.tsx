"use client";

import { useState, useMemo } from "react";
import words from "@/../data/words.json";

interface Word {
  id: number;
  date: string;
  word: string;
  meaning: string;
  sentence: string;
  synonym: string;
  antonym: string;
  category: string;
  difficulty: string;
}

const allWords: Word[] = (words as Word[]).slice().reverse(); // newest first

const categories = ["All", "Noun", "Verb", "Adjective", "Adverb", "Idiom", "Phrase"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

export default function ArchivePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const filtered = useMemo(() => {
    return allWords.filter((w) => {
      const matchesSearch =
        search === "" ||
        w.word.toLowerCase().includes(search.toLowerCase()) ||
        w.meaning.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || w.category === category;
      const matchesDifficulty = difficulty === "All" || w.difficulty === difficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [search, category, difficulty]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Word Archive</h1>
        <p className="text-slate-400">
          {allWords.length} {allWords.length === 1 ? "word" : "words"} learned so far
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <input
          type="text"
          placeholder="Search words..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition"
        />

        {/* Category filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All Categories" : c}
            </option>
          ))}
        </select>

        {/* Difficulty filter */}
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition"
        >
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d === "All" ? "All Levels" : d}
            </option>
          ))}
        </select>
      </div>

      {/* Results count */}
      {search || category !== "All" || difficulty !== "All" ? (
        <p className="text-sm text-slate-500">
          Showing {filtered.length} of {allWords.length} words
        </p>
      ) : null}

      {/* Words grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 text-lg">No words found</p>
          {allWords.length === 0 && (
            <p className="text-slate-600 text-sm mt-2">
              Words will appear here as they are generated daily
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((w) => (
            <div
              key={w.id}
              className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-5 hover:border-violet-500/30 transition group"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold text-white group-hover:text-violet-400 transition">
                  {w.word}
                </h2>
                <span className="text-xs text-slate-500 mt-1">{w.date}</span>
              </div>

              {/* Badges */}
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-0.5 rounded-full text-xs bg-violet-500/20 text-violet-400 border border-violet-500/30">
                  {w.category}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs border ${
                    w.difficulty === "Beginner"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : w.difficulty === "Intermediate"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}
                >
                  {w.difficulty}
                </span>
              </div>

              {/* Meaning */}
              <p className="text-slate-300 text-sm mb-3">{w.meaning}</p>

              {/* Sentence */}
              <p className="text-slate-400 text-sm italic">&ldquo;{w.sentence}&rdquo;</p>

              {/* Synonyms & Antonyms */}
              <div className="mt-3 pt-3 border-t border-slate-700/50 flex gap-4 text-xs">
                <span className="text-green-400/70">
                  Syn: <span className="text-slate-400">{w.synonym}</span>
                </span>
                <span className="text-red-400/70">
                  Ant: <span className="text-slate-400">{w.antonym}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
