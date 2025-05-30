import { FlatList } from "react-native";
import { AppItem } from "@/components/AppItem";
import { useNavigation } from "expo-router";
import { LoadingApps } from "@/components/LoadingApps";
import { useSettingsStore } from "@/helpers/settings";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NoResults } from "@/components/NoResults";
import { useReactRaptorAppList } from "@/hooks/useReactRaptorAppList";
import { useEffect } from "react";

export default function Index() {
  const navigation = useNavigation();

  const { data, isPending, error } = useReactRaptorAppList();

  useEffect(() => {
    navigation.setOptions({
      title: "React Native Apps",
      // There seems to be a bug in react-native-screens that causes the button to show incorrectly
      // headerRight: () => <FilterButton />,
    });
  }, []);

  const insets = useSafeAreaInsets();

  const { showNewArchitectureTag } = useSettingsStore();

  if (isPending) {
    return <LoadingApps />;
  }

  if (!isPending && (error || !data || data.length === 0)) {
    return <NoResults />;
  }

  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: insets.bottom,
      }}
      data={data}
      renderItem={({ item }) => (
        <AppItem item={item} showNewArchitectureTag={showNewArchitectureTag} />
      )}
      keyExtractor={(item) => item.packageName}
      extraData={showNewArchitectureTag}
    />
  );
}
