import React, { useEffect, useRef } from "react";

const ContextMenu = ({
  children,
  top,
  bottom,
  left,
  right,
  menuOpen,
  setMenuOpen,
}) => {
  const contextMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        menuOpen &&
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <div
      ref={contextMenuRef}
      className={`transition-all duration-300 ${
        menuOpen ? "absolute w-fit h-fit z-30 " : "hidden"
      }  `}
      style={{ top, right, bottom, left }}
    >
      {children}
    </div>
  );
};

export default ContextMenu;
