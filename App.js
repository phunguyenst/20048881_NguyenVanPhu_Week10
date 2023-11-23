import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider} from "react-redux";
import screen from "./screens/ScreensBaiLam"
import store from "./screens/store";
const Stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="BaiLam">
          <Stack.Screen name="screen" component={screen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


