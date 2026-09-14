function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function toLocalDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function todayDate(): string {
  return toLocalDate(new Date());
}

function parseLocalDate(value: string): Date {
  const [year, month, day] = value.split('-').map(Number);

  return new Date(year, month - 1, day);
}

export function shiftDate(value: string, days: number): string {
  const date = parseLocalDate(value);
  date.setDate(date.getDate() + days);

  return toLocalDate(date);
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Rounded, because a day with a daylight saving change is not exactly 24 hours.
export function daysBetween(from: string, to: string): number {
  return Math.round((parseLocalDate(to).getTime() - parseLocalDate(from).getTime()) / MS_PER_DAY);
}

const dayTitleFormat = new Intl.DateTimeFormat('en', { weekday: 'short', day: 'numeric', month: 'short' });

export function formatDayTitle(value: string): string {
  const today = todayDate();

  if (value === today) {
    return 'Today';
  }

  if (value === shiftDate(today, -1)) {
    return 'Yesterday';
  }

  if (value === shiftDate(today, 1)) {
    return 'Tomorrow';
  }

  return dayTitleFormat.format(parseLocalDate(value));
}
