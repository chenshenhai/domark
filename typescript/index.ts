import { TypeDomarkOptions } from './type';
import { parseHtmlToSvg } from './lib/svg';

/**
 * @param html 
 * @param opts 
 * @return {string} image base64
 */
function domark(html: string, opts: TypeDomarkOptions): string {
  const base64 = parseHtmlToSvg(html);
  return base64;
}

export default domark;