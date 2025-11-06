// src/views/Play/Arena/ControlPanel.jsx
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ControlPanel({ logic, className = "" }) {
  useEffect(() => {
    const triggers = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    triggers.forEach(el => new window.bootstrap.Tooltip(el));
  }, []);

  const NavBtn = ({ icon, title, onClick }) => (
    <button type="button" className="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title={title} onClick={onClick}>
      <img src={icon} alt="" height="18" />
    </button>
  );

  return (
    <div className={`card ${className}`}>
      <div className="card-body d-grid gap-2">
        <div className="btn-group" role="group" aria-label="Move navigation">
          <NavBtn icon="/src/assets/icons/btn_start.svg" title="Go to start" onClick={logic.toStart} />
          <NavBtn icon="/src/assets/icons/btn_prev.svg" title="Previous move" onClick={logic.prev} />
          <NavBtn icon="/src/assets/icons/btn_playpause.svg" title="Play/Pause" onClick={logic.toggleAutoplay} />
          <NavBtn icon="/src/assets/icons/btn_next.svg" title="Next move" onClick={logic.next} />
          <NavBtn icon="/src/assets/icons/btn_end.svg" title="Go to end" onClick={logic.toEnd} />
        </div>

        <div className="btn-group" role="group" aria-label="Game actions">
          <NavBtn icon="/src/assets/icons/btn_resign.svg" title="Resign" onClick={logic.resign} />
          <NavBtn icon="/src/assets/icons/btn_draw.svg" title="Offer draw" onClick={logic.offerDraw} />
          <NavBtn icon="/src/assets/icons/btn_save.svg" title="Save game" onClick={logic.saveGame} />
        </div>
      </div>
    </div>
  );
}
