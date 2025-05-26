import React, { useEffect, useState } from "react";

export const InlineSvg = ({ src }: { src: string }) => {
    const [svgContent, setSvgContent] = useState<string | null>(null);

    useEffect(() => {
        fetch(src)
            .then(res => res.text())
            .then(setSvgContent)
            .catch(console.error);
    }, [src]);

    return <div className="wby-w-6 wby-h-6 wby-fill-neutral-strong" dangerouslySetInnerHTML={{ __html: svgContent ?? "" }} />;
};
