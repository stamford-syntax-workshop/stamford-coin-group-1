import { Button, Container, Flex, Text, TextField } from "@radix-ui/themes";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function App() {
	const [coinData, setCoinData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		const formData = new FormData(event.target);
		let coinName = formData.get("coin_name_field");

		// Can you use React Hooks to achieve this functionality?

		// console.log(result.status.data.coins.uuid);

		if (coinName == "") {
			console.log("please input value");
			coinName = "asdlfjas;";
		}
		const fetcher = await fetch(`https://api.coinranking.com/v2/coins?search=${coinName}`);
		const result = await fetcher.json();
		if (result.data.stats.total == 0) {
			console.log("coin is not provide");
		}
		// console.log(result.status.data.coins.uuid);
		console.log(result.data.coins.length);
		console.log(result);
		setCoinData(result);

		setIsLoading(false);
	};

	return (
		<Container>
			<Flex direction="column" gap="4">
				<form onSubmit={handleSubmit}>
					<Flex direction="column" gap="2">
						<TextField.Root>
							<TextField.Slot>
								<IconSearch height="16" width="16" />
							</TextField.Slot>
							<TextField.Input name="coin_name_field" placeholder="Search for BTC, ETH, XRP..." />
						</TextField.Root>
						<div className="ml-auto">
							<Button>Search</Button>
						</div>
					</Flex>
				</form>

				{isLoading && <Text>Loading..</Text>}

				{coinData && coinData.status === "error" && <Text>Error: {coinData.message}</Text>}

				{coinData && coinData.status === "success" && (
					<Flex direction="column" gap="4">
						{coinData.data.coins.map((coin) => (
							<Link
								key={`coin_${coin.uuid}`}
								to={`/coin/${coin.uuid}` /* TODO: pass uuid to coin info page*/}
							>
								{/* TODO: create a custom component to display list of coins and pass these fields as props */}
								<div>{coin.name}</div>
								<div>{coin.symbol}</div>
								<div>{coin.iconUrl}</div>
							</Link>
						))}
					</Flex>
				)}
			</Flex>
		</Container>
	);
}

export default App;
