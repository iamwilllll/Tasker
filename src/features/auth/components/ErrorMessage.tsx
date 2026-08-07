export function ErrorMessage({ message }: { message?: string }) {
    if (!message) return null;

    return (
        <p role="alert" className="text-app-red mt-2 text-sm">
            {message}
        </p>
    );
}
