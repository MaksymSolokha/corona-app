const validateName = (value) => {
  if (String(value).length === 0) {
    return `Name is required`;
  }
  return true;
};

const COMPONENT_TYPES = ["atom", "molecule", "organism", "template","page"];

module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "Create atom, molecule, organism or template",
    prompts: [
      {
        type: "list",
        name: "type",
        message: "Choose component type",
        choices: COMPONENT_TYPES,
      },
      {
        type: "input",
        name: "name",
        message: "What should we name the component?",
        validate: validateName,
      },
    ],
    actions: [
      {
        type: "add",
        path: "./src/components/{{type}}s/{{pascalCase name}}/index.ts",
        templateFile: "plop-templates/component/index.hbs",
      },
      {
        type: "add",
        path: "./src/components/{{type}}s/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/component/component.hbs",
      },
      {
        type: "add",
        path: "./src/components/{{type}}s/{{pascalCase name}}/styles.ts",
        templateFile: "plop-templates/component/styles.hbs",
      },
      {
        type: "add",
        path: "./src/components/{{type}}s/{{pascalCase name}}/types.ts",
        templateFile: "plop-templates/component/types.hbs",
      },
      {
        type: "append",
        path: "src/components/{{type}}s/index.ts",
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `export { default as {{pascalCase name}} } from "./{{pascalCase name}}";`,
      },
    ],
  });
  plop.setGenerator("hook", {
    description: "Create custom hook",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What should we name the hook?",
        validate: validateName,
      },
    ],
    actions: [
      {
        type: "add",
        path: "./src/hooks/{{name}}/index.ts",
        templateFile: "plop-templates/hook/index.hbs",
      },
      {
        type: "add",
        path: "./src/hooks/{{name}}/{{name}}.tsx",
        templateFile: "plop-templates/hook/hook.hbs",
      },
      {
        type: "append",
        path: "src/hooks/index.ts",
        pattern: `/* PLOP_INJECT_IMPORT */`,
        template: `export { default as {{name}} } from "./{{name}}.tsx";`,
      },
    ],
  });
};
