import * as vscode from 'vscode';

// Color data store
interface ColorItem {
    name: string;
    code: string;
    category: string;
}

// Main Color Panel Provider
class ColorPanelProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'colorPalette.view';
    private _view?: vscode.WebviewView;
    private colors: ColorItem[] = [];

    constructor(
        private readonly _extensionUri: vscode.Uri,
        private readonly _statusBarDisplay: StatusBarColorDisplay,
    ) {
        this.initializeColors();
    }

    private initializeColors() {
        this.colors = [
            // Basic Colors
            { name: 'Black', code: '#000000', category: 'Basic' },
            { name: 'Jet Black', code: '#202020', category: 'Basic' },
            { name: 'Charcoal', code: '#36454F', category: 'Basic' },
            { name: 'Slate Gray', code: '#708090', category: 'Basic' },
            { name: 'Dim Gray', code: '#696969', category: 'Basic' },
            { name: 'Silver', code: '#C0C0C0', category: 'Basic' },
            { name: 'Platinum', code: '#E5E4E2', category: 'Basic' },
            { name: 'White', code: '#FFFFFF', category: 'Basic' },
            
            // Red Colors
            { name: 'Red', code: '#FF0000', category: 'Red' },
            { name: 'Crimson', code: '#DC143C', category: 'Red' },
            { name: 'Fire Brick', code: '#B22222', category: 'Red' },
            { name: 'Indian Red', code: '#CD5C5C', category: 'Red' },
            { name: 'Light Coral', code: '#F08080', category: 'Red' },
            { name: 'Salmon', code: '#FA8072', category: 'Red' },
            { name: 'Dark Red', code: '#8B0000', category: 'Red' },
            { name: 'Tomato', code: '#FF6347', category: 'Red' },
            { name: 'Maroon', code: '#800000', category: 'Red' },
            { name: 'Coral', code: '#FF7F50', category: 'Red' },
            
            // Orange Colors
            { name: 'Orange', code: '#FFA500', category: 'Orange' },
            { name: 'Dark Orange', code: '#FF8C00', category: 'Orange' },
            { name: 'Pumpkin', code: '#FF7518', category: 'Orange' },
            { name: 'Peach', code: '#FFE5B4', category: 'Orange' },
            { name: 'Amber', code: '#FFBF00', category: 'Orange' },
            { name: 'Apricot', code: '#FBCEB1', category: 'Orange' },
            { name: 'Carrot', code: '#ED9121', category: 'Orange' },
            
            // Yellow Colors
            { name: 'Yellow', code: '#FFFF00', category: 'Yellow' },
            { name: 'Gold', code: '#FFD700', category: 'Yellow' },
            { name: 'Mustard', code: '#FFDB58', category: 'Yellow' },
            { name: 'Khaki', code: '#F0E68C', category: 'Yellow' },
            { name: 'Lemon', code: '#FFF44F', category: 'Yellow' },
            { name: 'Light Yellow', code: '#FFFFE0', category: 'Yellow' },
            { name: 'Moccasin', code: '#FFE4B5', category: 'Yellow' },
            
            // Green Colors
            { name: 'Lime', code: '#00FF00', category: 'Green' },
            { name: 'Forest Green', code: '#228B22', category: 'Green' },
            { name: 'Sea Green', code: '#2E8B57', category: 'Green' },
            { name: 'Olive', code: '#808000', category: 'Green' },
            { name: 'Mint Green', code: '#98FF98', category: 'Green' },
            { name: 'Light Green', code: '#90EE90', category: 'Green' },
            { name: 'Dark Green', code: '#006400', category: 'Green' },
            { name: 'Chartreuse', code: '#7FFF00', category: 'Green' },
            { name: 'Pistachio', code: '#93C572', category: 'Green' },
            { name: 'Lime Green', code: '#32CD32', category: 'Green' },
            { name: 'Jade', code: '#00A86B', category: 'Green' },
            
            // Blue Colors
            { name: 'Blue', code: '#0000FF', category: 'Blue' },
            { name: 'Dodger Blue', code: '#1E90FF', category: 'Blue' },
            { name: 'Sky Blue', code: '#87CEEB', category: 'Blue' },
            { name: 'Steel Blue', code: '#4682B4', category: 'Blue' },
            { name: 'Navy', code: '#000080', category: 'Blue' },
            { name: 'Royal Blue', code: '#4169E1', category: 'Blue' },
            { name: 'Cornflower Blue', code: '#6495ED', category: 'Blue' },
            { name: 'Midnight Blue', code: '#191970', category: 'Blue' },
            { name: 'Teal', code: '#008080', category: 'Blue' },
            { name: 'Cobalt', code: '#0047AB', category: 'Blue' },
            { name: 'Azure', code: '#007FFF', category: 'Blue' },
            
            // Cyan Colors
            { name: 'Cyan', code: '#00FFFF', category: 'Cyan' },
            { name: 'Aqua', code: '#00FFFF', category: 'Cyan' },
            { name: 'Aquamarine', code: '#7FFFD4', category: 'Cyan' },
            { name: 'Turquoise', code: '#40E0D0', category: 'Cyan' },
            { name: 'Medium Turquoise', code: '#48D1CC', category: 'Cyan' },
            { name: 'Light Cyan', code: '#E0FFFF', category: 'Cyan' },
            { name: 'Pale Turquoise', code: '#AFEEEE', category: 'Cyan' },
            { name: 'Teal Blue', code: '#367588', category: 'Cyan' },
            
            // Purple/Magenta Colors
            { name: 'Magenta', code: '#FF00FF', category: 'Purple' },
            { name: 'Purple', code: '#800080', category: 'Purple' },
            { name: 'Indigo', code: '#4B0082', category: 'Purple' },
            { name: 'Violet', code: '#EE82EE', category: 'Purple' },
            { name: 'Orchid', code: '#DA70D6', category: 'Purple' },
            { name: 'Plum', code: '#DDA0DD', category: 'Purple' },
            { name: 'Lavender', code: '#E6E6FA', category: 'Purple' },
            { name: 'Fuchsia', code: '#FF00FF', category: 'Purple' },
            { name: 'Periwinkle', code: '#CCCCFF', category: 'Purple' },
            { name: 'Eggplant', code: '#311432', category: 'Purple' },
            
            // Pink Colors
            { name: 'Pink', code: '#FFC0CB', category: 'Pink' },
            { name: 'Hot Pink', code: '#FF69B4', category: 'Pink' },
            { name: 'Deep Pink', code: '#FF1493', category: 'Pink' },
            { name: 'Light Pink', code: '#FFB6C1', category: 'Pink' },
            { name: 'Pale Violet Red', code: '#DB7093', category: 'Pink' },
            { name: 'Rose', code: '#FF007F', category: 'Pink' },
            { name: 'Carnation Pink', code: '#FFA6C9', category: 'Pink' },
            { name: 'Blush', code: '#DE5D83', category: 'Pink' },
            
            // Brown Colors
            { name: 'Brown', code: '#A52A2A', category: 'Brown' },
            { name: 'Saddle Brown', code: '#8B4513', category: 'Brown' },
            { name: 'Sandy Brown', code: '#F4A460', category: 'Brown' },
            { name: 'Peru', code: '#CD853F', category: 'Brown' },
            { name: 'Chocolate', code: '#D2691E', category: 'Brown' },
            { name: 'Burlywood', code: '#DEB887', category: 'Brown' },
            { name: 'Tan', code: '#D2B48C', category: 'Brown' },
            { name: 'Khaki', code: '#F0E68C', category: 'Brown' },
            { name: 'Wheat', code: '#F5DEB3', category: 'Brown' },
            
            // Gray/Neutral Colors
            { name: 'Light Slate Gray', code: '#778899', category: 'Gray' },
            { name: 'Gainsboro', code: '#DCDCDC', category: 'Gray' },
            { name: 'Platinum', code: '#E5E4E2', category: 'Gray' },
            { name: 'Ash Gray', code: '#B2BEB5', category: 'Gray' },
            { name: 'Cloud', code: '#CFCFC4', category: 'Gray' },
            
            // Pastel Colors
            { name: 'Mint Cream', code: '#F5FFFA', category: 'Pastel' },
            { name: 'Lavender Blush', code: '#FFF0F5', category: 'Pastel' },
            { name: 'Misty Rose', code: '#FFE4E1', category: 'Pastel' },
            { name: 'Peach Puff', code: '#FFDAB9', category: 'Pastel' },
            { name: 'Pale Turquoise', code: '#AFEEEE', category: 'Pastel' },
            { name: 'Light Steel Blue', code: '#B0C4DE', category: 'Pastel' },
            
            // Earth Tones
            { name: 'Olive Drab', code: '#6B8E23', category: 'Earth' },
            { name: 'Moss Green', code: '#8A9A5B', category: 'Earth' },
            { name: 'Slate Brown', code: '#6D5F47', category: 'Earth' },
            { name: 'Cedar', code: '#C4766E', category: 'Earth' },
            { name: 'Sand', code: '#C2B280', category: 'Earth' },
            { name: 'Clay', code: '#B66A50', category: 'Earth' },
            
            // Neon/Accent Colors
            { name: 'Neon Green', code: '#39FF14', category: 'Neon' },
            { name: 'Electric Blue', code: '#7DF9FF', category: 'Neon' },
            { name: 'Hot Magenta', code: '#FF1DCE', category: 'Neon' },
            { name: 'Lime Punch', code: '#DFFF00', category: 'Neon' },
            { name: 'Laser Lemon', code: '#FFFF66', category: 'Neon' },
            
            // Special Shades
            { name: 'Mint', code: '#98FB98', category: 'Other' },
            { name: 'Lavender', code: '#E6E6FA', category: 'Other' },
            { name: 'Beige', code: '#F5F5DC', category: 'Other' },
            { name: 'Ivory', code: '#FFFFF0', category: 'Other' },
            { name: 'Cream', code: '#FFFDD0', category: 'Other' },
            { name: 'Saffron', code: '#F4C430', category: 'Other' },
        ];
    }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken,
    ) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        
        // Handle messages from webview
        webviewView.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case 'copyColor':
                    await this.copyToClipboard(message.color);
                    this._statusBarDisplay.updateLastCopied(message.color);
                    vscode.window.showInformationMessage(`✅ Color ${message.color} copied to clipboard!`);
                    break;
                case 'colorClicked':
                    await this.copyToClipboard(message.color);
                    this._statusBarDisplay.updateLastCopied(message.color);
                    vscode.window.showInformationMessage(`🎨 Color ${message.color} copied!`);
                    break;
            }
        });
    }

    private async copyToClipboard(color: string) {
        await vscode.env.clipboard.writeText(color);
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        // Group colors by category
        const groupedColors = this.colors.reduce((acc, color) => {
            if (!acc[color.category]) {
                acc[color.category] = [];
            }
            acc[color.category].push(color);
            return acc;
        }, {} as Record<string, ColorItem[]>);

        let colorsHtml = '';
        for (const [category, colors] of Object.entries(groupedColors)) {
            colorsHtml += `
                <div class="color-category">
                    <div class="category-title">${category}</div>
                    <div class="color-grid">
                        ${colors.map(color => `
                            <div class="color-item" onclick="copyColor('${color.code}')" title="${color.name} - ${color.code}">
                                <div class="color-swatch" style="background-color: ${color.code};"></div>
                                <div class="color-info">
                                    <span class="color-name">${color.name}</span>
                                    <span class="color-code">${color.code}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        return `<!DOCTYPE html>
        <html>
        <head>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
                body {
                    padding: 12px;
                    background-color: var(--vscode-editor-background);
                    color: var(--vscode-editor-foreground);
                    font-family: var(--vscode-font-family);
                    font-size: 13px;
                }
                
                .color-palette-container {
                    width: 100%;
                    height: 100%;
                    overflow-y: auto;
                }
                
                .color-category {
                    margin-bottom: 20px;
                }
                
                .category-title {
                    font-weight: bold;
                    font-size: 14px;
                    margin-bottom: 10px;
                    padding-bottom: 5px;
                    border-bottom: 2px solid var(--vscode-panel-border);
                    color: var(--vscode-settings-headerForeground);
                }
                
                .color-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    gap: 8px;
                }
                
                .color-item {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 6px 8px;
                    cursor: pointer;
                    border-radius: 6px;
                    transition: all 0.2s;
                    background-color: var(--vscode-list-inactiveSelectionBackground);
                    border: 1px solid var(--vscode-panel-border);
                }
                
                .color-item:hover {
                    background-color: var(--vscode-list-hoverBackground);
                    transform: translateX(2px);
                    border-color: var(--vscode-focusBorder);
                }
                
                .color-swatch {
                    width: 32px;
                    height: 32px;
                    border-radius: 4px;
                    border: 1px solid var(--vscode-panel-border);
                    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                    transition: transform 0.1s;
                }
                
                .color-item:hover .color-swatch {
                    transform: scale(1.05);
                }
                
                .color-info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }
                
                .color-name {
                    font-size: 11px;
                    font-weight: 500;
                    color: var(--vscode-foreground);
                }
                
                .color-code {
                    font-size: 10px;
                    font-family: 'Courier New', monospace;
                    color: var(--vscode-descriptionForeground);
                }
                
                /* Scrollbar styling */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: var(--vscode-scrollbarSlider-background);
                }
                
                ::-webkit-scrollbar-thumb {
                    background: var(--vscode-scrollbarSlider-hoverBackground);
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: var(--vscode-scrollbarSlider-activeBackground);
                }
                
                /* Tooltip styling */
                [title] {
                    position: relative;
                }
            </style>
        </head>
        <body>
            <div class="color-palette-container">
                ${colorsHtml}
            </div>
            
            <script>
                const vscode = acquireVsCodeApi();
                
                function copyColor(colorCode) {
                    navigator.clipboard.writeText(colorCode).then(() => {
                        // Visual feedback
                        const items = document.querySelectorAll('.color-item');
                        items.forEach(item => {
                            item.style.transform = 'scale(0.98)';
                            setTimeout(() => {
                                item.style.transform = '';
                            }, 100);
                        });
                        
                        // Show temporary notification in webview
                        const notification = document.createElement('div');
                        notification.textContent = \`✅ \${colorCode} copied!\`;
                        notification.style.position = 'fixed';
                        notification.style.bottom = '10px';
                        notification.style.left = '50%';
                        notification.style.transform = 'translateX(-50%)';
                        notification.style.backgroundColor = 'var(--vscode-button-background)';
                        notification.style.color = 'var(--vscode-button-foreground)';
                        notification.style.padding = '8px 16px';
                        notification.style.borderRadius = '4px';
                        notification.style.zIndex = '1000';
                        notification.style.fontSize = '12px';
                        document.body.appendChild(notification);
                        
                        setTimeout(() => {
                            notification.remove();
                        }, 1500);
                        
                        // Send to extension
                        vscode.postMessage({ command: 'copyColor', color: colorCode });
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                        vscode.postMessage({ command: 'copyColor', color: colorCode });
                    });
                }
                
                // Add keyboard support for Enter key
                document.querySelectorAll('.color-item').forEach(item => {
                    item.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') {
                            const colorCode = item.querySelector('.color-code')?.innerText;
                            if (colorCode) copyColor(colorCode);
                        }
                    });
                });
            </script>
        </body>
        </html>`;
    }
}

