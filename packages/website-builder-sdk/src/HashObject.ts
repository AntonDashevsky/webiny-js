import stringify from "fast-json-stable-stringify";

class HashObject {
    hash(object: object) {
        return this.fastHash(object);
    }

    private fastHash(obj: object): number {
        const str = stringify(obj); // stable key order
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
        }
        return hash >>> 0; // unsigned
    }
}

export const hashObject = new HashObject();
