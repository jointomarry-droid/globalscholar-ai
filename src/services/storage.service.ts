export interface StorageService {
  upload(file: File, path: string): Promise<StorageResult>;
  uploadBuffer(buffer: Buffer, path: string, contentType: string): Promise<StorageResult>;
  getSignedUrl(path: string, expiresIn?: number): Promise<string>;
  delete(path: string): Promise<void>;
  list(prefix: string): Promise<string[]>;
}

export interface StorageResult {
  url: string;
  path: string;
  size: number;
  contentType: string;
}

// Supabase Storage implementation
export class SupabaseStorageService implements StorageService {
  private supabaseUrl: string;
  private supabaseKey: string;
  private bucket: string;

  constructor(supabaseUrl: string, supabaseKey: string, bucket = "globalscholar") {
    this.supabaseUrl = supabaseUrl;
    this.supabaseKey = supabaseKey;
    this.bucket = bucket;
  }

  async upload(file: File, path: string): Promise<StorageResult> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `${this.supabaseUrl}/storage/v1/object/${this.bucket}/${path}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.supabaseKey}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return {
      url: `${this.supabaseUrl}/storage/v1/object/public/${this.bucket}/${path}`,
      path,
      size: file.size,
      contentType: file.type,
    };
  }

  async uploadBuffer(buffer: Buffer, path: string, contentType: string): Promise<StorageResult> {
    const response = await fetch(
      `${this.supabaseUrl}/storage/v1/object/${this.bucket}/${path}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.supabaseKey}`,
          "Content-Type": contentType,
        },
        body: new Uint8Array(buffer),
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return {
      url: `${this.supabaseUrl}/storage/v1/object/public/${this.bucket}/${path}`,
      path,
      size: buffer.length,
      contentType,
    };
  }

  async getSignedUrl(path: string, expiresIn = 3600): Promise<string> {
    const response = await fetch(
      `${this.supabaseUrl}/storage/v1/object/sign/${this.bucket}/${path}?expiresIn=${expiresIn}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.supabaseKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Signed URL failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.signedUrl;
  }

  async delete(path: string): Promise<void> {
    const response = await fetch(
      `${this.supabaseUrl}/storage/v1/object/${this.bucket}/${path}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.supabaseKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`);
    }
  }

  async list(prefix: string): Promise<string[]> {
    const response = await fetch(
      `${this.supabaseUrl}/storage/v1/object/list/${this.bucket}?prefix=${prefix}`,
      {
        headers: {
          Authorization: `Bearer ${this.supabaseKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`List failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.map((item: { name: string }) => `${prefix}/${item.name}`);
  }
}

// Local filesystem storage (for development)
export class LocalStorageService implements StorageService {
  private basePath: string;

  constructor(basePath = "./uploads") {
    this.basePath = basePath;
  }

  async upload(file: File, path: string): Promise<StorageResult> {
    // In Node.js environment, write to filesystem
    // For browser, use IndexedDB or return a data URL
    const url = URL.createObjectURL(file);
    return {
      url,
      path,
      size: file.size,
      contentType: file.type,
    };
  }

  async uploadBuffer(buffer: Buffer, path: string, contentType: string): Promise<StorageResult> {
    const blob = new Blob([new Uint8Array(buffer)], { type: contentType });
    const url = URL.createObjectURL(blob);
    return {
      url,
      path,
      size: buffer.length,
      contentType,
    };
  }

  async getSignedUrl(path: string): Promise<string> {
    return `/api/files/${path}`;
  }

  async delete(path: string): Promise<void> {
    console.log(`[LocalStorage] Delete: ${path}`);
  }

  async list(prefix: string): Promise<string[]> {
    console.log(`[LocalStorage] List: ${prefix}`);
    return [];
  }
}

// Factory
let storageInstance: StorageService | null = null;

export function getStorageService(): StorageService {
  if (!storageInstance) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;

    if (url && key) {
      storageInstance = new SupabaseStorageService(url, key);
    } else {
      storageInstance = new LocalStorageService();
    }
  }
  return storageInstance;
}
