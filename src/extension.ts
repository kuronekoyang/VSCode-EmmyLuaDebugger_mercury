'use strict';

import * as vscode from 'vscode';
import * as path from "path";
import * as process from "process";
import { EmmyNewDebuggerProvider } from './debugger/new_debugger/EmmyNewDebuggerProvider';
export let ctx: vscode.ExtensionContext;

export function activate(context: vscode.ExtensionContext) {
    ctx = context;
    console.log("emmy lua actived!");

    context.subscriptions.push(vscode.commands.registerCommand("emmy.insertEmmyDebugCode", insertEmmyDebugCode));
    
    registerDebuggers();
    return {
    }
}

export function deactivate() {
    //ctx.dispose();
}

function registerDebuggers() {
    const context = ctx;//.extensionContext;
    const emmyProvider = new EmmyNewDebuggerProvider('emmylua_new', context);
    context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider("emmylua_new", emmyProvider));
    context.subscriptions.push(emmyProvider);
}

async function insertEmmyDebugCode() {
    const context = ctx;
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }
    const document = activeEditor.document;
    if (document.languageId !== 'lua') {
        return;
    }

    let dllPath = '';
    const isWindows = process.platform === 'win32';
    const isMac = process.platform === 'darwin';
    const isLinux = process.platform === 'linux';
    if (isWindows) {
        const arch = await vscode.window.showQuickPick(['x64', 'x86']);
        if (!arch) {
            return;
        }
        dllPath = path.join(context.extensionPath, `debugger/emmy/windows/${arch}/?.dll`);
    }
    else if (isMac) {
        const arch = await vscode.window.showQuickPick(['x64', 'arm64']);
        if (!arch) {
            return;
        }
        dllPath = path.join(context.extensionPath, `debugger/emmy/mac/${arch}/emmy_core.dylib`);
    }
    else if (isLinux) {
        dllPath = path.join(context.extensionPath, `debugger/emmy/linux/emmy_core.so`);
    }

    const host = 'localhost';
    const port = 9966;
    const ins = new vscode.SnippetString();
    ins.appendText(`package.cpath = package.cpath .. ";${dllPath.replace(/\\/g, '/')}"\n`);
    ins.appendText(`local dbg = require("emmy_core")\n`);
    ins.appendText(`dbg.tcpListen("${host}", ${port})`);
    activeEditor.insertSnippet(ins);
}
