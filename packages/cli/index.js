const { getContext, createContext } = require("./context");

const initializeProject = async () => {
    return await createContext();
};

module.exports = { initializeProject, getCli: getContext };
