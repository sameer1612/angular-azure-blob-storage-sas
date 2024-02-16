import { Component } from '@angular/core';
import { AzureBlobStorageService } from './../azure-blob-storage.service';
import { BlockBlobClient } from '@azure/storage-blob';

@Component({
  selector: 'app-sas',
  templateUrl: './sas.component.html',
  styleUrls: ['./sas.component.css'],
})
export class SasComponent {
  res = {
    'Sunflower-546263421294461130.jpg':
      'https://stgisappsdevwedigihub001.blob.core.windows.net/dh-temp-file-store/Sunflower-546263421294461130.jpg?sv=2023-08-03&st=2024-02-16T09%3A35%3A48Z&se=2024-02-16T09%3A40%3A48Z&sr=b&sp=rw&sig=ZT%2FGh22irvRI1NWDWCFnwEPrUwzCsRcZFXtCz2HCIMU%3D',
  };

  constructor(private blobService: AzureBlobStorageService) {}

  public imageSelected(file: File) {
    var sas = Object.values(this.res)[0];
    var cloudBlockBlob = new BlockBlobClient(sas);
    cloudBlockBlob
      .uploadData(file, {
        blobHTTPHeaders: {
          blobContentType: file.type,
        },
      })
      .then((e) => console.log(e))
      .catch((e) => console.log(e));
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
