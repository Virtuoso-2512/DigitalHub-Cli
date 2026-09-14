import { useEffect } from "react";
import Button from "./button";
import "./Popup.css";

function Popup({open, setOpen, children, title, noclick, modalStyle, backgroundStyle}) {  
  useEffect(() => document.body.style.overflow = (open ? 'hidden' : "auto"), [open])

  const closeModal = () => {
    if(noclick) return;
    else setOpen(false)
  }

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleClickOutside = (event) => {
    if (event.target.className === 'modalBackground') closeModal();
  };
  
  return open ? <div className="modalBackground" style={backgroundStyle} onClick={handleClickOutside}>
    <div className="modalContainer" style={modalStyle} onClick={(e) => e.stopPropagation()}>
      <h2 style={{marginRight:"auto"}}>{title}</h2>
      <div className="body">
        {children}
      </div>
    </div>
  </div> : null;
}

export default Popup;
