import { CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export const popWithParams = (
  navigation: StackNavigationProp<any>,
  steps: number,
  params: Record<string, any>
) => {
  const state = navigation.getState();
  const routes = state.routes;

  const targetRouteKey = routes[routes.length - (steps + 1)]?.key;

  if (targetRouteKey) {
    navigation.dispatch({
      ...CommonActions.setParams(params),
      source: targetRouteKey,
    });
  }

  navigation.pop(steps);
};
