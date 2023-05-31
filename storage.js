import * as SecureStore from "expo-secure-store";

const tokenKey = "authToken";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(tokenKey, authToken);
  } catch (error) {
    console.log("Error storing the auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(tokenKey);
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUser = async () => {
  const user = await getToken();
  return user ? JSON.parse(user) : null;
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(tokenKey);
  } catch (error) {
    console.log("Error removing the auth token", error);
  }
};

export default { getToken, getUser, removeToken, storeToken };
