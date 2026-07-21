export interface PasteDocument {
  _id: string;
  contentHtml: string;
  createdAt: Date;
  expiresAt: Date;
  creatorIp: string;
  ipRestricted: boolean;
  locked: boolean;
  passwordHash?: string;
  views: number;
  reported?: boolean;
  reportedAt?: Date;
  reportCount?: number;
}

export interface CreatePasteParams {
  contentHtml: string;
  expiry?: "1h" | "1d" | "30d";
  ipRestricted?: boolean;
  password?: string;
  creatorIp: string;
}

export interface PasteResponseData {
  _id: string;
  locked: boolean;
  unlocked?: boolean;
  contentHtml?: string;
  createdAt: Date;
  expiresAt: Date;
  ipRestricted: boolean;
  views: number;
  reported?: boolean;
}
