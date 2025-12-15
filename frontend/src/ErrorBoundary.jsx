import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: "system-ui" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Frontend crashed</h2>
          <p style={{ marginTop: 8 }}>
            The page turned black because a JavaScript error occurred.
          </p>

          <h3 style={{ marginTop: 16, fontWeight: 700 }}>Error</h3>
          <pre style={{ whiteSpace: "pre-wrap", background: "#111", color: "#fff", padding: 12, borderRadius: 8 }}>
            {String(this.state.error)}
          </pre>

          {this.state.info?.componentStack ? (
            <>
              <h3 style={{ marginTop: 16, fontWeight: 700 }}>Component Stack</h3>
              <pre style={{ whiteSpace: "pre-wrap", background: "#111", color: "#fff", padding: 12, borderRadius: 8 }}>
                {this.state.info.componentStack}
              </pre>
            </>
          ) : null}

          <p style={{ marginTop: 16 }}>
            Copy and send the error text above to fix it quickly.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
