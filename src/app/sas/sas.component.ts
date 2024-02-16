import { Component } from '@angular/core';
import { AzureBlobStorageService } from './../azure-blob-storage.service';

@Component({
  selector: 'app-sas',
  templateUrl: './sas.component.html',
  styleUrls: ['./sas.component.css'],
})
export class SasComponent {
  res = {
    'peter-546250436157227224.jpg':
      'https://stgisappsdevwedigihub001.blob.core.windows.net/dh-temp-file-store/peter-546250436157227224.jpg?sv=2023-08-03&st=2024-02-16T08%3A44%3A12Z&se=2024-02-16T08%3A49%3A12Z&sr=b&sp=rw&sig=PbdvNu0i%2FLv3W5RGd%2Ba4KvpRZK8TZIdYK%2BgnoDIdUd4%3D',
  };

  constructor(private blobService: AzureBlobStorageService) {}

  public imageSelected(file: File) {
    this.blobService.uploadImage(
      this.parseSasResponse(),
      file,
      file.name,
      () => {}
    );
  }

  parseSasResponse() {
    return {
      sas: Object.values(this.res)[0].split('?')[1],
      filename: Object.keys(this.res)[0],
      blobServiceUrl: Object.values(this.res)[0]
        .split('/')
        .slice(0, 3)
        .join('/'),
      containerName: Object.values(this.res)[0].split('/')[3],
    };
  }
}
