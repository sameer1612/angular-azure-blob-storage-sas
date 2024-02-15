import { AzureBlobStorageService } from './../azure-blob-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sas',
  templateUrl: './sas.component.html',
  styleUrls: ['./sas.component.css'],
})
export class SasComponent implements OnInit {
  // SAS (shared access signatures)

  res = {
    'peter-545978099855900731.png':
      'https://stgisappsdevwedigihub001.blob.core.windows.net/dh-temp-file-store/peter-545978099855900731.png?sv=2023-08-03&st=2024-02-15T14%3A42%3A02Z&se=2024-02-15T14%3A47%3A02Z&sr=b&sp=rw&sig=Pe8y52OXZwdBgjP17Jn0Cs9GzvxCJl6hJCdQgP7t4oY%3D',
  };

  sas =
    'sv=2023-08-03&st=2024-02-15T14%3A42%3A02Z&se=2024-02-15T14%3A47%3A02Z&sr=b&sp=rw&sig=Pe8y52OXZwdBgjP17Jn0Cs9GzvxCJl6hJCdQgP7t4oY%3D';

  picturesList: string[] = [];
  picturesDownloaded: string[] = [];

  videosList: string[] = [];
  videoDownloaded;

  constructor(private blobService: AzureBlobStorageService) {}

  ngOnInit(): void {
    this.reloadImages();
  }

  public setSas(event) {
    this.sas = event.target.value;
  }

  public imageSelected(file: File) {
    this.blobService.uploadImage(this.sas, file, file.name, () => {
      this.reloadImages();
    });
  }

  public deleteImage(name: string) {
    this.blobService.deleteImage(this.sas, name, () => {
      this.reloadImages();
    });
  }

  public downloadImage(name: string) {
    this.blobService.downloadImage(this.sas, name, (blob) => {
      let url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  private reloadImages() {
    this.blobService.listImages(this.sas).then((list) => {
      this.picturesList = list;
      const array = [];
      this.picturesDownloaded = array;

      for (let name of this.picturesList) {
        this.blobService.downloadImage(this.sas, name, (blob) => {
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            array.push(reader.result as string);
          };
        });
      }
    });
  }
}
