import imageSrc from "@/constants/game/images";
import { monsters } from "@/constants/game/monsters";
import React, { FC, useEffect, useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";

type Monster = {
    id: keyof typeof monsters;
    // name: keyof typeof imageSrc;
    // hp: number;
    // attack: number;
    // defense: number;
    // speed: number;
};
const Monster: FC<Monster> = (props) => {
    const monsterStats = monsters[props.id];
    const speed = monsterStats.speed;

    // game balance
    const defaultAttackDuration = 2000;
    const attackDuration = defaultAttackDuration - speed * 100;

    // game state
    const [gameState, setGameState] = useState<"play" | "pause">("play");

    // attack gauge
    const [attackGauge, setAttackGauge] = useState(0);
    const [isAttacking, setIsAttacking] = useState(false);

    // attack
    const attack = () => {
        if (isAttacking) return;

        setIsAttacking(true);
        setAttackGauge(0);

        const interval = setInterval(() => {
            setAttackGauge((prev) => prev + 1);
        }, attackDuration / 100);

        setTimeout(() => {
            clearInterval(interval);
            setIsAttacking(false);
            setAttackGauge(0);
        }, attackDuration);
    };

    useEffect(() => {
        if (gameState === "play") {
            const attackInterval = setInterval(() => {
                attack();
            }, attackDuration);

            return () => clearInterval(attackInterval);
        }
    }, [gameState]);

    return (
        <View>
            <View style={styles.container}>
                <Button title={gameState == "pause" ? "Play" : "Pause"} onPress={() => setGameState(gameState == "pause" ? "play" : "pause")} />
            </View>
            <View style={styles.container}>
                <View style={styles.verticalContainer}>
                    <View style={styles.hpBarContainer}>
                        <View style={[styles.hpBar, { width: `${monsterStats.hp}%`, backgroundColor: "green" }]} />
                    </View>
                    <Image source={imageSrc[monsterStats.name]} />
                </View>
                <View style={styles.gaugeContainer}>
                    <View style={[styles.gauge, { height: `${attackGauge}%` }]} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    verticalContainer: {
        flexDirection: "column",
        alignItems: "center",
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 100,
        height: 100,
    },
    gaugeContainer: {
        width: 10,
        height: 100,
        backgroundColor: "#ccc",
        marginLeft: 10,
        justifyContent: "flex-end",
    },
    gauge: {
        width: "100%",
        backgroundColor: "red",
    },
    hpBarContainer: {
        width: 70,
        height: 5,
        backgroundColor: "#ccc",
        marginLeft: 10,
    },
    hpBar: {
        width: "100%",
        backgroundColor: "red",
    },
});
export default Monster;
