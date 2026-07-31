/**
 * publish-blogs.js
 * Publishes all 8 Eevagga blog posts to the live API.
 *
 * Usage:
 *   node scripts/publish-blogs.js <admin-email> <admin-password>
 *
 * Requirements: Node.js 18+ (no npm install needed — uses built-in modules only)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const [,, ADMIN_EMAIL, ADMIN_PASSWORD] = process.argv;
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Usage: node scripts/publish-blogs.js <admin-email> <admin-password>');
  process.exit(1);
}

const BASE_URL = 'https://api.eevagga.com/api/v1';
const BLOG_DIR = path.join(__dirname, '..', 'seo-audit', 'blog-posts');

// ── markdown → HTML (no external deps) ───────────────────────────────────────
function mdToHtml(md) {
  let t = md.replace(/^\*\*(Meta Title|Meta Description|Slug|Target Keyword):\*\*.*$/gm, '');
  t = t.replace(/^---+$/gm, '');

  // tables
  t = t.replace(/(\|.+\|\n)+/g, (block) => {
    const rows = block.trim().split('\n').filter(r => !r.match(/^\|[-| :]+\|$/));
    if (!rows.length) return '';
    let html = '<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;margin:16px 0;">';
    rows.forEach((row, i) => {
      const cells = row.split('|').slice(1, -1).map(c => c.trim());
      const tag = i === 0 ? 'th' : 'td';
      html += '<tr>' + cells.map(c => `<${tag} style="padding:8px;border:1px solid #ddd;">${c}</${tag}>`).join('') + '</tr>';
    });
    html += '</table>';
    return html;
  });

  t = t.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  t = t.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  t = t.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  t = t.replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(l => `<li>${l.replace(/^\d+\.\s*/, '')}</li>`).join('');
    return `<ol>${items}</ol>`;
  });

  t = t.replace(/((?:^[-*] .+\n?)+)/gm, (block) => {
    const items = block.trim().split('\n').map(l => `<li>${l.replace(/^[-*] /, '')}</li>`).join('');
    return `<ul>${items}</ul>`;
  });

  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  const lines = t.split('\n');
  const out = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { out.push(''); continue; }
    if (/^<(h[1-6]|ul|ol|li|table|tr|th|td|blockquote|hr|p)/.test(line)) { out.push(line); continue; }
    out.push(`<p>${line}</p>`);
  }
  return out.join('\n');
}

// ── article list ──────────────────────────────────────────────────────────────
const articles = [
  { file: '01-how-to-plan-birthday-party-bangalore.md',       category: 'Birthday Planning' },
  { file: '02-birthday-decoration-ideas-adults-bangalore.md', category: 'Decoration Ideas' },
  { file: '03-birthday-planner-cost-bangalore.md',            category: 'Birthday Planning' },
  { file: '04-best-birthday-themes-kids-bangalore.md',        category: 'Kids Birthday'    },
  { file: '05-house-warming-decoration-ideas-bangalore.md',   category: 'House Warming'    },
  { file: '06-baby-shower-planning-guide-bangalore.md',       category: 'Baby Shower'      },
  { file: '07-birthday-party-venues-bangalore.md',            category: 'Birthday Planning' },
  { file: '08-griha-pravesh-puja-decoration-ideas.md',        category: 'House Warming'    },
];

// ── http helpers ──────────────────────────────────────────────────────────────
function jsonPost(url, payload, token) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname, port: 443, path: u.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString())); } catch (e) { resolve(Buffer.concat(chunks).toString()); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function buildMultipart(fields, files) {
  const boundary = '----FormBoundary' + Date.now().toString(36);
  const parts = [];
  for (const [name, value] of Object.entries(fields)) {
    parts.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`, 'utf8'));
  }
  for (const { name, filename, contentType, data } of files) {
    parts.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${name}"; filename="${filename}"\r\nContent-Type: ${contentType}\r\n\r\n`, 'utf8'));
    parts.push(data);
    parts.push(Buffer.from('\r\n', 'utf8'));
  }
  parts.push(Buffer.from(`--${boundary}--\r\n`, 'utf8'));
  return { boundary, body: Buffer.concat(parts) };
}

function multipartPost(url, fields, files, token) {
  return new Promise((resolve, reject) => {
    const { boundary, body } = buildMultipart(fields, files);
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname, port: 443, path: u.pathname,
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length,
        Authorization: `Bearer ${token}`,
      },
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try { resolve(JSON.parse(Buffer.concat(chunks).toString())); } catch (e) { resolve(Buffer.concat(chunks).toString()); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

// ── main ──────────────────────────────────────────────────────────────────────
(async () => {
  console.log('Logging in...');
  const loginRes = await jsonPost(`${BASE_URL}/admin/loginAdmin`, { email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
  if (!loginRes.token) {
    console.error('Login failed:', JSON.stringify(loginRes));
    process.exit(1);
  }
  const token = loginRes.token;
  console.log('Logged in.\n');

  console.log('Downloading placeholder cover image...');
  const placeholderImg = await downloadImage('https://www.eevagga.com/opengraph-image.jpg');
  console.log(`Cover image ready (${Math.round(placeholderImg.length / 1024)} KB)\n`);

  for (let i = 0; i < articles.length; i++) {
    const { file, category } = articles[i];
    const md = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
    const titleMatch = md.match(/^\*\*Meta Title:\*\*\s*(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : file.replace(/\.md$/, '');
    const html = mdToHtml(md);

    console.log(`[${i + 1}/8] Publishing: "${title}"`);

    const result = await multipartPost(
      `${BASE_URL}/blog/create-blog`,
      { title, authorName: 'Eevagga Editorial Team', content: html, category },
      [{ name: 'coverImage', filename: 'eevagga-cover.jpg', contentType: 'image/jpeg', data: placeholderImg }],
      token
    );

    if (result && (result._id || result.success || result.message)) {
      console.log(`  ✓ Published (id: ${result._id || result.blog?._id || 'ok'})`);
    } else {
      console.log(`  ✗ Unexpected response:`, JSON.stringify(result).slice(0, 200));
    }
  }

  console.log('\nDone. All 8 articles submitted.');
  console.log('Note: cover images are placeholders — update them in the admin panel.');
})();
