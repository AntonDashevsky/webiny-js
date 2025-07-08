import React, { useCallback, useEffect, useRef } from "react";

interface InlineSvgProps {
    src: string;
    className?: string;
}

export const InlineSvg = ({ src, className = "" }: InlineSvgProps) => {
    const ref = useRef<HTMLImageElement>(null);

    const setSvg = useCallback((svg: string) => {
        if (ref.current) {
            const domParser = new DOMParser();
            const svgElement = domParser.parseFromString(svg, "image/svg+xml");

            svgElement.documentElement.classList.add(...className.split(" "));
            ref.current.outerHTML = svgElement.documentElement.outerHTML;
        }
    }, []);

    useEffect(() => {
        if (src.startsWith("<svg") && ref.current) {
            setSvg(src);
            return;
        }

        fetch(src)
            .then(res => res.text())
            .then(svg => setSvg(svg))
            .catch(console.error);
    }, [src]);

    return <img ref={ref} src={src} alt="" />;
};
