import { TypeDomarkOptions } from './type';
import { parseHtmlToSvg } from './lib/svg';
import { parseSvgToBase64 } from './lib/canvas';

/**
 * @param html 
 * @param opts 
 * @return {string} image base64
 */
function domark(html: string, opts: TypeDomarkOptions): string {
  const svg = parseHtmlToSvg(html);
  const base64 = parseSvgToBase64(svg);
  return base64;
}

export default domark;