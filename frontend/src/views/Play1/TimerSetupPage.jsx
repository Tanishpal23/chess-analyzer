import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";



import { GameContext } from "../../context/GameContext.jsx";
import { Modal } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../styles/TimerSetupPage.css";

const PRESETS = [
  // Row 1
  { label: "1+0", m: 1, inc: 0, tag: "Bullet" },
  { label: "2+1", m: 2, inc: 1, tag: "Bullet" },
  { label: "3+0", m: 3, inc: 0, tag: "Blitz" },
  // Row 2
  { label: "3+2", m: 3, inc: 2, tag: "Blitz" },
  { label: "5+0", m: 5, inc: 0, tag: "Blitz" },
  { label: "5+3", m: 5, inc: 3, tag: "Blitz" },
  // Row 3
  { label: "10+0", m: 10, inc: 0, tag: "Rapid" },
  { label: "10+5", m: 10, inc: 5, tag: "Rapid" },
  { label: "15+10", m: 15, inc: 10, tag: "Rapid" },
  // Row 4
  { label: "30+0", m: 30, inc: 0, tag: "Classical", forceRow4: true },
  { label: "Custom", custom: true, forceRow4: true },
  { label: "No timer", none: true, forceRow4: true },
];

export default function TimerSetupPage() {
  const navigate = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");

  const { setTimeControl } = useContext(GameContext);
  const [customMinutes, setCustomMinutes] = useState(10);
  const [customInc, setCustomInc] = useState(0);
  const [error, setError] = useState("");

  const startIncrement = (m, inc) => {
    setTimeControl({
      kind: "increment",
      baseMinutes: m,
      incrementSeconds: inc,
      hasTimer: true,
    });
    // navigate(`/play/arena/`);
    
    navigate(`/play/arena?m=${m}&inc=${inc}&mode=${mode}`);
  };

  const startNoTimer = () => {
    setTimeControl({
      kind: "none",
      baseMinutes: 0,
      incrementSeconds: 0,
      hasTimer: false,
    });
    // navigate("/play/arena");
    navigate(`/play/arena?m=${m}&inc=${inc}&mode=${mode}`);

  };

  const handleCustomStart = () => {
    const m = Number(customMinutes);
    const i = Number(customInc);

    if (!Number.isFinite(m) || !Number.isFinite(i) || m < 0 || i < 0) {
      setError("Enter non-negative numbers");
      return;
    }

    setError("");

    // ✅ Hide modal manually (Bootstrap 5 API)
    const modalEl = document.getElementById("customTimeModal");
    if (modalEl) {
      
      const modalInstance = Modal.getInstance(modalEl) || new Modal(modalEl);
      modalInstance.hide();

      // Wait for modal animation (~300ms), then navigate
      setTimeout(() => {
        setTimeControl({
          kind: "increment",
          baseMinutes: m,
          incrementSeconds: i,
          hasTimer: true,
        });
        // navigate("/play
        navigate(`/play/arena?m=${m}&inc=${inc}&mode=${mode}`);

      }, 300);
    } else {
      // fallback if modal not found
      setTimeControl({
        kind: "increment",
        baseMinutes: m,
        incrementSeconds: i,
        hasTimer: true,
      });
      // navigate("/play/arena");
      navigate(`/play/arena?m=${m}&inc=${inc}&mode=${mode}`);

    }
  };

  return (
    <div className="timer-setup-container">
      <div className="container py-5">
        <h2 className="text-center mb-4 fw-bold">Choose Time Control</h2>

        <div className="row g-3 justify-content-center">
          {PRESETS.map((p, i) => {
            if (p.custom) {
              return (
                <div className="col-12 col-sm-6 col-md-4" key={i}>
                  <button
                    type="button"
                    className="btn btn-light border rounded-3 w-100 py-4"
                    data-bs-toggle="modal"
                    data-bs-target="#customTimeModal"
                  >
                    <div className="fs-3 fw-semibold">{p.label}</div>
                    <div className="text-muted small">
                      Set minutes + increment
                    </div>
                  </button>
                </div>
              );
            }
            if (p.none) {
              return (
                <div className="col-12 col-sm-6 col-md-4" key={i}>
                  <button
                    type="button"
                    className="btn btn-light border rounded-3 w-100 py-4"
                    onClick={startNoTimer}
                  >
                    <div className="fs-3 fw-semibold">{p.label}</div>
                    <div className="text-muted small">Untimed</div>
                  </button>
                </div>
              );
            }
            return (
              <div className="col-12 col-sm-6 col-md-4" key={i}>
                <button
                  type="button"
                  className="btn btn-light border rounded-3 w-100 py-4"
                  onClick={() => startIncrement(p.m, p.inc)}
                >
                  <div className="fs-3 fw-semibold">{p.label}</div>
                  <div className="text-muted small">{p.tag}</div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom time modal */}
        <div
          className="modal fade"
          id="customTimeModal"
          tabIndex="-1"
          aria-labelledby="customTimeModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5
                  className="modal-title fw-semibold"
                  id="customTimeModalLabel"
                >
                  Custom Time Control
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label">Minutes</label>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      step="1"
                      className="form-control"
                      value={customMinutes}
                      onChange={(e) => setCustomMinutes(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Increment (sec)</label>
                    <input
                      type="number"
                      min="0"
                      max="60"
                      step="1"
                      className="form-control"
                      value={customInc}
                      onChange={(e) => setCustomInc(e.target.value)}
                    />
                  </div>
                </div>
                {error && <div className="text-danger mt-2 small">{error}</div>}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
  
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setTimeControl({
                      kind: "increment",
                      baseMinutes: Number(customMinutes),
                      incrementSeconds: Number(customInc),
                      hasTimer: true,
                    });
                    // navigate("/play/arena");
                    navigate(`/play/arena?m=${m}&inc=${inc}&mode=${mode}`);

                  }}
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
