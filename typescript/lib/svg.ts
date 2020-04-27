
export function parseHtmlToSvg(html: string): string {
  const dom = document.createElement('div');
  dom.innerHTML = html;
  const svg = 
    // 'data:image/svg+xml;charset=utf-8,' +
    `<svg xmlns="http://www.w3.org/2000/svg" width="${dom.offsetWidth}" height="${dom.offsetHeight}">` +
      `<foreignObject x="0" y="0" width="100%" height="100%">` +
        html.replace(/#/g, '%23').replace(/\n/g, '%0A') +
      `</foreignObject>` +
    `</svg>`;
  return svg;
}
