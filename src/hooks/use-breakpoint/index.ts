import { useState, useEffect } from "react";
import { EBreakPoint } from "../../shared/enum";
import { getBreakpointFromWindowWidth } from "../../shared/utils";

interface IUseBreakpointReturn {
  breakpoint: EBreakPoint;
}

const useBreakpoint = (): IUseBreakpointReturn => {
  const [breakpoint, setBreakpoint] = useState<EBreakPoint>(getBreakpointFromWindowWidth());

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      setBreakpoint(getBreakpointFromWindowWidth());
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { breakpoint };
};

export { useBreakpoint };
