import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root',
})
export class AzureBlobStorageService {
  picturesAccount: any;
  picturesContainer: string;

  public uploadImage(
    parsedRes: any,
    content: Blob,
    name: string,
    handler: () => void
  ) {
    this.uploadBlob(content, name, this.containerClient(parsedRes), handler);
  }

  private uploadBlob(
    content: Blob,
    name: string,
    client: ContainerClient,
    handler: () => void
  ) {
    let blockBlobClient = client.getBlockBlobClient(name);
    blockBlobClient
      .uploadData(content, {
        blobHTTPHeaders: { blobContentType: content.type },
      })
      .then(() => handler());
  }

  private containerClient(parsedRes: any): ContainerClient {
    return new BlobServiceClient(parsedRes.blobServiceUrl).getContainerClient(
      parsedRes.containerName
    );
  }
}
