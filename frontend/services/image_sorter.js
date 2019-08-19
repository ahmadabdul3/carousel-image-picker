export function alphabeticallyByCaption(a, b) {
  const aLower = a.imageCaption.toLowerCase();
  const bLower = b.imageCaption.toLowerCase();

  if (aLower < bLower) return -1;
  else if (aLower > bLower) return 1;
  else return 0;
}
