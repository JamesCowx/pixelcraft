export interface ExportOptions { format: 'png' | 'jpg' | 'webp' | 'svg'; quality: number; width?: number; height?: number; background: string; }
export function getMimeType(format: string): string { const mimes: Record<string, string> = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp', svg: 'image/svg+xml' }; return mimes[format] || 'image/png'; }
export function getFileExtension(format: string): string { const exts: Record<string, string> = { png: 'png', jpg: 'jpg', webp: 'webp', svg: 'svg' }; return exts[format] || 'png'; }
