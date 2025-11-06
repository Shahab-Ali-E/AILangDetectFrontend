import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiRequestConfig {
  url: string;
  method?: HttpMethod;
  headers?: Record<string, string>;
  // Accepts FormData, JSON-serializable, or undefined
  body?: unknown;
  // Customize success message toast; false disables success toast
  successMessage?: string | false;
}

export interface UseApiState<TResponse> {
  data: TResponse | null;
  error: string | null;
  isLoading: boolean;
}

export interface UseApiReturn<TResponse> extends UseApiState<TResponse> {
  request: (config: ApiRequestConfig) => Promise<TResponse | null>;
  reset: () => void;
}

export function useApi<TResponse = unknown>(): UseApiReturn<TResponse> {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  const request = useCallback(async (config: ApiRequestConfig) => {
    const { url, method = "POST", headers = {}, body, successMessage } = config;

    // Abort any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
      const isJsonLike = body && !isFormData;

      const response = await fetch(url, {
        method,
        headers: {
          ...(isJsonLike ? { "Content-Type": "application/json" } : {}),
          ...headers,
        },
        body: isFormData ? (body as FormData) : isJsonLike ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      const contentType = response.headers.get("content-type") || "";
      const parseAsJson = contentType.includes("application/json");
      const parsed = (parseAsJson ? await response.json() : await response.text()) as TResponse;

      if (!response.ok) {
        let message = response.statusText || "Request failed";
        if (parseAsJson) {
          const parsedObj = parsed as unknown as Record<string, unknown>;
          if (parsedObj && typeof parsedObj === "object" && "message" in parsedObj && typeof parsedObj.message === "string") {
            message = parsedObj.message;
          }
        }
        setError(message);
        toast.error("Request failed", {
          description: message,
        });
        setIsLoading(false);
        return null;
      }

      setData(parsed);
      if (successMessage !== false) {
        toast.success(successMessage || "Request successful");
      }
      setIsLoading(false);
      return parsed;
    } catch (err: unknown) {
      if (err && typeof err === "object" && (err as { name?: string }).name === "AbortError") {
        setIsLoading(false);
        return null;
      }
      const message = err instanceof Error ? err.message : "Unexpected error occurred";
      setError(message);
      toast.error("Something went wrong", {
        description: message,
      });
      setIsLoading(false);
      return null;
    } finally {
      abortRef.current = null;
    }
  }, []);

  return { data, error, isLoading, request, reset };
}


