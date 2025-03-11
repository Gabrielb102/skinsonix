import {useDiagramStore} from "@frontend/stores/useDiagramStore.js";

const statusClasses = {
    default: ["stroke-white", "fill-white"],
    active: ["stroke-primary-500", "fill-primary-500"],
    done: ["stroke-blue-400", "fill-blue-400"],
};

export function useDiagram() {
    const diagramStore = useDiagramStore();

    const changeAreaStatus = (part, status) => {
        diagramStore[part] = status;
        const element = document.querySelector(`#${part}`);

        if (!element) {
            console.error(`Element not found for part ${part}, the name may be wrong either in the database, svg, or manipulation logic (composable).`);
            return;
        }

        const statusClass = statusClasses[status];
        element.classList.remove(...Object.values(statusClasses).flat());
        element.classList.add(...statusClass);
    }

    const resetDiagram = () => {
        for (const key in diagramStore) {
            if (diagramStore.hasOwnProperty(key)) {
                diagramStore[key] = "default";
            }
        }
    }

    return {
        resetDiagram,
        changeAreaStatus
    }
}