export enum WorldSide {
    Neutral,
    Legacy,
    Chaos
}

export interface Memory {

    id: number;

    learned: boolean;

    knowledge: number;

    loyalty: number;

    personality: number;

    world: WorldSide;

}

export class MemorySystem {

    private memories = new Map<number, Memory>();

    create(id: number) {

        this.memories.set(id, {

            id,

            learned: false,

            knowledge: 0,

            loyalty: Math.random(),

            personality: Math.random(),

            world: WorldSide.Neutral

        });

    }

    get(id: number): Memory {

        return this.memories.get(id)!;

    }

    learn(id: number) {

        const memory = this.get(id);

        if (memory.learned) return;

        memory.learned = true;

        memory.knowledge++;

    }

    chooseWorld(id: number) {

        const memory = this.get(id);

        if (memory.world !== WorldSide.Neutral)
            return;

        if (memory.loyalty >= 0.5)
            memory.world = WorldSide.Legacy;
        else
            memory.world = WorldSide.Chaos;

    }

}
