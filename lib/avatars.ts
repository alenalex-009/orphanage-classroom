export interface Avatar {
  level: number;
  emoji: string;
  name: string;
  title: string;
  color: string;
  gradient: string;
}

export const AVATARS: Avatar[] = [
  { level:  0, emoji: "🌱", name: "Seedling",   title: "Just starting out",           color: "text-green-600",  gradient: "from-green-400 to-emerald-500"  },
  { level:  1, emoji: "📚", name: "Reader",     title: "Learning every day",          color: "text-blue-600",   gradient: "from-blue-400 to-cyan-500"      },
  { level:  2, emoji: "🔭", name: "Explorer",   title: "Discovering new things",      color: "text-purple-600", gradient: "from-purple-400 to-violet-500"  },
  { level:  3, emoji: "⚡", name: "Achiever",   title: "Making it happen",            color: "text-yellow-600", gradient: "from-yellow-400 to-amber-500"   },
  { level:  5, emoji: "🏆", name: "Champion",   title: "Rising to the top",           color: "text-orange-600", gradient: "from-orange-400 to-red-500"     },
  { level:  7, emoji: "🧠", name: "Scholar",    title: "Knowledge is power",          color: "text-indigo-600", gradient: "from-indigo-500 to-purple-600"  },
  { level: 10, emoji: "👑", name: "Legend",     title: "The ultimate learner",        color: "text-amber-500",  gradient: "from-amber-400 to-yellow-300"   },
];

export function getAvatarForLevel(level: number): Avatar {
  // Find the highest avatar the student has unlocked
  const unlocked = AVATARS.filter(a => level >= a.level);
  return unlocked[unlocked.length - 1] ?? AVATARS[0];
}

export function getNextAvatar(level: number): Avatar | null {
  return AVATARS.find(a => a.level > level) ?? null;
}

export function getLevelInfo(xp: number): {
  level: number;
  currentLevelXP: number;
  nextLevelXP: number;
  progress: number;
  avatar: Avatar;
  nextAvatar: Avatar | null;
} {
  const level = Math.floor(xp / 100);
  const currentLevelXP = xp % 100;
  const nextLevelXP = 100;
  const progress = Math.round((currentLevelXP / nextLevelXP) * 100);
  const avatar = getAvatarForLevel(level);
  const nextAvatar = getNextAvatar(level);
  return { level, currentLevelXP, nextLevelXP, progress, avatar, nextAvatar };
}
