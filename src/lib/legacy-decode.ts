/** Port of prof-p.ru base85X_decode — decodes calculator table HTML from API */
export function base85XDecode(encoded: string): string {
  const t = encoded.replace(/!/g, "\\");
  const length = t.length;
  let output = "";
  const pad = "00000000";

  for (let i = 1; i < length; i += 5) {
    let n = 0;
    let m = 1;
    for (let j = 0; j < 5; j++) {
      n += (t.charCodeAt(i + j) - 42) * m;
      m *= 85;
    }
    let hex = n.toString(16);
    hex = pad.substring(0, 8 - hex.length) + hex;
    output += hex.replace(/(..)/g, "%$1");
  }

  return decodeURIComponent(output.substring(0, output.length - t.charCodeAt(0) * 3));
}
