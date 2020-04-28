
export function parseHtmlToSvg(html: string): string {
  const dom = document.createElement('div');
  dom.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  dom.innerHTML = html;
  const svg = 
    // `<svg xmlns="http://www.w3.org/2000/svg" width="${dom.offsetWidth}" height="${dom.offsetHeight}">` +
    `<svg xmlns="http://www.w3.org/2000/svg" width="200px" height="160px">` +
      `<foreignObject x="0" y="0" width="100%" height="100%">` +
        // html.replace(/#/g, '%23') +
        new XMLSerializer().serializeToString(dom).replace(/#/g, '%23') +
      `</foreignObject>` +
    `</svg>`;
  return svg;
}
