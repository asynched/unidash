export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(typeof date === 'string' ? new Date(date) : date)
}
