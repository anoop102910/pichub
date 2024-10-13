import { useState } from "react";

export default function useToggle(initial = false): [boolean, () => void] {
  const [isToggled, setIsToggled] = useState<boolean>(initial);
  const toggle = (): void => {
    setIsToggled(prev => !prev);
  };
  return [isToggled, toggle];
}
