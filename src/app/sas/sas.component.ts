import { Component, OnInit } from '@angular/core';
import { AzureBlobStorageService } from './../azure-blob-storage.service';

interface sasResponse {
  sasToken: string;
  fileName: string;
  containerName: string;
}

@Component({
  selector: 'app-sas',
  templateUrl: './sas.component.html',
  styleUrls: ['./sas.component.css'],
})
export class SasComponent {
  res = {
    'peter-546205514498556105.jpg':
      'https://stgisappsdevwedigihub001.blob.core.windows.net/dh-temp-file-store/peter-546205514498556105.jpg?sv=2023-08-03&st=2024-02-16T05%3A45%3A42Z&se=2024-02-16T05%3A50%3A42Z&sr=b&sp=rw&sig=dTDrrBRg3mi7TH%2BB2oHheUpY54JJOJkZnaHi%2BkfbVTc%3D',
  };

  constructor(private blobService: AzureBlobStorageService) {}

  public imageSelected(file: File) {
    this.blobService.uploadImage(this.res, file, () => {
      console.log('uploaded');
    });
  }
}
