
export function parseSvgToBase64(svg: string): string {
  const base64 = 
    'data:image/svg+xml;charset=utf-8,' + svg;
  return base64;
}
