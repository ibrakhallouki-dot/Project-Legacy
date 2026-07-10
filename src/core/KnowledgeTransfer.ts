import { BehaviorMemory, BehaviorType } from "./Behavior";

export class KnowledgeTransfer {

    transfer(

        source: BehaviorMemory,

        target: BehaviorMemory

    ) {

        for (const behavior of source.all()) {

            if (

                behavior.mastered &&

                !target.knows(behavior.type)

            ) {

                target.observe(

                    behavior.type,

                    behavior.teacherId

                );

            }

        }

    }

}
