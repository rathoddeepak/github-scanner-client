import React, { useMemo } from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
} from "react-native";
import { colors } from "../themes";
import { useQuery } from "@apollo/client";
import { GET_REPOS } from "../queries";
import { humanFileSize } from "../utils";

const githubIconURL = "https://img.icons8.com/?size=90&id=62856&format=png";

const RepoList = ({ onSelect, token }) => {
	const { loading, data } = useQuery(GET_REPOS, {
		variables: {
			token,
		},
	});
	const { repositories } = data || {};
	const scannableRepos = useMemo(
		() =>
			(repositories || []).filter((r) =>
				r?.name?.startsWith("Scannable")
			),
		[repositories]
	);

	const renderCard = ({ item }) => {
		return (
			<Card
				onPress={() => {
					onSelect({
						owner: item.owner,
						repoName: item.name,
					});
				}}
				data={item}
			/>
		);
	};

	const renderHeader = () => {
		return loading ? (
			<View style={style.loading}>
				<ActivityIndicator size={30} color={colors.text} />
			</View>
		) : (
			<>
				<Text style={style.sectionTitle}>Scannable Repos</Text>
				{scannableRepos.map((data) => renderCard({ item: data }))}
				<Text style={style.sectionTitle}>Other Repos</Text>
			</>
		);
	};
	return (
		<FlatList
			data={repositories}
			renderItem={renderCard}
			keyExtractor={(item) => item.name}
			ListHeaderComponent={renderHeader}
		/>
	);
};

const Card = ({ data: { name, size, owner, isPrivate }, onPress }) => {
	const mSize = humanFileSize(size * 1000);
	return (
		<TouchableOpacity onPress={onPress} style={style.card}>
			<Image style={style.icon} source={{ uri: githubIconURL }} />
			<View style={style.content}>
				<Text style={style.name}>{name}</Text>
				<Text style={style.desc}>
				owner: <Text style={style.bold}>{owner}</Text>
				</Text>
				<Text style={style.desc}>					
					size: <Text style={style.bold}>{mSize}</Text>
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const style = StyleSheet.create({
	main: {},
	card: {
		marginTop: 20,
		width: 320,
		height: 70,
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.border,
		backgroundColor: colors.card,
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		width: 40,
		height: 40,
		tintColor: colors.text,
	},
	sectionTitle: {
		fontSize: 18,
		paddingLeft: 10,
		fontWeight: "bold",
		color: colors.text,
		marginTop: 20,
	},
	content: {
		paddingLeft: 10,
	},
	name: {
		fontSize: 15,
		color: colors.text,
		fontWeight: "500",
	},
	desc: {
		fontSize: 13,
		marginTop: 3,
		color: colors.grey,
	},
	bold: {
		fontWeight: "500",
		color: colors.text,
	},
	loading: {
		height: 300,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default RepoList;