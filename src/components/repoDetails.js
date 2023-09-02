import React, { useMemo, useState } from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	Linking
} from "react-native";
import { colors } from "../themes";
import { useQuery } from "@apollo/client";
import { GET_REPO_DETAILS } from "../queries";
import { humanFileSize } from "../utils";

const illustrationImage = "https://i.postimg.cc/13SKM5Qm/Bitmap.png";
const tabs = ['Yml Files', 'Webhooks'];

const RepoDetails = ({ token, repoData = {} }) => {
	const { loading, data: result } = useQuery(GET_REPO_DETAILS, {
		skip: repoData?.repoName === undefined, 
		variables: {
			token,
			...repoData
		},
	});
	const data = result?.repositoryDetails || {};
	const  size = useMemo(() => {
		if(!data?.size){
			return '0B';
		}
		return humanFileSize(data?.size * 1000)
	}, [data?.size]);
	const [currentTab, setCurrentTab] = useState(0);	

	if(loading) {
		return (
			<ActivityIndicator size={30} color={colors.text} />
		)
	}

	if(!repoData?.repoName){
		return (
			<>
				<Image
					resizeMode="contain"
					style={style.illustration}
					source={{ uri: illustrationImage }}
				/>
				<Text style={style.emptyText}>Please Select Repository to View Details</Text>
			</>
		)
	}

	const renderTab = (tab, index) => {
		return (
			<TouchableOpacity onPress={() => setCurrentTab(index)} style={style.tab}>
				<Text style={style.tabText}>{tab}</Text>
				{currentTab === index ? <View style={style.inc} /> : null}
			</TouchableOpacity>
		)
	}

	const renderHooks = ({ item }) => {
		return (
			<View style={style.card}>
				<Text style={style.cardTitle}>{item.name}</Text>
				<Text style={style.cardDesc}>Status {item.active ? 'Active' : 'Inactive'}</Text>
			</View>
		)
	};

	const renderYml = ({ item }) => {
		const mSize = humanFileSize(item?.size * 1000);
		return (
			<TouchableOpacity style={style.card} onPress={() => Linking.openURL(item.url)}>
				<Text style={style.cardTitle}>{item.path}</Text>
				<Text style={style.cardDesc}>Size {mSize}</Text>
			</TouchableOpacity>
		)
	};

	return (
		<View style={style.main}>
			<View style={style.header}>
				<Text style={style.name}>{data?.name}</Text>
				<View style={style.row}>
					<Text style={style.desc}>Owner:  <Text style={style.bold}>{data?.owner}</Text></Text>
					<Text style={style.desc}>size <Text style={style.bold}>{size}</Text></Text>
					<Text style={style.desc}>File Count <Text style={style.bold}>{data?.numFiles}</Text></Text>
					<Text style={style.desc}>Access <Text style={style.boldGreen}>{data?.isPrivate ? 'Private' : 'Public'}</Text></Text>
				</View>
			</View>
			<View style={style.tabs}>
				{tabs.map(renderTab)}
			</View>
			<FlatList
				contentContainerStyle={{ alignSelf: "center", width: "90%" }}
				data={currentTab ? data?.activeWebhooks : data?.ymlContent}
				renderItem={currentTab ? renderHooks : renderYml}
				ListEmptyComponent={<Text style={style.emptyText2}>No Records Found</Text>}
			/>
		</View>
	);
};



const style = StyleSheet.create({
	emptyText: {
		fontWeight: "bold",
		marginTop: 20,
		fontSize: 20,
		color: colors.text,
		textAlign: "center"
	},
	emptyText2: {
		fontWeight: "bold",
		marginTop: 40,
		fontSize: 15,
		color: colors.text,
		textAlign: "center"
	},
	illustration: {
		height: 250,
		width: 250
	},
	main: {
		width: "50%",
		height: "80%",
		backgroundColor: colors.foreground,
		borderColor: colors.border,
		borderWidth: 1,
		borderRadius: 10
	},
	header: {
		height: 100,
		borderBottomWidth: 1,
		borderColor: colors.border,
		padding: 10
	},
	name: {
		fontSize: 18,
		color: colors.text,
		fontWeight: "500",
	},
	row: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 5
	},
	desc: {
		fontSize: 15,
		marginTop: 3,
		color: colors.grey,
		width: "50%"
	},
	bold: {
		fontWeight: "500",
		color: colors.text,
	},
	boldGreen:{
		fontWeight: "500",
		color: "#49D942"
	},
	tabs: {
		flexDirection: "row",
		borderBottomWidth: 1,
		borderColor: colors.border
	},
	tab: {
		width: "50%",
		justifyContent: "center",
		alignItems: "center",
		height: 40
	},
	inc: {
		height: 3,
		position: "absolute",
		width: "100%",
		backgroundColor: "#0091FF",
		bottom: 0
	},
	tabText: {
		fontSize: 17,
		color: colors.text,
		fontWeight: '500'
	},
	card: {
		marginTop: 20,
		width: "100%",
		height: 70,		
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.border,
		backgroundColor: colors.card,
		justifyContent: "center"
	},
	cardTitle: {
		fontSize: 15,
		color: colors.text,
		fontWeight: "500",
	},
	cardDesc: {
		fontSize: 13,
		marginTop: 3,
		color: colors.grey,
	}	
});

export default RepoDetails;