export const handleValid = (values, isValid) => {
  const areAllKeysEmpty = Object.keys(values).every((key) => {
    const value = values[key];
    return value === "" || value === null || value === undefined || value === 0;
  });
  if (areAllKeysEmpty || !isValid) return true;
  return false;
};

export const getInitials=(fullName)=> {
  const names = fullName.split(" ");
  const firstNameInitial = names[0].charAt(0);
  const lastNameInitial = names[names.length - 1].charAt(0);
  const initials = firstNameInitial + lastNameInitial;
  return initials;
}
