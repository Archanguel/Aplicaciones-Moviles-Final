import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from "@react-navigation/native";
import HomePage from "./src/pages/HomePage/HomePage";
import PokeCard from "./src/pages/PokeCard/PokeCard";
const screens = {
	HomePage: { screen: HomePage },
	PokeCard: { screen: PokeCard },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);