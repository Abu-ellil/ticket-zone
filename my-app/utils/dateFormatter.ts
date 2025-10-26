export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };
  return new Intl.DateTimeFormat('ar-EG', options).format(date);
}

export function formatEventTime(timeString: string): string {
  // Assuming timeString is in HH:MM format, e.g., "08:30"
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes);

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  // Use 'ar-EG' for Arabic locale, and replace AM/PM with مساءاً/صباحاً
  const formattedTime = new Intl.DateTimeFormat('ar-EG', options).format(date);
  return formattedTime.replace('ص', 'صباحاً').replace('م', 'مساءاً');
}