export const snakeCaseToCamelCase = (snakeCase: string) => snakeCase.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
        .toUpperCase()
        .replace('-', '')
        .replace('_', '')
);
export const camelCaseToSnakeCase = (camelCase: string) => camelCase.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()

export const toKebabCase = (str: string) => str.toLowerCase().replace(/[\s_]/g, "-").replace(/[^0-9-a-z]/g, "")