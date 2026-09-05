/**
 * 下载数据 Schema 类型（对应 data/download.json）
 */

/** 单个版本条目 */
export interface DownloadVersion {
  /** 唯一标识，如 win10.1 */
  id: string
  /** 展示名称 / 类型，如 EGGY UI 1.0 */
  type: string
  /** 版本号，如 v1.0.0 */
  version: string
  /** 文件大小描述 */
  fileSize?: string
  /** 更新日期 YYYY-MM-DD */
  updateDate?: string
  /** 版本简介 */
  description?: string
  /** 配图地址（可为远程 URL） */
  image?: string
  /** 直链下载地址；为空表示暂无链接 */
  downloadUrl?: string
}

/** 软件整体元信息 */
export interface DownloadMeta {
  title: string
  /** 当前版本号 */
  version: string
  description: string
  image?: string
  fileSize?: string
  updateDate?: string
  versions: DownloadVersion[]
}
