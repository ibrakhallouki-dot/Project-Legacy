export enum BehaviorType {
    Idle = "idle",
    Walk = "walk",
    Run = "run",
    Follow = "follow",
    Ignore = "ignore",
    Teach = "teach"
}

export interface Behavior {

    type: BehaviorType;

    confidence: number;

    observations: number;

    mastered: boolean;

    teacherId: number;

}

export class BehaviorMemory {

    private behaviors = new Map<BehaviorType, Behavior>();

    observe(type: BehaviorType, teacherId: number) {

        let behavior = this.behaviors.get(type);

        if (!behavior) {

            behavior = {

                type,

                confidence: 0,

                observations: 0,

                mastered: false,

                teacherId

            };

            this.behaviors.set(type, behavior);

        }

        behavior.observations++;

        behavior.confidence = Math.min(
            1,
            behavior.observations / 10
        );

        if (behavior.confidence >= 1) {

            behavior.mastered = true;

        }

    }

    importBehavior(source: Behavior) {

        if (this.behaviors.has(source.type)) {

            return;

        }

        this.behaviors.set(source.type, {

            type: source.type,

            confidence: source.confidence,

            observations: source.observations,

            mastered: source.mastered,

            teacherId: source.teacherId

        });

    }

    knows(type: BehaviorType): boolean {

        return this.behaviors.has(type);

    }

    mastered(type: BehaviorType): boolean {

        return this.behaviors.get(type)?.mastered ?? false;

    }

    get(type: BehaviorType): Behavior | undefined {

        return this.behaviors.get(type);

    }

    all(): Behavior[] {

        return [...this.behaviors.values()];

    }

}
