import React, { useState } from "react";
import {
	View,
	Text,	
	StyleSheet,
	useWindowDimensions,
} from "react-native";
import RepoList from '../components/repoList';
import RepoDetails from '../components/repoDetails';
import { colors } from "../themes";

const MainScreen = () => {
	const { height, width } = useWindowDimensions();
	const [currentRepo, setCurrentRepo] = useState(null);
	return (
		<View style={{ height, width }}>
			<View style={style.header}>
				<Text style={style.headTitle}>Github Scanner</Text>
			</View>
			<View style={style.content}>
				<View style={style.sideBar}>
					<RepoList
						onSelect={(data) => {
							console.log(data);
							setCurrentRepo(data);
						}}
					/>
				</View>
				<View style={style.mainContent}>
					<RepoDetails
						repoData={currentRepo}
					/>
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
		justifyContent: "center",
		backgroundColor: colors.foreground,
		borderBottomWidth: 1,
		borderColor: colors.border
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
		alignItems: "center"
	},
});

export default MainScreen;