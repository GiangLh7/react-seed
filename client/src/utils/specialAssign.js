export default (a, b, reserved) => {
  for (var x in b) {
    if (!b.hasOwnProperty(x)) continue;
    if (reserved && reserved[x]) continue;
    a[x] = b[x];
  }
}
