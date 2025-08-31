import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import CategoryTile from "./cards/CategoryTile";

type AnyCat = {
  id: string | number;
  title?: string;
  name?: string;
  image?: { url: string };
};

type Props = {
  data: AnyCat[];
  onPressItem?: (item: AnyCat) => void;
};

export default function CategoriesGrid({ data, onPressItem }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(it) => String(it.id)}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        const title = item.title ?? item.name ?? "Category";
        const image = item.image;
        return (
          <CategoryTile
            title={title}
            image={image}
            onPress={() => onPressItem?.(item)}
            style={{ width: "48%" }}
          />
        );
      }}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListFooterComponent={<View style={{ height: 4 }} />}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 24},
  row: { justifyContent: "space-between" },
});
