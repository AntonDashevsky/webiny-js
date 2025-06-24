import { Project } from "./Project";

const project = Project.init();

const reza = await project.getProjectInfo();


console.log('RESULT', reza);