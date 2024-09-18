import React, { ErrorInfo, ReactNode } from 'react';

// Define the types for the props and state of the ErrorBoundary component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('Error occurred:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI if an error is caught
      return <h1>Something went wrong.</h1>;
    }

    // Render children components if no error has occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
