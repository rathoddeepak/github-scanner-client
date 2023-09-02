import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	useWindowDimensions,
} from "react-native";
import RepoList from "../components/repoList";
import RepoDetails from "../components/repoDetails";
import { colors } from "../themes";

const MainScreen = () => {
	const { height, width } = useWindowDimensions();
	const [currentRepo, setCurrentRepo] = useState(null);
	const [currentToken, setCurrentToken] = useState(
		"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"
	);
	return (
		<View style={{ height, width }}>
			<View style={style.header}>
				<Text style={style.headTitle}>Github Scanner</Text>
				<View style={style.tokenCover}>
					<Text style={style.tokenText}>Developer Token: </Text>
					<TextInput
						style={style.input}
						onChangeText={setCurrentToken}
						value={currentToken}
						placeholder="Enter Token"
						placeholderTextColor={colors.grey}
					/>
				</View>
			</View>
			<View style={style.content}>
				<View style={style.sideBar}>
					<RepoList
						token={currentToken}
						onSelect={(data) => {
							setCurrentRepo(data);
						}}
					/>
				</View>
				<View style={style.mainContent}>
					<RepoDetails token={currentToken} repoData={currentRepo} />
				</View>
			</View>
		</View>
	);
};

const style = StyleSheet.create({
	main: {
		flex: 1,
		height: 300,
		backgroundColor: colors.background,
	},
	header: {
		height: 60,
		width: "100%",
		paddingLeft: 10,
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: colors.foreground,
		borderBottomWidth: 1,
		borderColor: colors.border,
		flexDirection: "row"
	},
	headTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: colors.text,
	},
	content: {
		flexDirection: "row",
		flex: 1,
		backgroundColor: colors.background,
	},
	sideBar: {
		width: 350,
		backgroundColor: colors.foreground,
	},
	mainContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		height: 40,
		width: 300,
		borderWidth: 1,
		borderRadius: 5,
		paddingLeft: 5,
		color: colors.text,
		borderColor: colors.border,
	},
	tokenCover: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 10
	},
	tokenText: {
		fontSize: 15,
		color: colors.text,
		marginRight: 20,
		fontWeight: "bold"
	}
});

export default MainScreen;