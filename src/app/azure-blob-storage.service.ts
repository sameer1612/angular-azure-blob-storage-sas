import { Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root',
})
export class AzureBlobStorageService {
  picturesAccount = 'stgisappsdevwedigihub001';
  picturesContainer = 'dh-temp-file-store';

  constructor() {}

  public uploadImage(
    sasResponse: Record<string, string>,
    content: Blob,
    handler: () => void
  ) {
    const name = Object.keys(sasResponse)[0];
    const url = sasResponse[name];
    this.uploadBlob(content, name, this.containerClient(url), handler);
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

  private containerClient(url: string): ContainerClient {
    return new BlobServiceClient(url).getContainerClient(
      this.picturesContainer
    );
  }
}
