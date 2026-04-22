import {
  DelayedRoutesWidget,
  Layout,
  LiveStatus,
  NetworkSummaryWidget,
  RampAlgorithmsWidget,
  WeatherWidget,
} from '.';

function App() {
  return (
    <Layout
      title="Situational Awareness Dashboard"
      subtitle="Melbourne Traffic Management — CoreITS"
      actions={<LiveStatus />}
    >
      <div className="lg:col-span-1">
        <WeatherWidget />
      </div>
      <div className="lg:col-span-2">
        <DelayedRoutesWidget />
      </div>
      <div className="lg:col-span-2">
        <RampAlgorithmsWidget />
      </div>
      <div className="lg:col-span-1">
        <NetworkSummaryWidget />
      </div>
    </Layout>
  );
}

export default App;
