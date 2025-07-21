import React, { useCallback, useEffect, useRef, useState } from "react";

interface InlineSvgProps {
    src: string;
    className?: string;
}

export const InlineSvg = ({ src, className = "" }: InlineSvgProps) => {
    const ref = useRef<HTMLObjectElement | null>(null);
    const [dataUrl, setDataUrl] = useState<string | null>(null);

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

        if (src.startsWith("data:image/svg+xml")) {
            setDataUrl(src);
            return;
        }

        fetch(src)
            .then(res => res.text())
            .then(svg => setSvg(svg))
            .catch(console.error);
    }, [src]);

    if (dataUrl) {
        return <object data={src} />;
    }

    return <div ref={ref} />;
};
