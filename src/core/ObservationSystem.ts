import { BehaviorMemory, BehaviorType } from "./Behavior";

export class ObservationSystem {

    private watchTime = 0;

    private readonly requiredTime = 3000;

    update(

        delta: number,

        canSeePlayer: boolean,

        currentBehavior: BehaviorType,

        teacherId: number,

        memory: BehaviorMemory

    ) {

        if (!canSeePlayer) {

            this.watchTime = 0;

            return;

        }

        this.watchTime += delta;

        if (this.watchTime >= this.requiredTime) {

            memory.observe(

                currentBehavior,

                teacherId

            );

            this.watchTime = 0;

        }

    }

}
