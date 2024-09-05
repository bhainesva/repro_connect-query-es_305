const ReactDOM = require('react-dom/client');
const React = require('react');
const { TransportProvider, useMutation } = require("@connectrpc/connect-query");
const { createConnectTransport } = require("@connectrpc/connect-web");
const {
  QueryClient,
  QueryClientProvider,
  useMutation: useMutationTanstack,
} = require("@tanstack/react-query");

const transport = createConnectTransport({
  baseUrl: "http://localhost/grpc",
});

const queryClient = new QueryClient();

export function Entry() {
  return React.createElement(
    TransportProvider,
    { transport },
    React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(Page, {})
    )
  );
}

function Page() {
  const tanMut = useMutationTanstack();
  console.log("Tanstack useMutation works: ", tanMut);
  const mut = useMutation();
  console.log("connect-query useMutation works: ", mut);
  return React.createElement("div", null, "hello world");
}

function init() {
  const reactTag = document.querySelector("script[data-react-id]");
  const root = document.createElement("div");
  const reactRoot = ReactDOM.createRoot(root);
  reactTag.parentElement?.appendChild(root);
  reactRoot.render(React.createElement(Entry), root);
}

init();
