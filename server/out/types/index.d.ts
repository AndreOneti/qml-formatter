interface IReferences {
    [key: string]: IComponent;
}
interface IComponent {
    properties: Record<string, string | Record<string, string>>;
    methods: Record<string, string | string[]>;
    signals: Record<string, string>;
    inherit?: string;
    doc?: {
        kind: "markdown";
        value: string;
    };
}
declare const References: IReferences;
export default References;
