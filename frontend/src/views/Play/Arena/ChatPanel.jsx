// // src/views/Play/Arena/ChatPanel.jsx
// export default function ChatPanel({ logic }) {
//   return (
//     <>
//       <div className="d-lg-none mb-2">
//         <button className="btn btn-outline-secondary w-100" data-bs-toggle="offcanvas" data-bs-target="#chatOffcanvas">
//           Open chat
//         </button>
//       </div>

//       <div className="card d-none d-lg-flex" style={{ minHeight: 320 }}>
//         <div className="card-header py-2">Chat room</div>
//         <div className="card-body overflow-auto" style={{ height: 360 }}>
//           {logic.messages.map((m, i) => (
//             <div key={i} className="small mb-2"><span className="text-muted">{m.when}</span> — {m.text}</div>
//           ))}
//         </div>
//         <div className="card-footer">
//           <div className="input-group">
//             <input className="form-control" placeholder="Type a message…" value={logic.chatDraft} onChange={e => logic.setChatDraft(e.target.value)} />
//             <button className="btn btn-primary" onClick={logic.sendMessage}>Send</button>
//           </div>
//         </div>
//       </div>

//       <div className="offcanvas offcanvas-start d-lg-none" tabIndex="-1" id="chatOffcanvas">
//         <div className="offcanvas-header">
//           <h5 className="offcanvas-title">Chat room</h5>
//           <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//         </div>
//         <div className="offcanvas-body d-flex flex-column">
//           <div className="flex-grow-1 overflow-auto">
//             {logic.messages.map((m, i) => (
//               <div key={i} className="small mb-2"><span className="text-muted">{m.when}</span> — {m.text}</div>
//             ))}
//           </div>
//           <div className="pt-2">
//             <div className="input-group">
//               <input className="form-control" placeholder="Type a message…" value={logic.chatDraft} onChange={e => logic.setChatDraft(e.target.value)} />
//               <button className="btn btn-primary" onClick={logic.sendMessage} data-bs-dismiss="offcanvas">Send</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }










// src/views/Play/Arena/ChatPanel.jsx
export default function ChatPanel({ logic }) {
  return (
    <>
      <div className="card arena-panel d-lg-none mb-2">
        <button className="btn btn-outline-secondary w-100" data-bs-toggle="offcanvas" data-bs-target="#chatOffcanvas">
          Open chat
        </button>
      </div>

      <div className="card arena-pane1 d-none d-lg-flex" style={{ minHeight: 320 }}>
        <div className="card-header py-2">Chat room</div>
        <div className="card-body 
        chat-body overflow-auto" style={{ height: 360 }}>
          {logic.messages.map((m, i) => (
            <div key={i} className="small mb-2"><span className="text-muted">{m.when}</span> — {m.text}</div>
          ))}
        </div>
        <div className="card-footer chat-input">
          <div className="input-group">
            <input className="form-control" placeholder="Type a message…" value={logic.chatDraft} onChange={e => logic.setChatDraft(e.target.value)} />
            <button className="btn btn-primary" onClick={logic.sendMessage}>Send</button>
          </div>
        </div>
      </div>

      <div className="offcanvas offcanvas-start d-lg-none" tabIndex="-1" id="chatOffcanvas">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Chat room</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-flex flex-column">
          <div className="flex-grow-1 overflow-auto">
            {logic.messages.map((m, i) => (
              <div key={i} className="small mb-2"><span className="text-muted">{m.when}</span> — {m.text}</div>
            ))}
          </div>
          <div className="pt-2">
            <div className="input-group">
              <input className="form-control" placeholder="Type a message…" value={logic.chatDraft} onChange={e => logic.setChatDraft(e.target.value)} />
              <button className="btn btn-primary" onClick={logic.sendMessage} data-bs-dismiss="offcanvas">Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
