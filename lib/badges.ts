export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: {
    type: 'points' | 'quizzes' | 'special';
    value: number;
  };
}

export const BADGES: Badge[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first quiz',
    icon: '🎯',
    requirement: { type: 'quizzes', value: 1 },
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Complete 5 quizzes',
    icon: '🧭',
    requirement: { type: 'quizzes', value: 5 },
  },
  {
    id: 'pathfinder',
    name: 'Pathfinder',
    description: 'Complete 10 quizzes',
    icon: '🗺️',
    requirement: { type: 'quizzes', value: 10 },
  },
  {
    id: 'rising-star',
    name: 'Rising Star',
    description: 'Earn 100 points',
    icon: '⭐',
    requirement: { type: 'points', value: 100 },
  },
  {
    id: 'achiever',
    name: 'Achiever',
    description: 'Earn 500 points',
    icon: '🏆',
    requirement: { type: 'points', value: 500 },
  },
  {
    id: 'legend',
    name: 'Legend',
    description: 'Earn 1000 points',
    icon: '👑',
    requirement: { type: 'points', value: 1000 },
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Join FuturePath',
    icon: '🐦',
    requirement: { type: 'special', value: 1 },
  },
];

export function checkBadges(points: number, quizzesTaken: number): string[] {
  const earnedBadges: string[] = ['early-bird']; // Everyone gets this

  BADGES.forEach((badge) => {
    if (badge.requirement.type === 'points' && points >= badge.requirement.value) {
      earnedBadges.push(badge.id);
    } else if (
      badge.requirement.type === 'quizzes' &&
      quizzesTaken >= badge.requirement.value
    ) {
      earnedBadges.push(badge.id);
    }
  });

  return [...new Set(earnedBadges)];
}

export function getBadgeById(id: string): Badge | undefined {
  return BADGES.find((badge) => badge.id === id);
}

