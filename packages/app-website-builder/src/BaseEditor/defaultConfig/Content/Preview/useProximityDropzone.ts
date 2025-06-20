import { useEffect, useState } from "react";
import { useDropZoneManager } from "./DropZoneManagerProvider";
import { Box } from "./Box";
import { DropZoneProximity } from "~/BaseEditor/defaultConfig/Content/Preview/DropZoneManager";

export interface DropEvent {
    item: { id?: string; componentName: string };
    target: { parentId: string; slot: string; index: number };
}

interface UseProximityDropzoneParams {
    id: string;
    box: Box;
}

export function useProximityDropzone({ id, box }: UseProximityDropzoneParams) {
    const dropzoneManager = useDropZoneManager();
    const [proximity, setProximity] = useState<DropZoneProximity | null>(null);

    useEffect(() => {
        dropzoneManager.register({
            id,
            box,
            onProximityChange: setProximity
        });

        return () => {
            dropzoneManager.unregister(id);
        };
    }, [id, box]);

    return { proximity };
}
