// scripts/upload-images.ts
import imageService from '../src/services/imageService';
import * as path from 'path';

interface UploadResult {
  folder: string;
  fileName: string;
  url: string;
}

async function main() {
  try {
    console.log('Starting upload...');
    
    // Đường dẫn tuyệt đối đến thư mục Images
    const imagesPath = path.resolve('D:/IWS/server/Images');
    console.log(`Using path: ${imagesPath}`);
    
    const results = await imageService.uploadFolder(imagesPath) as UploadResult[];
    console.log(`Uploaded ${results.length} images successfully`);
    
    // Gom kết quả theo folder để dễ dàng sử dụng
    const resultsByFolder: { [key: string]: string[] } = {};
    
    results.forEach(result => {
      if (!resultsByFolder[result.folder]) {
        resultsByFolder[result.folder] = [];
      }
      resultsByFolder[result.folder].push(result.url);
    });
    
    console.log('\nResults by folder:');
    Object.entries(resultsByFolder).forEach(([folder, urls]) => {
      console.log(`\n${folder} (${urls.length} images):`);
      urls.forEach(url => console.log(`  ${url}`));
    });
  } catch (error) {
    console.error('Upload failed:', error);
  }
}

main();