import React from "react";
import {Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {Linking} from "expo";
import {FontAwesome} from "@expo/vector-icons";

import colors, {theme} from "../styles/colors";
import SeeusConstants from "../SeeusConstants";
import {AuthActionType, useAuthDispatch} from "../contexts/AuthContext";

/**
 * This component is what is displayed in the main navigation drawer.
 * It renders the list of screens provided in AppNavigationRoot, and some extra components.
 */
export default function AppDrawerContent(props) {
    const authDispatch = useAuthDispatch();
    const doLogout = () => authDispatch({type: AuthActionType.Logout});
    return (
        <>
            <Header/>
            <DrawerContentScrollView style={styles.scrollView} {...props}>
                <DrawerItemList
                    itemStyle={styles.drawerItem}
                    labelStyle={styles.drawerItemLabel}
                    activeBackgroundColor={theme.primaryLighter}
                    {...props}
                />
                <DrawerItem
                    label="Logout"
                    onPress={doLogout}
                    style={styles.drawerItem}
                    labelStyle={styles.drawerItemLabel}
                />
            </DrawerContentScrollView>
            <Footer/>
        </>
    );
}

function Header(props) {
    return (
        <View style={styles.header}>
            <View style={styles.headerUserImage}/>
            <View style={styles.headerUserInfoContainer}>
                <Text style={styles.headerUserName}>Sally May</Text>
                <Text style={styles.headerUserEmail}>smay2@emich.edu</Text>
            </View>
        </View>
    )
}

function Footer() {
    return (
        <View style={styles.footer}>
            <Text style={styles.footerText}>Follow SEEUS on</Text>
            <View style={styles.footerIcons}>
                <TouchableOpacity onPress={() => Linking.openURL(SeeusConstants.SEEUS_FACEBOOK_URL)}>
                    <FontAwesome name="facebook" style={styles.footerIcon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(SeeusConstants.SEEUS_TWITTER_URL)}>
                    <FontAwesome name="twitter" style={styles.footerIcon}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        paddingTop: 0,
        margin: 0,
        padding: 0,
        backgroundColor: theme.primary
    },
    drawerItem: {
        borderRadius: 5,
        paddingLeft: 5
    },
    drawerItemLabel: {
        color: '#fff',
        fontSize: 23,
    },
    header: {
        backgroundColor: theme.secondary,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headerUserImage: {
        backgroundColor: '#222',
        width: 65,
        height: 65,
        borderRadius: 100
    },
    headerUserInfoContainer: {
        alignItems: 'center',
        marginLeft: 15,
    },
    headerUserName: {
        fontSize: 23,
        fontWeight: 'bold'
    },
    headerUserEmail: {
        fontSize: 14,
    },
    footer: {
        paddingVertical: 10,
        paddingLeft: 10,
        backgroundColor: theme.primaryLighter,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    footerText: {
        color: '#fff',
    },
    footerIcons: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    footerIcon: {
        marginHorizontal: 15,
        color: "#fff",
        fontSize: 35
    }
});