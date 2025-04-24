// src/services/imageService.ts
import cloudinary from '../config/cloudinary';
import * as fs from 'fs';
import * as path from 'path';

class ImageService {
  async uploadImage(filePath: string, folder: string = 'products') {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder,
        transformation: [
          { width: 800, height: 800, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      });
      return result.secure_url;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  // Hàm đệ quy để tìm tất cả ảnh trong thư mục và các thư mục con
  findAllImages(rootDir: string): string[] {
    let results: string[] = [];

    const items = fs.readdirSync(rootDir);
    
    for (const item of items) {
      const itemPath = path.join(rootDir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // Đệ quy vào thư mục con
        results = results.concat(this.findAllImages(itemPath));
      } else {
        // Kiểm tra nếu là file ảnh
        const ext = path.extname(item).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'].includes(ext)) {
          results.push(itemPath);
        }
      }
    }
    
    return results;
  }

  async uploadFolder(folderPath: string) {
    try {
      console.log(`Scanning folder: ${folderPath}`);
      
      // Tìm tất cả ảnh trong thư mục và các thư mục con
      const imageFiles = this.findAllImages(folderPath);
      
      console.log(`Found ${imageFiles.length} images to upload`);
      
      if (imageFiles.length === 0) {
        console.log('No images found. Please check the folder path and image extensions.');
        return [];
      }

      // Nhóm ảnh theo thư mục
      const imagesByFolder: { [key: string]: string[] } = {};
      
      imageFiles.forEach(filePath => {
        // Lấy tên thư mục cha
        const parentDir = path.basename(path.dirname(filePath));
        if (!imagesByFolder[parentDir]) {
          imagesByFolder[parentDir] = [];
        }
        imagesByFolder[parentDir].push(filePath);
      });
      
      console.log(`Found images in ${Object.keys(imagesByFolder).length} folders`);

      // Upload ảnh theo nhóm
      const allResults = [];
      
      for (const [folderName, files] of Object.entries(imagesByFolder)) {
        console.log(`Processing folder: ${folderName} with ${files.length} images`);
        
        const uploadPromises = files.map(async (filePath) => {
          try {
            // Upload với folder là tên thư mục cha
            const result = await this.uploadImage(filePath, `products/${folderName}`);
            console.log(`Uploaded: ${path.basename(filePath)} -> ${result}`);
            return {
              folder: folderName,
              fileName: path.basename(filePath),
              url: result
            };
          } catch (error) {
            console.error(`Failed to upload ${filePath}:`, error);
            return null;
          }
        });

        const results = await Promise.all(uploadPromises);
        allResults.push(...results.filter(result => result !== null));
      }
      
      console.log(`Successfully uploaded ${allResults.length} images`);
      
      // Lưu kết quả vào file JSON
      fs.writeFileSync(
        'upload-results.json', 
        JSON.stringify(allResults, null, 2)
      );

      return allResults;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  async deleteImage(url: string) {
    try {
      const publicId = url.split('/').pop()?.split('.')[0];
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    } catch (error) {
      console.error('Delete failed:', error);
      throw error;
    }
  }
}

export default new ImageService();