import useEventListener from "@use-it/event-listener";
import { useEffect, useState } from "react";
import { DIRECTION, MAX_STEP } from "../../../settings/constants";

export default function useWalker() {
  const [facing, setFacing] = useState({
    current: DIRECTION.DOWN,
    previous: DIRECTION.DOWN
  });

  const [step, setStep] = useState(0);

  useEventListener<React.KeyboardEvent<HTMLDivElement>>("keydown", (event) => {
    const { key } = event;

    if (key.indexOf("Arrow") === -1) {
      return;
    }

    const keyDirection = key.replace("Arrow", "").toUpperCase();
    const direction = (DIRECTION as any)[keyDirection];

    setFacing(prev => ({ current: direction, previous: prev.current }));
  })

  useEffect(() => {
    if (facing.current === facing.previous) {
      return setStep(prev => (prev < MAX_STEP - 1 ? prev + 1 : 0));
    }

    return setStep(0);
  }, [facing]);

  return { facing, step };
}
