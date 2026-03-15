// Vidya — API Layer (Amazon Nova AI Hackathon 2026)

window.VidyaAPI = (function () {

  var BASE = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8000/api'
    : window.location.origin + '/api';

  var DEMO_MODE = true;

  async function call(endpoint, body) {
    var resp = await fetch(BASE + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(360000)
    });
    if (!resp.ok) throw new Error('API ' + resp.status);
    return resp.json();
  }

  return {
    BASE: BASE,
    DEMO_MODE: DEMO_MODE,
    call: call
  };

})();
