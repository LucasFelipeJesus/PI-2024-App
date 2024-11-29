import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "blue",
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Início",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="available"
                options={{
                    title: "Pedidos Disponíveis",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="shopping-bag" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="myorders"
                options={{
                    title: "Meus Pedidos",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="shopping-cart" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Minha Conta",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />
        </Tabs>
    )
}
