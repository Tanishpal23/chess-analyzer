
import { useEffect, useState } from "react"; // 👈 import useState too!
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // 👈 make sure icons show up

export default function ControlPanel({ logic, className = "" }) {
  // ✅ add a state variable for the play/pause icon
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const triggers = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    triggers.forEach(el => new window.bootstrap.Tooltip(el));
  }, []);

  const NavBtn = ({ icon, title, onClick }) => (
    <button
      type="button"
      className="btn btn-outline-secondary"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={title}
      onClick={onClick}
    >
      <i className={`bi ${icon}`}></i>
    </button>
  );

  // ✅ this now works because setIsPlaying is defined
  const handlePlayPause = () => {
    logic.toggleAutoplay();
    setIsPlaying(prev => !prev);
  };

  return (
    <div className={`card ${className}`}>
      <div className="card-body d-grid gap-2">
        <div className="btn-group" role="group" aria-label="Move navigation">
          <NavBtn icon="bi-skip-backward-fill" title="Go to start" onClick={logic.toStart} />
          <NavBtn icon="bi-skip-start-fill" title="Previous move" onClick={logic.prev} />

          {/* 👇 icon changes dynamically */}
          <NavBtn
            icon={isPlaying ? "bi-pause-fill" : "bi-play-fill"}
            title={isPlaying ? "Pause" : "Play"}
            onClick={handlePlayPause}
          />

          <NavBtn icon="bi-skip-end-fill" title="Next move" onClick={logic.next} />
          <NavBtn icon="bi-skip-forward-fill" title="Go to end" onClick={logic.toEnd} />
        </div>

        <div className="btn-group" role="group" aria-label="Game actions">
          <NavBtn icon="bi-flag-fill text-danger" title="Resign" onClick={logic.resign} />
          <NavBtn icon="bi-hand-thumbs-up" title="Offer draw" onClick={logic.offerDraw} />
          <NavBtn icon="bi-save" title="Save game" onClick={logic.saveGame} />
        </div>
      </div>
    </div>
  );
}
