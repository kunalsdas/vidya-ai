// Vidya — Content Renderer (Markdown, KaTeX, Code Highlighting)

if (typeof marked !== 'undefined') {
  marked.use({
    gfm: true,
    breaks: true,
    renderer: (() => {
      const renderer = new marked.Renderer();

      renderer.heading = (text, level) => {
        const sizes  = ['2rem', '1.5rem', '1.2rem', '1rem'];
        const size   = sizes[Math.min(level - 1, 3)];
        const anchor = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return `<h${level} id="${anchor}" style="font-size:${size};">${text}</h${level}>`;
      };

      renderer.table = (header, body) => `
        <div style="overflow-x:auto;margin:24px 0;">
          <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
            <thead style="background:var(--lavender-soft);">${header}</thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      `;

      renderer.tablecell = (content, flags) => {
        const tag  = flags.header ? 'th' : 'td';
        const align = flags.align ? `text-align:${flags.align};` : '';
        const style = flags.header
          ? `padding:10px 16px;font-weight:700;color:var(--lavender-text);letter-spacing:0.05em;font-size:0.78rem;text-transform:uppercase;border-bottom:2px solid var(--lavender);${align}`
          : `padding:10px 16px;border-bottom:1px solid var(--border);color:var(--ink-700);${align}`;
        return `<${tag} style="${style}">${content}</${tag}>`;
      };

      renderer.blockquote = (quote) => `
        <blockquote style="border-left:3px solid var(--lavender);padding:16px 20px;background:var(--lavender-soft);border-radius:0 12px 12px 0;margin:20px 0;font-style:italic;color:var(--lavender-text);">
          ${quote}
        </blockquote>
      `;

      renderer.code = (code, language) => `
        <div style="background:var(--ink-900);border-radius:12px;padding:20px 24px;margin:20px 0;overflow-x:auto;">
          ${language ? `<div style="font-size:0.72rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--lavender);margin-bottom:12px;font-weight:700;">${language}</div>` : ''}
          <pre style="margin:0;"><code style="font-family:var(--font-mono);font-size:0.875rem;color:#e8dff8;line-height:1.7;">${_escapeHtml(code)}</code></pre>
        </div>
      `;

      renderer.codespan = (code) =>
        `<code style="font-family:var(--font-mono);font-size:0.88em;background:var(--ink-100);color:var(--rose-text);padding:2px 8px;border-radius:4px;">${code}</code>`;

      renderer.hr = () =>
        `<hr style="border:none;border-top:1px solid var(--border);margin:28px 0;" />`;

      renderer.strong = (text) =>
        `<strong style="font-weight:700;color:var(--ink-800);">${text}</strong>`;

      return renderer;
    })()
  });
}

function _escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Protects LaTeX expressions from being mangled by the markdown parser
// by replacing them with placeholders before parsing, then restoring after.
function protectLatex(text) {
  if (!text) return text;
  const placeholders = [];
  let idx = 0;

  text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match) => {
    const key = `%%MATHBLOCK${idx}%%`;
    placeholders.push({ key, value: match });
    idx++;
    return key;
  });

  text = text.replace(/\\\[([\s\S]*?)\\\]/g, (match) => {
    const key = `%%MATHBLOCK${idx}%%`;
    placeholders.push({ key, value: match });
    idx++;
    return key;
  });

  // Skip currency-like patterns (e.g. $5) that aren't actual LaTeX
  text = text.replace(/\$([^\$\n]+?)\$/g, (match, inner) => {
    if (/^\d/.test(inner.trim()) && !/[\\{}_^]/.test(inner)) return match;
    const key = `%%MATHINLINE${idx}%%`;
    placeholders.push({ key, value: match });
    idx++;
    return key;
  });

  text = text.replace(/\\\(([\s\S]*?)\\\)/g, (match) => {
    const key = `%%MATHINLINE${idx}%%`;
    placeholders.push({ key, value: match });
    idx++;
    return key;
  });

  return { text, placeholders };
}

function restoreLatex(html, placeholders) {
  if (!placeholders || !placeholders.length) return html;
  for (const { key, value } of placeholders) {
    html = html.replace(key, value);
  }
  return html;
}

function renderMath(container) {
  if (!window.renderMathInElement || !container) return;
  try {
    renderMathInElement(container, {
      delimiters: [
        { left: '$$',  right: '$$',  display: true  },
        { left: '$',   right: '$',   display: false },
        { left: '\\[', right: '\\]', display: true  },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false,
      errorColor: '#e74c3c',
      output: 'html'
    });
  } catch {}
}

function postProcessContent(container) {
  if (!container) return;

  // Add tooltip explanations to recognized math notation symbols
  container.querySelectorAll('.katex').forEach(el => {
    const symbol = el.textContent.trim();
    const explanation = NOTATION_MAP[symbol];
    if (explanation) {
      el.style.cursor = 'help';
      el.style.borderBottom = '1px dashed var(--lavender)';
      el.title = explanation;
    }
  });

  container.querySelectorAll('h2, h3').forEach(h => {
    h.style.scrollMarginTop = '120px';
  });
}

const NOTATION_MAP = {
  'Σ':  'Sigma — summation. Σᵢ₌₁ⁿ aᵢ means "add all aᵢ from i=1 to n"',
  '∑':  'Summation symbol. Add up a series of terms.',
  '∫':  'Integral — continuous summation. Finds area under a curve.',
  '∂':  'Partial derivative — rate of change with respect to ONE variable, holding others constant.',
  '∇':  'Nabla/Del — gradient operator. Points in the direction of steepest increase.',
  '∀':  'For all — universal quantifier. "∀x" means "for every x".',
  '∃':  'There exists — existential quantifier. "∃x" means "at least one x exists".',
  '∈':  'Element of. "x ∈ S" means "x belongs to set S".',
  '⊆':  'Subset. "A ⊆ B" means every element of A is also in B.',
  '∞':  'Infinity — larger than any finite number.',
  '≡':  'Equivalent to / congruent. Stronger than equality in some contexts.',
  '≈':  'Approximately equal to.',
  '→':  'Approaches / maps to. "x → 0" means x approaches zero.',
  '⟹': 'Implies. "A ⟹ B" means if A is true, B must be true.',
  '⟺': 'If and only if (biconditional).',
  'λ':  'Lambda — often a parameter, eigenvalue, or anonymous function.',
  'μ':  'Mu — often represents mean or a learning rate.',
  'σ':  'Sigma (lowercase) — standard deviation or sigmoid function.',
  'θ':  'Theta — angle, or model parameters in ML.',
  'π':  'Pi ≈ 3.14159 — ratio of circle circumference to diameter.',
  'α':  'Alpha — significance level, learning rate, or angle.',
  'β':  'Beta — coefficient, regularization parameter.',
  'γ':  'Gamma — discount factor or gamma function.',
  'δ':  'Delta — small change or Dirac delta function.',
  'ε':  'Epsilon — arbitrarily small positive number.',
  'ω':  'Omega — angular frequency or worst-case complexity.',
  'O':  'Big-O — upper bound on algorithm complexity.',
  'Ω':  'Big-Omega — lower bound on complexity.',
  'Θ':  'Big-Theta — tight bound on complexity.',
};

window.VidyaRenderer = {
  renderMath,
  postProcessContent,
  protectLatex,
  restoreLatex,
  NOTATION_MAP
};
