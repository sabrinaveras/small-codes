const fs = require("fs");
const path = require("path");

const indexContent = (
  componentName
) => `import { ${componentName} } from "./${componentName}"

export { ${componentName} }
`;

const componentContent = (
  componentName
) => `import styled from "styled-components"

export interface ${componentName}Props{}

export const ${componentName} = ({}: ${componentName}Props) => {
    return <${componentName}Wrapper>${componentName}</${componentName}Wrapper>
}

const ${componentName}Wrapper = styled.div;
`;

const storiesContent = (
  componentName
) => `import {Meta, Story} from "@storybook/react"
import {${componentName}, ${componentName}Props} from "./${componentName}";

export default{
    title: "Components/${componentName}",
    argsType:{
        backgroundColor: { control: "color" },
    },
} as Meta;

const Template: Story<${componentName}Props> = (args) => <${componentName} {...args} />

export const Default = Template.bind({});
const Default.args = {};
`;

const testContent = (
  componentName
) => `import { render } from "@testing-library/react"; 
import { ${componentName} } from "./${componentName}";

test("${componentName} Test", async () => {

    render(<${componentName}/>)
})
`;

function validateComponentName(name) {
  const firstLetter = name[0];

  if (!/[A-Z]/.test(firstLetter)) {
    console.log("Component name must start with a capital letter");
    process.exit(1);
  }

  if (/.*_.+/.test(name)) {
    console.log("Component name should be mixed case, not snake case");
    process.exit(1);
  }
}

async function createComponent() {
  const projectDir = process.cwd();
  const componentPath = path.join(projectDir, "src", "components");
  const componentName = process.argv[2];

  if (!componentName) {
    console.log("Component name is required");
    process.exit(1);
  }

  validateComponentName(componentName);

  try {
    fs.accessSync(componentPath, fs.constants.W_OK);
  } catch (error) {
    console.log(`Could not access ${componentPath} directory for writing`);
    console.log(error);
    process.exit(1);
  }

  const componentDir = path.join(componentPath, componentName);

  try {
    fs.accessSync(componentDir, fs.constants.W_OK);
    console.log("Component already exists");
    process.exit(1);
  } catch (error) {
    console.log("Component does not exists, creating directory");
  }

  fs.mkdirSync(componentDir, { recursive: true });

  fs.appendFileSync(
    path.join(componentDir, "index.ts"),
    indexContent(componentName)
  );

  fs.appendFileSync(
    path.join(componentDir, `${componentName}.tsx`),
    componentContent(componentName)
  );

  fs.appendFileSync(
    path.join(componentDir, `${componentName}.stories.tsx`),
    storiesContent(componentName)
  );

  fs.appendFileSync(
    path.join(componentDir, `${componentName}.test.ts`),
    testContent(componentName)
  );
}

createComponent();
