import * as React from "react";

export const ErrorMessage = ({ message }: { message: string }) => (
    <div
        style={{
            margin: 15,
            borderRadius: 4,
            border: "1px solid rgba(150, 0, 0, 0.35)",
            color: "rgba(150, 0, 0, 1)",
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            padding: 15,
            fontSize: 14,
            textAlign: "center"
        }}
    >
        {message}
    </div>
);

/**
 * Provides error boundaries for safety (one component errors won't crash the whole app)
 */
export class ErrorBoundary extends React.Component<
    any,
    { hasError: boolean; error: Error | undefined }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            error: undefined
        };
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    override render() {
        if (this.state.hasError && this.state.error) {
            return <ErrorMessage message={this.state.error.message} />;
        }

        return this.props.children;
    }
}
