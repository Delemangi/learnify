const getYearsOfExperience = (since: Date): number => {
  const now = new Date();
  const years = now.getFullYear() - since.getFullYear();
  const hadAnniversary =
    now.getMonth() > since.getMonth() ||
    (now.getMonth() === since.getMonth() && now.getDate() >= since.getDate());
  return hadAnniversary ? years : years - 1;
};

export const formatExperience = (since: Date): string => {
  const years = getYearsOfExperience(since);
  if (years <= 0) return '1 година работно искуство';
  return `${years}+ ${years === 1 ? 'година' : 'години'} работно искуство`;
};
