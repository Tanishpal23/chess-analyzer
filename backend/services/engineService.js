import { spawn } from "child_process";

/**
 * Run Stockfish engine directly to analyze a given FEN.
 */
export async function analyzeWithEngine(fen) {
  return new Promise((resolve, reject) => {
    const stockfishPath = "C:\\Program Files\\stockfish\\stockfish.exe";

    const engine = spawn(stockfishPath);
    let output = "";
    let readyOk = false;
    let uciOk = false;

    engine.stdout.on("data", (data) => {
      const chunk = data.toString();
      output += chunk;

      if (!uciOk && chunk.includes("uciok")) {
        uciOk = true;
        engine.stdin.write("isready\n");
      } else if (uciOk && !readyOk && chunk.includes("readyok")) {
        readyOk = true;
        engine.stdin.write(`position fen ${fen}\n`);
        engine.stdin.write("go depth 10\n");
      } else if (chunk.includes("bestmove")) {
        engine.stdin.end();
        resolve(parseOutput(output));
      }
    });

    engine.stderr.on("data", (data) => {
      console.error("[STOCKFISH ERROR]", data.toString());
    });

    engine.on("error", reject);
    engine.stdin.write("uci\n");
  });
}

function parseOutput(output) {
  const lines = output.split("\n");
  let result = { bestmove: "", score_cp: 0, depth: 0, pv: "" };

  for (const line of lines) {
    if (line.includes("depth ")) {
      const m = line.match(/depth (\d+)/);
      if (m) result.depth = parseInt(m[1]);
    }
    if (line.includes("score cp")) {
      const m = line.match(/score cp (-?\d+)/);
      if (m) result.score_cp = parseInt(m[1]);
    }
    if (line.includes("pv ")) {
      result.pv = line.substring(line.indexOf("pv ") + 3).trim();
    }
    if (line.includes("bestmove ")) {
      const m = line.match(/bestmove ([^\s]+)/);
      if (m) result.bestmove = m[1];
    }
  }
  return result;
}
