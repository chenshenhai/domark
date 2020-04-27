const { domark } = window;

const html = document.getElementById('J_HTML').innerHTML;
const base64 = domark(html);

document.getElementById('J_Image').innerHTML = `
<img src="${base64}" />
`;

console.log('html = ', html);
console.log('base64 = ', base64);