// Status bar color display
class StatusBarColorDisplay {
    private statusBarItem: vscode.StatusBarItem;
    private lastCopiedColor: string = '';

    constructor() {
        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            100
        );
        this.statusBarItem.text = "$(copy) Click color to copy";
        this.statusBarItem.tooltip = "Color Palette Panel - Click any color to copy";
        this.statusBarItem.show();
    }

    public updateLastCopied(color: string) {
        this.lastCopiedColor = color;
        this.statusBarItem.text = `$(check) Copied: ${color}`;
        this.statusBarItem.backgroundColor = undefined;
        
        // Reset after 3 seconds
        setTimeout(() => {
            if (this.lastCopiedColor === color) {
                this.statusBarItem.text = "$(copy) Click color to copy";
            }
        }, 3000);
    }

    public dispose() {
        this.statusBarItem.dispose();
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Color Palette Extension is now active!');
    
    // Create status bar display
    const statusBarDisplay = new StatusBarColorDisplay();
    context.subscriptions.push(statusBarDisplay);

    // Register the color panel view
    const provider = new ColorPanelProvider(context.extensionUri, statusBarDisplay);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(ColorPanelProvider.viewType, provider)
    );
    
    // Register command to show/hide panel
    const togglePanelCommand = vscode.commands.registerCommand('color-palette.togglePanel', async () => {
        await vscode.commands.executeCommand('workbench.view.extension.color-palette-container');
        await vscode.commands.executeCommand('workbench.action.openView', 'colorPalette.view');
    });
    
    context.subscriptions.push(togglePanelCommand);
    
    // Show activation message
    vscode.window.showInformationMessage('🎨 Color Palette Extension Activated! Colors panel will appear in the side panel.');
}

export function deactivate() {}