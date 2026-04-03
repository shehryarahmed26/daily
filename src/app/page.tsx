import words from "@/../data/words.json";
import Link from "next/link";

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

const allWords: Word[] = words as Word[];

function DifficultyBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    Intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[level] || "bg-slate-700 text-slate-300"}`}>
      {level}
    </span>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-400 border border-violet-500/30">
      {category}
    </span>
  );
}

export default function Home() {
  if (allWords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="text-6xl mb-6">📚</div>
        <h1 className="text-3xl font-bold text-slate-200 mb-3">No Words Yet</h1>
        <p className="text-slate-400 max-w-md">
          The first word will be generated automatically tomorrow at 9 AM.
          Or trigger the GitHub Action manually to get your first word now!
        </p>
      </div>
    );
  }

  // Latest word = today's word (last in array)
  const todayWord = allWords[allWords.length - 1];
  const prevWord = allWords.length > 1 ? allWords[allWords.length - 2] : null;

  return (
    <div className="space-y-8">
      {/* Stats bar */}
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-sm">
          Total words learned: <span className="text-violet-400 font-bold">{allWords.length}</span>
        </p>
        <p className="text-slate-500 text-sm">{todayWord.date}</p>
      </div>

      {/* Today's Word — Hero Card */}
      <div className="relative rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 md:p-12 overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl" />

        <div className="relative">
          {/* Label */}
          <p className="text-violet-400 text-sm font-medium tracking-wider uppercase mb-4">
            Word of the Day
          </p>

          {/* Word */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            {todayWord.word}
          </h1>

          {/* Badges */}
          <div className="flex gap-2 mb-6">
            <CategoryBadge category={todayWord.category} />
            <DifficultyBadge level={todayWord.difficulty} />
          </div>

          {/* Meaning */}
          <p className="text-xl md:text-2xl text-slate-300 mb-6 leading-relaxed">
            {todayWord.meaning}
          </p>

          {/* Sentence */}
          <div className="bg-slate-800/60 rounded-xl p-5 mb-6 border border-slate-700/30">
            <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">Example</p>
            <p className="text-slate-300 italic text-lg">&ldquo;{todayWord.sentence}&rdquo;</p>
          </div>

          {/* Synonyms & Antonyms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/30">
              <p className="text-sm text-green-400 font-medium mb-2">Synonyms</p>
              <p className="text-slate-300">{todayWord.synonym}</p>
            </div>
            <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/30">
              <p className="text-sm text-red-400 font-medium mb-2">Antonyms</p>
              <p className="text-slate-300">{todayWord.antonym}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {prevWord ? (
          <div className="text-sm text-slate-500">
            Previous: <span className="text-slate-300">{prevWord.word}</span>
          </div>
        ) : (
          <div />
        )}
        <Link
          href="/archive"
          className="text-sm text-violet-400 hover:text-violet-300 transition font-medium"
        >
          View all words &rarr;
        </Link>
      </div>

      {/* Recent Words */}
      {allWords.length > 1 && (
        <div>
          <h2 className="text-lg font-semibold text-slate-200 mb-4">Recent Words</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allWords
              .slice(-7, -1)
              .reverse()
              .map((w) => (
                <div
                  key={w.id}
                  className="rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 hover:border-violet-500/30 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{w.word}</h3>
                    <span className="text-xs text-slate-500">{w.date}</span>
                  </div>
                  <p className="text-sm text-slate-400 line-clamp-2">{w.meaning}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
