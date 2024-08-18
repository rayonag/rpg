import Monster from "@/components/monster/Monster";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import imageSrc from "@/constants/game/images";
import React, { FC, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Battle = () => {
    const [enemy, setEnemy] = useState();
    const [player, setPlayer] = useState();
    const [battle, setBattle] = useState();
    const [battleLog, setBattleLog] = useState();
    const [battleState, setBattleState] = useState();
    const [battleStateLog, setBattleStateLog] = useState();

    const playerCharacter = {
        name: "Ray",
        image: "Orc",
    } as const;
    const slime = {
        name: "Slime",
        image: "Slime",
    } as const;

    const path = require("@/assets/images/enemies/mon (1).png");
    return (
        <>
            <ThemedView style={styles.titleContainer}>
                <Text>{playerCharacter.name}</Text>
            </ThemedView>
            <View>
                <Image source={imageSrc[playerCharacter.image]} />
            </View>
            <View>
                <Image source={imageSrc[slime.image]} />
            </View>
            <View>
                <Image source={imageSrc["Goblin"]} />
            </View>
            <Monster id={1} />
        </>
    );
};

export default Battle;

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
