import React, { ErrorInfo } from "react";

interface ErrorBoundaryProps {
  fallBackComponent: React.ReactNode;
  children?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { fallBackComponent, children } = this.props;
    if (hasError) {
      return fallBackComponent;
    }
    return <>{children}</>;
  }
}
