// @ts-nocheck
const vscode = require('vscode')
const replace = require('replace-in-file')
const fs = require('fs')
const _ = require('lodash')
const utils = require('./utils.js')

async function addNewModule() {
    var pubspecPath = await utils.getPubspecPath()

    if (typeof pubspecPath === 'string' && pubspecPath.length > 0) {

        /// path = .../
        let path = pubspecPath.replace("pubspec.yaml", "")
        var data = fs.readFileSync(pubspecPath, 'utf-8')
        var lines = data.split('\n')
        var projectName = lines[0].replace("name: ", "")


        const pageName = await vscode.window.showInputBox({
            placeHolder: "Nama Screen nya apa geng?",
            prompt: "format input: `NamaScreen` or `nama_screen`",
        });

        if (typeof pageName === 'string' && pageName.length > 0) {
            await moveFile(path, projectName, pageName)
            vscode.window.showInformationMessage('Oke, udah digenerate ya geng..')
        }
    }
}

/**
 * @param {string} path
 * @param {string} projectName
 * @param {string} pageName
 */
async function moveFile(path, projectName, pageName) {
    let extension
    vscode.extensions.all.forEach((e) => {
        if (e.id.includes("gredu-for-flutter")) {
            extension = e
        }
    })

    if (extension == null) {
        return
    }

    var fileName = pageName
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .replace(/page/g, '').trim()
        .replace(/\s\s+/g, ' ')
        .replace(/\s/g, '_')

    var className = fileName
        .replace(/_/g, ' ')
        .replace(/\w+/g,
            function (w) { return w[0].toUpperCase() + w.slice(1).toLowerCase(); })
        .replace(/\s/g, '')

    var routeName = fileName.toUpperCase()
    var routeNameCmt = fileName
        .replace(/_/g, ' ')
        .replace(/\w+/g,
            function (w) { return w[0].toUpperCase() + w.slice(1).toLowerCase(); })



    // COPY TEMPLATE FROM HERE
    await vscode.workspace.fs.copy(
        vscode.Uri.parse(`${extension.extensionPath}/gredu_template/template_view.dart`),
        vscode.Uri.parse(`${path}lib/app/modules/${fileName}/${fileName}_view.dart`),
        { overwrite: true }
    )
    await vscode.workspace.fs.copy(
        vscode.Uri.parse(`${extension.extensionPath}/gredu_template/template_controller.dart`),
        vscode.Uri.parse(`${path}lib/app/modules/${fileName}/${fileName}_controller.dart`),
        { overwrite: true }
    )
    await vscode.workspace.fs.copy(
        vscode.Uri.parse(`${extension.extensionPath}/gredu_template/template_binding.dart`),
        vscode.Uri.parse(`${path}lib/app/modules/${fileName}/${fileName}_binding.dart`),
        { overwrite: true }
    )
    await vscode.workspace.fs.copy(
        vscode.Uri.parse(`${extension.extensionPath}/gredu_template/template_repository.dart`),
        vscode.Uri.parse(`${path}lib/app/modules/${fileName}/${fileName}_repository.dart`),
        { overwrite: true }
    )

    var files = [
        `${path}lib/app/modules/${fileName}/*.dart`,
        // `${path}lib/app/data/provider/${fileName}_provider.dart`,
    ]

    replace.sync({
        files,
        from: /gredu_template/g,
        to: projectName,
        countMatches: true,
    });

    replace.sync({
        files,
        from: /Template/g,
        to: className,
        countMatches: true,
    });

    replace.sync({
        files,
        from: /template/g,
        to: fileName,
        countMatches: true,
    });


    // App Pages Modify
    let appPagesPath = `${path}lib/app/routes/app_pages.dart`
    var appPagesData = fs.readFileSync(appPagesPath, 'utf-8')
    var appPagesLines = appPagesData.split('\n')
    appPagesLines.splice(1, 0, `import 'package:${projectName}/app/modules/${fileName}/${fileName}_view.dart';`)
    appPagesLines.splice(1, 0, `import 'package:${projectName}/app/modules/${fileName}/${fileName}_binding.dart';`)

    var index = 0
    for (let i = 0; i < appPagesLines.length; i++) {
        const element = appPagesLines[i];
        if (element.includes(']')) {
            index = i
        }
    }
    appPagesLines.splice(index, 0,
        `    GetPage(
        name: Routes.${routeName},
        page: () => ${className}View(),
        binding: ${className}Binding(),
    ),`
    )
    fs.writeFileSync(appPagesPath, appPagesLines.join('\n'), 'utf-8')

    // App Routes Modify
    let appRoutesPath = `${path}lib/app/routes/app_routes.dart`
    var appRoutesData = fs.readFileSync(appRoutesPath, 'utf-8')
    var appRoutesLines = appRoutesData.split('\n')

    var index = 0
    for (let i = 0; i < appRoutesLines.length; i++) {
        const element = appRoutesLines[i];
        if (element.includes('}')) {
            index = i
        }
    }

    // console.log ("CamelCase".replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase()))
    appRoutesLines.splice(index, 0,
        `  static const ${routeName} = '/${_.kebabCase(routeName)}'; // ${routeNameCmt} page`
    )
    fs.writeFileSync(appRoutesPath, appRoutesLines.join('\n'), 'utf-8')


}


module.exports = {
    addNewModule
}