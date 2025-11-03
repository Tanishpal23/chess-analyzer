const express = require('express');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const port = 9001;

app.use(bodyParser.json());

// Helper to run Stockfish and get output with debug logging
function runStockfish(fen) {
  return new Promise((resolve, reject) => {
    // const stockfishPath = "C:\\Program Files\\stockfish\\stockfish.exe"; // Adjust path as necessary
    const stockfishPath = '../cpp-engine/stockfish.exe';
    console.log(`[DEBUG] Launching Stockfish: ${stockfishPath}`);

    const engine = spawn(stockfishPath);

    let output = '';
    let readyOkReceived = false;
    let uciOkReceived = false;

    engine.stdout.on('data', (data) => {
      const chunk = data.toString();
      console.log(`[STOCKFISH] ${chunk}`);
      output += chunk;

      if (!uciOkReceived && chunk.includes('uciok')) {
        uciOkReceived = true;
        engine.stdin.write('isready\n');
        console.log('[DEBUG] Sent: isready');
      } else if (uciOkReceived && !readyOkReceived && chunk.includes('readyok')) {
        readyOkReceived = true;
        engine.stdin.write(`position fen ${fen}\n`);
        engine.stdin.write('go depth 10\n');
        console.log('[DEBUG] Sent: position fen', fen);
        console.log('[DEBUG] Sent: go depth 10');
      } else if (readyOkReceived && chunk.includes('bestmove')) {
        console.log('[DEBUG] Found bestmove!');
        engine.stdin.end();
        resolve(output);
      }
    });

    engine.stderr.on('data', (data) => {
      console.error(`[STOCKFISH ERROR] ${data.toString()}`);
    });

    engine.on('error', (err) => {
      console.error(`[ERROR] Failed to start Stockfish: ${err.message}`);
      reject(err);
    });

    engine.on('close', (code) => {
      if (!output.includes('bestmove')) {
        console.error('[ERROR] Stockfish process closed without bestmove.');
        reject(new Error('No bestmove received from Stockfish'));
      }
    });

    // Initial command to start UCI protocol
    engine.stdin.write('uci\n');
    console.log('[DEBUG] Sent: uci');
  });
}

// Parse Stockfish output to extract bestmove, score, depth, and pv
function parseStockfishOutput(output) {
  const result = {};
  const lines = output.split('\n');
  let depth = 0;
  let score_cp = 0;
  let bestmove = '';
  let pv = '';

  for (const line of lines) {
    if (line.includes('depth ')) {
      const depthMatch = line.match(/depth (\d+)/);
      if (depthMatch) depth = parseInt(depthMatch[1]);
    }
    if (line.includes('score cp')) {
      const scoreMatch = line.match(/score cp (-?\d+)/);
      if (scoreMatch) score_cp = parseInt(scoreMatch[1]);
    }
    if (line.includes('pv ')) {
      pv = line.substring(line.indexOf('pv ') + 3).trim();
    }
    if (line.includes('bestmove ')) {
      const bmMatch = line.match(/bestmove ([^\s]+)/);
      if (bmMatch) bestmove = bmMatch[1];
    }
  }

  result.bestmove = bestmove;
  result.score_cp = score_cp;
  result.depth = depth;
  result.pv = pv;

  return result;
}

app.post('/analyze/fen', async (req, res) => {
  try {
    console.log('\n[INFO] Received POST /analyze/fen');
    console.log('[INFO] Request body:', req.body);

    const fen = req.body.fen;
    if (!fen) {
      return res.status(400).json({ error: 'FEN is required' });
    }

    const sfOutput = await runStockfish(fen);

    console.log('[INFO] Raw Stockfish output:\n' + sfOutput);

    const result = parseStockfishOutput(sfOutput);

    console.log('[INFO] Parsed result:', result);

    res.json(result);
  } catch (e) {
    console.error('[ERROR] Exception occurred:', e.message);
    res.status(400).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
