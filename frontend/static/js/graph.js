// Vidya — Knowledge Graph Visualization (D3.js Force-Directed)

const VidyaGraph = (() => {

  const NODE_COLORS = {
    core:    { fill: '#c4a8f0', stroke: '#8b5cf6', text: '#3b0764' },
    prereq:  { fill: '#f2a7c3', stroke: '#e879a5', text: '#831843' },
    related: { fill: '#80d4b0', stroke: '#34d399', text: '#064e3b' },
    cross:   { fill: '#f5c87c', stroke: '#f59e0b', text: '#78350f' },
    default: { fill: '#b4a0d8', stroke: '#8b7fc8', text: '#4c1d95' }
  };

  const MINI_CONFIG = {
    chargeStrength:  -120,
    linkDistance:    50,
    nodeRadius:      (d) => d.type === 'core' ? 12 : 8,
    fontSize:        9,
    maxLabelLength:  14
  };

  const FULL_CONFIG = {
    chargeStrength:  -280,
    linkDistance:    100,
    nodeRadius:      (d) => d.type === 'core' ? 22 : d.type === 'prereq' ? 16 : 14,
    fontSize:        11,
    maxLabelLength:  22
  };

  function renderMini(svgId, graphData) {
    if (!graphData || !graphData.nodes) return;
    const container = document.getElementById(svgId);
    if (!container) return;

    const w = container.parentElement.clientWidth || 280;
    const h = 200;
    container.setAttribute('viewBox', `0 0 ${w} ${h}`);

    _render(svgId, graphData, { ...MINI_CONFIG, width: w, height: h, interactive: false });
  }

  function renderFull(svgId, graphData) {
    if (!graphData || !graphData.nodes) {
      graphData = _getFallback();
    }
    const container = document.getElementById(svgId);
    if (!container) return;

    const w = container.parentElement?.clientWidth || window.innerWidth;
    const h = container.parentElement?.clientHeight - 80 || window.innerHeight - 80;
    container.setAttribute('viewBox', `0 0 ${w} ${h}`);
    container.setAttribute('width', w);
    container.setAttribute('height', h);

    _render(svgId, graphData, { ...FULL_CONFIG, width: w, height: h, interactive: true });
  }

  function _render(svgId, graphData, config) {
    const svg = d3.select(`#${svgId}`);
    svg.selectAll('*').remove();

    const { width, height, chargeStrength, linkDistance, nodeRadius, fontSize, maxLabelLength, interactive } = config;

    const nodes = graphData.nodes.map(d => ({ ...d }));
    const links = graphData.links.map(d => ({ ...d }));

    nodes.forEach(n => {
      n.x = width / 2 + (Math.random() - 0.5) * 80;
      n.y = height / 2 + (Math.random() - 0.5) * 80;
    });

    const defs = svg.append('defs');
    const types = ['core', 'prereq', 'related', 'cross'];
    types.forEach(type => {
      const col = NODE_COLORS[type] || NODE_COLORS.default;
      defs.append('marker')
        .attr('id', `arrow-${type}`)
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 20)
        .attr('refY', 0)
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', col.stroke);
    });

    defs.append('pattern')
      .attr('id', 'grid')
      .attr('width', 32)
      .attr('height', 32)
      .attr('patternUnits', 'userSpaceOnUse')
      .append('circle')
      .attr('cx', 1).attr('cy', 1).attr('r', 1)
      .attr('fill', '#e8dff8');

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'url(#grid)');

    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links)
        .id(d => d.id)
        .distance(linkDistance)
        .strength(0.8))
      .force('charge', d3.forceManyBody().strength(chargeStrength))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => nodeRadius(d) + 18).strength(0.7))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05));

    const link = svg.append('g').attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', d => {
        const target = nodes.find(n => n.id === (d.target?.id || d.target));
        const col = NODE_COLORS[target?.type] || NODE_COLORS.default;
        return col.stroke;
      })
      .attr('stroke-opacity', 0.45)
      .attr('stroke-width', interactive ? 1.5 : 1);

    const nodeGroup = svg.append('g').attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', 'node-group')
      .style('cursor', interactive ? 'pointer' : 'default');

    nodeGroup.append('circle')
      .attr('r', nodeRadius)
      .attr('fill', d => (NODE_COLORS[d.type] || NODE_COLORS.default).fill)
      .attr('stroke', d => (NODE_COLORS[d.type] || NODE_COLORS.default).stroke)
      .attr('stroke-width', d => d.type === 'core' ? 2.5 : 1.5)
      .style('filter', d => d.type === 'core' ? 'drop-shadow(0 2px 8px rgba(139,92,246,0.35))' : 'none');

    nodeGroup.append('text')
      .text(d => _truncate(d.label, maxLabelLength))
      .attr('text-anchor', 'middle')
      .attr('dy', d => nodeRadius(d) + 14)
      .attr('font-size', d => d.type === 'core' ? fontSize + 1 : fontSize)
      .attr('font-weight', d => d.type === 'core' ? '700' : '500')
      .attr('fill', d => (NODE_COLORS[d.type] || NODE_COLORS.default).text)
      .attr('font-family', "'DM Sans', system-ui, sans-serif")
      .style('pointer-events', 'none');

    const coreNode = nodeGroup.filter(d => d.type === 'core');
    coreNode.append('circle')
      .attr('r', d => nodeRadius(d) + 6)
      .attr('fill', 'none')
      .attr('stroke', d => (NODE_COLORS[d.type] || NODE_COLORS.default).stroke)
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.4)
      .style('animation', 'graphPulse 2.5s ease-in-out infinite');

    if (interactive) {
      const tooltip = document.getElementById('graph-tooltip');

      nodeGroup
        .on('mouseover', (event, d) => {
          if (!tooltip) return;
          tooltip.innerHTML = `<strong>${d.label}</strong><br/><span style="opacity:0.7;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.05em">${d.type}</span>`;
          tooltip.classList.add('visible');
          tooltip.style.left = (event.offsetX + 14) + 'px';
          tooltip.style.top  = (event.offsetY - 10) + 'px';

          const connectedIds = new Set();
          links.forEach(l => {
            const src = l.source?.id || l.source;
            const tgt = l.target?.id || l.target;
            if (src === d.id) connectedIds.add(tgt);
            if (tgt === d.id) connectedIds.add(src);
          });

          nodeGroup.style('opacity', n => (n.id === d.id || connectedIds.has(n.id)) ? 1 : 0.3);
          link.style('stroke-opacity', l => {
            const src = l.source?.id || l.source;
            const tgt = l.target?.id || l.target;
            return (src === d.id || tgt === d.id) ? 0.9 : 0.1;
          });
        })
        .on('mousemove', (event) => {
          if (!tooltip) return;
          tooltip.style.left = (event.offsetX + 14) + 'px';
          tooltip.style.top  = (event.offsetY - 10) + 'px';
        })
        .on('mouseout', () => {
          if (tooltip) tooltip.classList.remove('visible');
          nodeGroup.style('opacity', 1);
          link.style('stroke-opacity', 0.45);
        })
        .on('click', (event, d) => {
          if (d.type !== 'core') {
            app.loadTopicByName(d.label);
            app.closeGraph();
          }
        });

      nodeGroup.call(
        d3.drag()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x; d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x; d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null; d.fy = null;
          })
      );

      const zoom = d3.zoom()
        .scaleExtent([0.4, 3])
        .on('zoom', (event) => {
          svg.select('.links').attr('transform', event.transform);
          svg.select('.nodes').attr('transform', event.transform);
        });
      svg.call(zoom);
    }

    simulation.on('tick', () => {
      link
        .attr('x1', d => _clamp(d.source.x, 0, width))
        .attr('y1', d => _clamp(d.source.y, 0, height))
        .attr('x2', d => _clamp(d.target.x, 0, width))
        .attr('y2', d => _clamp(d.target.y, 0, height));

      nodeGroup.attr('transform', d =>
        `translate(${_clamp(d.x, 20, width - 20)},${_clamp(d.y, 20, height - 20)})`
      );
    });

    // Pre-run simulation ticks so the graph renders positioned, not clustered
    simulation.tick(30);
    simulation.on('tick')();
  }

  function _clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function _truncate(str, max) {
    if (!str) return '';
    return str.length > max ? str.substring(0, max - 1) + '…' : str;
  }

  function _getFallback() {
    return {
      nodes: [
        { id: 'center', label: 'Current Topic', type: 'core' },
        { id: 'p1', label: 'Prerequisite A', type: 'prereq' },
        { id: 'p2', label: 'Prerequisite B', type: 'prereq' },
        { id: 'r1', label: 'Related Concept', type: 'related' },
        { id: 'r2', label: 'Adjacent Topic', type: 'related' },
        { id: 'c1', label: 'Cross-Subject Link', type: 'cross' },
        { id: 'c2', label: 'Another Cross Link', type: 'cross' }
      ],
      links: [
        { source: 'center', target: 'p1' },
        { source: 'center', target: 'p2' },
        { source: 'center', target: 'r1' },
        { source: 'center', target: 'r2' },
        { source: 'center', target: 'c1' },
        { source: 'r1', target: 'c2' }
      ]
    };
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes graphPulse {
      0%, 100% { r: attr(r); opacity: 0.4; }
      50%       { opacity: 0.1; }
    }
    .node-group:hover circle:first-child {
      filter: brightness(1.1);
      transition: filter 0.2s;
    }
  `;
  document.head.appendChild(style);

  return { renderMini, renderFull };
})();
