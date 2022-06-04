const vscode = require("vscode");
const script1 = require("./src/gredu-add-page");
const script2 = require("./src/gredu-add-repo-only");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  // c1
  let regGreduHello = vscode.commands.registerCommand("gredu-for-flutter.hello", function () {
    vscode.window.showInformationMessage("Hello geng from Adit!");
  }
  );

  // c2
  let regGreduAddNewModule = vscode.commands.registerCommand("gredu-for-flutter.add", script1.addNewModule);
  
  // c3
  let regGreduAddRepoOnly = vscode.commands.registerCommand("gredu-for-flutter.repoOnly", script2.addRepoOnly);

  context.subscriptions.push(regGreduHello);
  context.subscriptions.push(regGreduAddNewModule);
  context.subscriptions.push(regGreduAddRepoOnly);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate,
};
