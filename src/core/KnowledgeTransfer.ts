import { BehaviorMemory } from "./Behavior";

export class KnowledgeTransfer {

    transfer(
        source: BehaviorMemory,
        target: BehaviorMemory
    ): boolean {

        let transferred = false;

        for (const behavior of source.all()) {

            if (
                behavior.mastered &&
                !target.knows(behavior.type)
            ) {

                target.importBehavior(behavior);

                transferred = true;

            }

        }

        return transferred;

    }

}
