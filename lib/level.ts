export function getLevelInfo(xp: number) {
  const level = Math.floor(xp / 100);

  const avatars = [
    { emoji: "🌱", gradient: "from-emerald-400 to-teal-500" },
    { emoji: "📚", gradient: "from-sky-400 to-blue-500" },
    { emoji: "🔭", gradient: "from-violet-500 to-purple-600" },
    { emoji: "🏆", gradient: "from-amber-400 to-orange-500" },
    { emoji: "⚡", gradient: "from-rose-500 to-pink-600" },
    { emoji: "🧠", gradient: "from-indigo-500 to-violet-600" },
    { emoji: "👑", gradient: "from-yellow-300 to-amber-400" },
  ];

  const avatar =
    avatars[Math.min(level, avatars.length - 1)];

  return {
    level,
    avatar,
    currentLevelXP: xp % 100,
  };
}