import MainScreen from "./screens/main";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { API_URL } from "./utils/constants";

const client = new ApolloClient({
	uri: API_URL,
	cache: new InMemoryCache(),
});

const App = () => (
	<ApolloProvider client={client}>
		<MainScreen />
	</ApolloProvider>
);

export default App;