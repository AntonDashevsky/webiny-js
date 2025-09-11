import type { NavigateOptions, To } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export interface UseHistory {
    push: (to: To, options?: NavigateOptions) => void;
}
export const useHistory = (): UseHistory => {
    const navigate = useNavigate();
    return {
        push: (to, options) => {
            navigate(to, options);
        }
    };
};
