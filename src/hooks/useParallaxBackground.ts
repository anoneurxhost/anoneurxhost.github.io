
import { useEffect } from "react";

/**
 * Disabled: the scroll-linked background drift was distracting and repainted on
 * every scroll event. The class is left in place so existing markup is harmless.
 */
export function useParallaxBackground() {
  useEffect(() => {
    // Intentionally no-op.
  }, []);
}
