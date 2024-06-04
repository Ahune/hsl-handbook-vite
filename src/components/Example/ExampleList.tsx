import { Example } from "./Example";

import styles from "./Example.module.css";

export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES: ExampleModel[] = [
    {
        text: "Hur kontrolleras en personlyft?", value: "Hur kontrolleras en personlyft?"
    },
    { text: "Vad är telefonnumret till rehabupplysningen?", value: "Vad är telefonnumret till rehabupplysningen?" },
    { text: "Hur ansöker jag om tandvårdsstöd för personer i hemsjukvården?", value: "Hur ansöker jag om tandvårdsstöd för personer i hemsjukvården?" }
];

interface Props {
    onExampleClicked: (value: string) => void;
}

export const ExampleList = ({ onExampleClicked }: Props) => {
    return (
        <ul className={styles.examplesNavList}>
            {EXAMPLES.map((x, i) => (
                <li key={i}>
                    <Example text={x.text} value={x.value} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
