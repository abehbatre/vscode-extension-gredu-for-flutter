const vscode = require("vscode");
const script1 = require("./src/gredu-add-page");

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

  context.subscriptions.push(regGreduHello);
  context.subscriptions.push(regGreduAddNewModule);
}

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate,
};
