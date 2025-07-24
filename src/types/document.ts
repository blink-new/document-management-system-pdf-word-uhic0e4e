export interface Document {
  id: string
  title: string
  fileName: string
  fileSize: number
  fileType: string
  category: string
  description?: string
  tags: string[]
  uploadedAt: string
  updatedAt: string
  userId: string
  fileUrl: string
  thumbnailUrl?: string
  isShared: boolean
  sharedWith: string[]
  version: number
}

export interface Category {
  id: string
  name: string
  color: string
  documentCount: number
}

export interface UploadProgress {
  fileName: string
  progress: number
  status: 'uploading' | 'completed' | 'error'
}