import React from "react";

export const useEfffectOnce = (effect: React.EffectCallback) => {
  return React.useEffect(effect, []);
};
