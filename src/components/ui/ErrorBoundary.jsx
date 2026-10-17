import { Component } from 'react';
/** Rendering exceptions need a recoverable state rather than a blank browser window. */
export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, details) { console.error('Portfolio render error:', error, details.componentStack); }
  render() {
    if (this.state.error) return <main className="shell page-section" role="alert">
      <div className="state"><h1>Something went wrong.</h1><p>We couldn't display this page.</p>
        <button type="button" className="btn btn-primary" onClick={() => { this.setState({ error: null }); window.location.assign('/'); }}>Return home</button>
      </div></main>;
    return this.props.children;
  }
}
