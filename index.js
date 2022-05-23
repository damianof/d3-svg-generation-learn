import fs from 'fs'
import * as jsdom from 'jsdom'
import * as d3 from 'd3'
const { JSDOM } = jsdom;

const createSvg = (n) => {
  const dom = new JSDOM(`<!DOCTYPE html><body></body>`);

  let body = d3.select(dom.window.document.querySelector('body'))
  let svg = body.append('svg')
    .attr('width', 20)
    .attr('height', 20)
    .style('transform', 'scale(10)').style('transform-origin', 'top left;')
    .attr('xmlns', 'http://www.w3.org/2000/svg');

  svg.append('circle')
    .attr('cx', 9.9)
    .attr('cy', 9.9)
    .attr('r', 9.9)
    .style('fill', '#FFD25F');

  svg.append('circle')
    .attr('cx', 9.9)
    .attr('cy', 9.9)
    .attr('r', 7.4)
    .style('fill', '#E2940C');

  let dx = 7;
  let dy = 14.3;
  let fontSize = 13;
  if (n > 9) {
    dx -= 3.2;
    dy -= 0.5;
    fontSize -= 1;

    if (n > 19) {
      dx += 0.4;
    }
  }

  svg.append('text')
    .attr('dx', dx)
    .attr('dy', dy)
    //.attr('font-family', 'sans-serif')
    .attr('font-size', fontSize)
    .text(n)
    .style('opacity', '0.8')
    .style('fill', '#FFFFFF');

  const outputDir = './output';
  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
  }

  const fullFilePath = `${ outputDir }/layer-${ n }.svg`;

  fs.writeFileSync(fullFilePath, body.html());
}

const max = 20;

for (let n = 1; n <= max; n++) {
  createSvg(n);
}
