import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import images from "@/constants/images";
import { RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

// Error Display UI Component (Internal)
interface ErrorDisplayProps {
  code?: string;
  title?: string;
  message?: string;
  error?: Error | null;
  errorInfo?: React.ErrorInfo | null;
  onRetry?: () => void;
}

const ErrorDisplay = ({ 
  code = "404", 
  title = "Page not found", 
  message = "The Page You Are Looking Is Temporarily Unavailable.",
  error,
  errorInfo,
  onRetry
}: ErrorDisplayProps) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Universal Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed bg-no-repeat transition-all duration-500 ease-in-out"
          style={{ backgroundImage: `url(${isMobile ? images.universalMobile : images.universal})` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Error Code */}
        <h1 className="text-[120px] md:text-[180px] font-brand leading-none tracking-tight text-white drop-shadow-xl animate-pulse">
          {code}
        </h1>

        {/* Glass Card */}
        <div className="-mt-6 w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_40px_rgba(255,255,255,0.05)] px-8 py-10 text-center">
          <h2 className="text-3xl md:text-4xl font-brand font-semibold mb-4 text-white">
            {title}
          </h2>

          <p className="text-sm md:text-base text-gray-300 max-w-md mx-auto leading-relaxed mb-8 tracking-widest text-[10px] uppercase">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {onRetry ? (
              <Button
                onClick={onRetry}
                className="px-8 py-6 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em]"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            ) : null}
            
            <Button
              onClick={() => {
                if (window.location.pathname !== "/") {
                  window.location.href = "/";
                }
              }}
              className="px-8 py-6 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em]"
            >
              <Home className="w-4 h-4 mr-2" />
              Go back home
            </Button>
          </div>

          {/* Dev Debug Info */}
          {import.meta.env.DEV && error && (
            <div className="mt-8 text-left">
              <details className="bg-black/40 rounded-lg p-4 border border-white/5">
                <summary className="text-[10px] uppercase font-bold text-red-400 cursor-pointer mb-2">Technical Details</summary>
                <pre className="text-[9px] text-gray-500 overflow-auto max-h-32 whitespace-pre-wrap font-mono">
                  {error.toString()}
                  {errorInfo?.componentStack}
                </pre>
              </details>
            </div>
          )}
        </div>

        {/* Bottom Line */}
        <div className="absolute bottom-12 w-[80%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
};

// ErrorBoundary Wrapper Component (Class Component)
interface EBProps {
  children: React.ReactNode;
}

interface EBState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<EBState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorDisplay
          code="500"
          title="Internal Error"
          message="We encountered an unexpected error. Please retry or return home."
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={this.handleRetry}
        />
      );
    }
    return this.props.children;
  }
}

// 404 Component (Default Export)
const NotFound = () => {
  return (
    <ErrorDisplay 
      code="404" 
      title="Page not found" 
      message="The Page You Are Looking Is Temporarily Unavailable."
    />
  );
};

export default NotFound;