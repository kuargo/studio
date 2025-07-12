'use client'
import React, { ReactNode } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', error, errorInfo)
    // TODO: Log to an error tracking service like Sentry or Bugsnag
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="p-8 text-center rounded-lg border max-w-md" data-testid="error-boundary">
                <h2 className="text-2xl font-bold text-destructive">Something went wrong</h2>
                <p className="text-muted-foreground mt-2">The application encountered an unexpected error. Please try again.</p>
                <Button 
                    onClick={() => this.setState({ hasError: false, error: null })}
                    data-testid="error-boundary-retry"
                    className="mt-6"
                >
                    Try Again
                </Button>
            </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
