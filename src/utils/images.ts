export const randomAvatar = (seed: string) => {
  const [s] = seed.split(' ')
  return `https://avatars.dicebear.com/api/micah/${s}.svg`
}
