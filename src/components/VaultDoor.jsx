import { useState, useRef } from "react";

function VaultWheel({ children }) {
  const [rotation, setRotation] = useState(0);
  const dragging = useRef(false);
  const lastAngle = useRef(0);

  const getAngle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return (
      Math.atan2(
        e.clientY - centerY,
        e.clientX - centerX
      ) *
      (180 / Math.PI)
    );
  };

  const handlePointerDown = (e) => {
    dragging.current = true;
    lastAngle.current = getAngle(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;

    const currentAngle = getAngle(e);
    let difference = currentAngle - lastAngle.current;

    if (difference > 180) difference -= 360;
    if (difference < -180) difference += 360;

    setRotation((prev) => prev + difference);
    lastAngle.current = currentAngle;
  };

  const handlePointerUp = () => {
    dragging.current = false;
  };

  return (
    <div
      className="lock-wheel"
      style={{ transform: `rotate(${rotation}deg)` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {children}
    </div>
  );
}

export default VaultWheel;