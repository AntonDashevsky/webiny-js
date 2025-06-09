import { type Field, type FieldDTO, type Operator, type OperatorDTO } from "./Field.js";

export class FieldMapper {
    static toDTO(configuration: Field[]): FieldDTO[] {
        return configuration.map(field => {
            return {
                label: field.label,
                value: field.value,
                operators: OperatorMapper.toDTO(field.operators),
                raw: field.raw
            };
        });
    }
}

export class OperatorMapper {
    static toDTO(operators: Operator[]): OperatorDTO[] {
        return operators.map(operator => ({
            value: operator.value || "",
            label: operator.label || ""
        }));
    }
}
