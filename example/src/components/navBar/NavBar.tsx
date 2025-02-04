import * as React from "react";
import { StyleSheet, View, TouchableOpacity, ViewStyle } from "react-native";

import { Colors, Shadows } from "../Colors";
import { Router } from "../Router";
import { Text } from "../Text";
import { Icon } from "../icon";
import { NavBarHeight } from "./constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: NavBarHeight,
    backgroundColor: Colors.navBar,
    paddingHorizontal: 32,
    paddingBottom: 16,
    //...Shadows.elevation1
  },
  lightContainer: {
    backgroundColor: "transparent",
  },
  backContainer: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },
  icon: {
    ...Shadows.textElevation1,
  },
});

export interface NavBarProps {
  style?: ViewStyle;
  title?: string;
  back: "default" | "none" | "close";
  light?: boolean;
  onBack?: () => void;
}

const HIT_SLOP = {
  left: 16,
  top: 16,
  right: 16,
  bottom: 16,
};

export class NavBar extends React.Component<NavBarProps> {
  static defaultProps = {
    back: "default",
  };

  static HEIGHT = NavBarHeight;

  renderBack() {
    let icon;
    const { back, light } = this.props;
    switch (back) {
      case "none":
        return;
      case "default":
        icon = "chevron-left";
        break;
      case "close":
        icon = "cross";
        break;
      default:
        return;
    }
    return (
      <TouchableOpacity
        style={styles.backContainer}
        onPress={this.onPressBack}
        hitSlop={HIT_SLOP}
      >
        <Icon
          style={light ? styles.icon : undefined}
          name={icon}
          size={28}
          color={light ? Colors.back : Colors.text}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { style, title, light } = this.props;
    return (
      <View
        style={[
          styles.container,
          light ? styles.lightContainer : undefined,
          style,
        ]}
      >
        <Text large light={light}>
          {title ?? ""}
        </Text>
        {this.renderBack()}
      </View>
    );
  }

  onPressBack = () => {
    if (this.props.onBack) {
      this.props.onBack();
    } else {
      Router.pop();
    }
  };
}
