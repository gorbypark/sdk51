import { SymbolView } from "expo-symbols";
import { PlatformColor, Pressable } from "react-native";
import {
  Section,
  List,
  Text,
  Spacer,
  HStack,
  Button,
  Image,
  Toggle,
} from "swiftui-react-native";

const SuperList = () => {
  return (
    <List>
      <Section header="SuperList" footer="Yolo v1">
        <Text>List Item</Text>
        <HStack>
          <Text>Toggle</Text>
          <Spacer />
          <Toggle isOn={true} />
        </HStack>
        <HStack padding={{ trailing: -10 }}>
          <Button
            title="ListItem"
            // @ts-expect-error
            tint={PlatformColor("label")}
            action={() => alert("helo")}
          />
          <Spacer />
          <Image systemName="chevron.forward" tint="teal" />
        </HStack>
      </Section>
    </List>
  );
};

export { SuperList };
