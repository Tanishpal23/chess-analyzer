
// src/views/Play/Arena/ArenaHeader.jsx
export default function ArenaHeader({ mode, logic }) {
  const { whitePlayer, blackPlayer, clocks, resultBanner } = logic;
  return (
    <header className="arena-header d-flex align-items-center justify-content-between px-2" style={{paddingTop: '70px'}}>
      <div className="d-flex align-items-center gap-2">
        <span className="badge bg-secondary rounded-pill text-uppercase">{mode}</span>
        <span className="fw-semibold">{whitePlayer?.displayName || "Anonymous"}</span>
        <span className="text-muted">vs</span>
        <span className="fw-semibold">{blackPlayer?.displayName || "Anonymous"}</span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <div className="text-end">
          <div className="small text-muted">White</div>
          <div className="fs-5">{clocks.white}</div>
        </div>
        <div className="text-end">
          <div className="small text-muted">Black</div>
          <div className="fs-5">{clocks.black}</div>
        </div>
      </div>
      {resultBanner && (
        <div className="alert alert-dark py-1 px-2 ms-2 mb-0">{resultBanner}</div>
      )}
    </header>
  );
}

