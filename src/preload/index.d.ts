import { ElectronAPI } from '@electron-toolkit/preload'

export interface IElectronAPI {
  windowControls: {
    minimize: () => Promise<void>
    maximize: () => Promise<void>
    close: () => Promise<void>
    isMaximized: () => Promise<boolean>
  }
}

declare global {
  interface Window {
    electron: any
    api: IElectronAPI
  }
}
