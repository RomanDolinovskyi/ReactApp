export const getUserAbbr = (user) => {
  const [firstName, secondName] = user.fullName.split(" ");

  let name =
    secondName && secondName[0] !== ("" || undefined)
      ? firstName[0].toUpperCase() + secondName[0].toUpperCase()
      : firstName && firstName[0] !== ("" || undefined)
      ? firstName[0].toUpperCase()
      : null;
    return name;
}