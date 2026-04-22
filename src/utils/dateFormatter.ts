export const formatDate = (date: Date): string => {
  const getOrdinal = (d: number) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const dayName = date.toLocaleDateString('en-AU', { weekday: 'short' });
  const dayNumber = date.getDate();
  const ordinal = getOrdinal(dayNumber);

  const timeStr = date
    .toLocaleTimeString('en-AU', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toUpperCase();

  return `${dayName} ${dayNumber}${ordinal} ${timeStr}`;
};
