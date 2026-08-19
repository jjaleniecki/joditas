import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// screens
import Home from "../../screens/Home/Home";
import Events from "../../screens/ParticularEvent/ParticularEvent";
import Contact from "../../screens/Contact/Contact";
import Login from "../../screens/Login/Login";

const Tab = createBottomTabNavigator();

const Navbar = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false, headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#BCD975",
            tabBarInactiveTintColor: "#B2BEC3",
            tabBarStyle: {
                position: "absolute",
                bottom: 40,
                marginHorizontal: 40,
                height: 65,
                borderRadius: 33,
                backgroundColor: "#fff",
                elevation: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.15,
                shadowRadius: 10,
            },
            tabBarItemStyle: {
                paddingVertical: 10,
            },
        }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                    title: "Home"
                }}
            />
            <Tab.Screen
                name="Events"
                component={Events}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "calendar" : "calendar-outline"}
                            size={size}
                            color={color}
                        />
                    ), title: "Events"
                }}
            />
            <Tab.Screen
                name="Contact"
                component={Contact}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "call" : "call-outline"}
                            size={size}
                            color={color}
                        />
                    ), title: "Contact"
                }}
            />
            <Tab.Screen
                name="Login"
                component={Login}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name={focused ? "log-in" : "log-in-outline"}
                            size={size}
                            color={color}
                        />
                    ), title: "Login"
                }}
            />
        </Tab.Navigator>
    );
};

export default Navbar;
