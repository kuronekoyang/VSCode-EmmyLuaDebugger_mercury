import * as vscode from 'vscode';
import { ProviderResult } from 'vscode';
import { EmmyNewDebugSession } from './new_debugger/EmmyNewDebugSession';

export class InlineDebugAdapterFactory implements vscode.DebugAdapterDescriptorFactory {

    createDebugAdapterDescriptor(_session: vscode.DebugSession): ProviderResult<vscode.DebugAdapterDescriptor> {
        switch (_session.type) {
            case 'emmylua_new': {
                return new vscode.DebugAdapterInlineImplementation(new EmmyNewDebugSession());
            }
        }
        
    }
}
