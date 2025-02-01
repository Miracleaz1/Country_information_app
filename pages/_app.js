// Import global CSS styles
import '../components/styles/globals.css';

// Custom App component to initialize pages
function MyApp({ Component, pageProps }) {
// Render the specific page component with its props
  return <Component {...pageProps} />;
}
// Export the custom App component as the default export
export default MyApp;